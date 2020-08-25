const express = require("express");
// const mySQL = require("mySQL");
const path = require("path");
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require("cors");
const session = require('express-session');

var allRoutes = require('./controllers');

var db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}))

app.use(session({
  secret: "keyboard cat",
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000
  }
}))

app.use('/', allRoutes);

db.sequelize.sync({force:false}).then(function(){
  const server = app.listen(PORT);
  const io = require('socket.io')(server);
  io.on('connection', socket => {
      console.log('client connected');
  })

});


