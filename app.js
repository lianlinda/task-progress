
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoStore = require('connect-mongo')(express);
var settings =require('./models/settings');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);//将ejs后缀名转换成html

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
	secret: settings.cookieSecret,
	store: new mongoStore({
		url: 'mongodb://localhost/'+settings.db
	})
}));

app.use(express.favicon(__dirname,'favicon.ico'));//更换favicon路径，避免报错
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);//将路由规则配置到routes中

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
