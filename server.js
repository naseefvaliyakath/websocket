const PORT = 7000
var app = require('express')()
var http = require('http').Server(app)
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
var cors = require("cors");

const io = require('socket.io')(http, {
  origin: "https://mobizate.com"
})
//pages//
const registerOrderHandlers = require("./orderHandler");
//pages//


/////parse/////////
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
/////parse/////////


///mongodb connection////
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restaurent',
  {
    useNewUrlParser: true,
  }
)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });
///mongodb connection////

app.get("/socket.io/", (req, res) => res.send("Welcom socket server"));


const onConnection = (socket) => {
  registerOrderHandlers(io, socket);
}

io.on("connection", onConnection);


http.listen(PORT, function () {
  console.log('connected port 7000')
})