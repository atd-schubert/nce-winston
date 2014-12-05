"use strict";

var winston = require("winston");

module.exports = function(cms){
  if(!cms) throw new Error("You have to specify the cms object");
  
//# Mandantory Setup:
  var ext = cms.createExtension({package: require("./package.json")});
  
  ext.on("install", function(event){ // set options, but don't run or make available in cms
    //# Seting extension-config:
    ext.config.levels = ext.config.levels || {
      trace: 0,
      input: 1,
      verbose: 2,
      prompt: 3,
      debug: 4,
      info: 5,
      data: 6,
      help: 7,
      warn: 8,
      error: 9
    };
    ext.config.colors = ext.config.colors || {
      trace: 'magenta',
      input: 'grey',
      verbose: 'cyan',
      prompt: 'grey',
      debug: 'blue',
      info: 'green',
      data: 'grey',
      help: 'cyan',
      warn: 'yellow',
      error: 'red'
    };
    ext.config.transports = ext.config.transports || {
      Console: {
        level: 'trace',
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: false
      }
    };
    ext.config.defaultLevel = ext.config.defaultLevel || 8;

    //# Declarations and settings:
    
  });
  
  ext.on("uninstall", function(event){ // undo installation
    //# Undeclare:
    
  });
  
  ext.on("activate", function(event){ // don't set options, just run, make available in cms or register.
	  ext.logger = new (winston.Logger)({
      levels: ext.config.levels,
      colors: ext.config.colors
    });
    var hash;
    for (hash in ext.config.transports) ext.logger.add(winston.transports[hash], ext.config.transports[hash]);
  });
  
  ext.on("deactivate", function(event){ // undo activation
	  delete ext.logger;
  });
  
//# Private declarations:
  var loggers = {};
  var pipeLogger = function(logger, type){
    return function(message){
      logger(type, message);
    };
  };

//# Public declarations and exports:
  ext.createLogger = function(name, opts){
    if(name in loggers) return false;
    opts = opts || {};
    var _level;
    var logger = {};
    var hash;
    
    var log = function(type, message) {
      if(ext.config.levels[type]<_level) return;
      ext.logger.log(type, name+": "+message);
    };
    
    for (hash in ext.config.levels) logger[hash] = pipeLogger(log, hash);
    
    logger.setLevel = function(level){
      if(typeof level === "string") level = ext.config.levels[level];
      _level = level;
    };
    logger.getLevel = function(){
      return _level;
    };
    logger.setLevel(opts.level || ext.config.defaultLevel);
    logger.log = log;
    loggers[name] = logger;
    return logger;
  };
  ext.getLogger = function(name){
    return loggers[name];
  };
  ext.setLevel = function(name, level){
    ext.getLogger(name).setLevel(level);
  };
  ext.getLevel = function(name){
    return ext.getLogger(name).getLevel(level);
  };
  
  return ext;
}