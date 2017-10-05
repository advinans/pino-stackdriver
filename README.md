> Format stdout from pino to Stackdriver format
---
__This does not transport the logs to Stackdriver but is meant to be used with the Stackdriver agent.__

### Usage

```
$ node myscript.js | psdriver
```

### Errors
When a stack trace is present it is put on the `message` property and any string message is put on the `msg` property.

```
log.error(new Error('Oops!'), 'Something is fishy'); // stdout => {"severity":"ERROR","timestamp":1507216273883,"message":"Error: Oops!\n    at Object.<anonymous> (...)\n    at Module._compile (module.js:624:30)\n    at Module.m._compile (...)\n    at Module._extensions..js (module.js:635:10)\n    at Object.require.extensions.(anonymous function) [as .ts] (...)\n    at Module.load (module.js:545:32)\n    at tryModuleLoad (module.js:508:12)\n    at Function.Module._load (module.js:500:3)\n    at Function.Module.runMain (module.js:665:10)\n    at Object.<anonymous> (...)","msg":"Something is fishy"}
```

#### Bunyan
This package should be compatible with Bunyan as it has the same output, but it is _untested_.
