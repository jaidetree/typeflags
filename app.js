
/**
 * Module dependencies.
 */

var express = require('express')
    , fs = require('fs')
    , routes = require('./routes');

var config_file = require('yaml-config')
exports = module.exports = config = config_file.readConfig('config/db.yaml');

exports = mongoose = require('mongoose');
mongoose.connect(config.db.uri);
exports = Schema = mongoose.Schema;

var models_path = __dirname + '/models';
var model_files = fs.readdirSync(models_path);
model_files.forEach(function(file){
    require(models_path + '/' + file);
});

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

mongoose.connect('mongodb://localhost/typeflags');

//app.get('/', routes.index);
require('./routes/app')(app);
require('./routes/wordset')(app);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
