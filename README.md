# NC extension winston
## Description
A logger for the nc cms

## How to install
Install with npm: `npm install --save nce-winston`

Integrate in NC:

```
var NC = require("nc");
var nc = new NC(/*{
  "winston": {
    levels:{
      error:2,
      warn:1,
      deafult:0
    },
    colors:{
      error:"red",
      warn:"yellow",
      deafult:"blue"
    },
    deafultLevel:1,
    transports: {
      Console: {
        level: 'warn',
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: false
      }
    }
  }
}*/);
var logger = require("nce-winston");
var ext = logger(nc);
ext.install();
ext.activate();
```

Or use nce-extension-manager...

## How to use
### Basic funcitons
* `.createLogger(name, opts)`: Create a logger with a name. Optional you can set the default level in opts.level.
* `.getLogger(name)`: Get a logger by its name.
* `.setLevel(name, level)`: Set level for logging. You can call this function also within a logger without name.
* `.getLevel(name)`: Get level for logging. You can call this function also within a logger without name.

For everything else you can use nce-winston like winston itself, please look at the [winston documentation](https://github.com/flatiron/winston).
