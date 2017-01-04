var express = require('express'); // Express web server framework
var cookieParser = require('cookie-parser');

//Routes
var home = require('./routes/home.js');

//Schema

var app = express();

//Use Jade as the templating engine
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'))
    .use(cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//Pages
app.get('/', home.page);

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err){
    	console.log(err.stack);
    	// emailError('Uncaught Exception', err.stack);
    } 
    if (options.exit) process.exit();
}

//Run the app

var port = Number(process.env.PORT || 3000)
console.log('Listening on '+port);
app.listen(port);