#! /usr/bin/env node

const split = require('split2');
const Parse = require('fast-json-parse');

const PINO_TO_STACKDRIVER = {
  10: 'DEBUG',
  20: 'DEBUG',
  30: 'INFO',
  40: 'WARNING',
  50: 'ERROR',
  60: 'CRITICAL',
};

const format = ({
  time,
  pid,
  hostname,
  level,
  msg,
  stack,
  v,
  type,
  ...rest
}) => {
  let message = stack || msg;
  const output = {
    ...rest,
    severity: PINO_TO_STACKDRIVER[level] || 'UNKNOWN',
    timestamp: time,
    message,
  };

  if (stack && msg) {
    output.msg = msg;
  }

  return output;
};

const isPinoLine = line => {
  return (
    line &&
    line.hasOwnProperty('hostname') &&
    line.hasOwnProperty('pid') &&
    (line.hasOwnProperty('v') && line.v === 1)
  );
};

process.stdin
  .pipe(
    split(data => {
      const parsed = new Parse(data);
      const value = parsed.value;
      if (parsed.err || !isPinoLine(value)) {
        return `${data}\n`;
      }
      return JSON.stringify(format(value)) + '\n';
    }),
  )
  .pipe(process.stdout);
