"use strict";

var NCE = require("nce");
var Ext = require("../");
describe('Basic integration in NCE', function(){
  var nce = new NCE();
  it('should be insertable into NCE', function(done){
    var ext = Ext(nce);
    if(ext) return done();
    return done(new Error("Is not able to insert extension into NCE"));
  });
});
describe('Basic functions in NCE', function(){
  var nce = new NCE();
  var ext = Ext(nce);
  
  it('should be installable', function(done){
    if(ext.install()) return done();
    return done(new Error("Can not install extension"));
  });
  it('should be activatable', function(done){
    if(ext.activate()) return done();
    return done(new Error("Can not activate extension"));
  });
  it('should be deactivatable', function(done){
    if(ext.deactivate()) return done();
    return done(new Error("Can not deactivate extension"));
  });
  it('should be uninstallable', function(done){
    if(ext.uninstall()) return done();
    return done(new Error("Can not uninstall extension"));
  });
});
describe('Basic functions in NCE', function(){
  var nce = new NCE();
  var ext = Ext(nce);
  ext.install();
  ext.activate();
  it('should create sub logger', function(done){
    var logger = ext.createLogger("simple create");
    if(logger.error && logger.warn) return done();
    return done(new Error("Can not create a correct logger"));
  });
  it('should not be able to create a logger twice', function(done){
    if(ext.createLogger("twice") && !ext.createLogger("twice")) return done();
    return done(new Error("Create a logger twice"));
  });
  it('should get created logger', function(done){
    var logger = ext.createLogger("get");
    if(ext.getLogger("get") === logger) return done();
    return done(new Error("Get incorrect logger"));
  });
  it('should be able to change logging level', function(done){
    var logger = ext.getLogger("get");
    logger.setLevel(1);
    if(logger.getLevel() === 1) return done();
    return done(new Error("Logging level is not set correctly"));
  });
  it('should create logger with custom config', function(done){
    var logger = ext.createLogger("config", {level: 0});
    if(logger.getLevel() === 0) return done()
    return done(new Error("Logger does not have the right configuration"));
  });
});