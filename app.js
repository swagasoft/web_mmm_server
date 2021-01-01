require('./config/config');
require('./config/jwt_helper');
require('./models/db');
require('./config/passportConfig');


const path = require("path");

const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const routeController = require('./routes/route-controller');
const indexController = require('./controllers/index-controller')
const { config, engine } = require('express-edge');
 const expressValidator = require('express-validator');
 const expressSession = require('express-session');

 var express = require('express');
 var app = express();
 app.use(express.static('public'));
 // middleware
 app.use(bodyParser.urlencoded(({extended: false})));
 app.use(bodyParser.json()); 
 app.use(cors());
 app.use(passport.initialize());



const port = process.env.PORT || "5005"; 

app.use(engine);
app.set('views', `${__dirname}/views`);

// routes
app.get("/", indexController.index);
app.use("/api", routeController );

app.get("/testing", indexController.testing);
app.get('/register', indexController.register);



app.listen(port, () => {
  console.log(`Farm server Listening to requests on http://localhost:${port}`);
});
