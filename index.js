var express =require ('express');
const cors = require("cors");
const session = require('express-session');

var app = express();
var PORT = process.env.PORT|| 8080;
var allRoutes = require ('./controllers');

var db = require('./models');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors({
   origin:["http://localhost:3000"],
    credentials:true
 }));

app.use(session({
   secret:"keyboard cats",
   resolve:false,
   saveUninitialized:false,
   cookie:{
       maxAge:2*60*60*1000
   } 
}))

app.use('/',allRoutes);

db.sequelize.sync({force:false}).then(function(){
    app.listen(PORT,function(){
        console.log('App Listening on PORT'+ PORT);
    });

});