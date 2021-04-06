// npm install express
// npm install handlebars
// npm install consolidate
// npm install mysql 

var express = require('express');
var cons = require('consolidate');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var port = 3000;                
var hostname = "127.0.0.1";

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


var cors = function (req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

// importataan reitit
const Routes = require('./routes/Routes');
app.use(Routes);
app.use(express.static('./views/images'));




app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);  
});