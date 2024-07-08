require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
// const createChannel = require("./controllers/createChannel");
const externalInvite = require("./controllers/externalInvite");
const test = require("./controllers/test");
const path = require("path");
const sendMessageInChannel = require("./controllers/sendMessageInChannel");
const sendFileInChannel = require("./controllers/sendFileInChannel");
const createCanvas = require("./controllers/createCanvas");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// app.post('/channel', createChannel)
app.get("/test", test);
app.post("/api/channel", externalInvite);
app.get("/document-picker", (req, res) => res.render("docPicker"));
app.get("/create-channel", (req, res) => res.render("createChannel"));
app.post("/api/send-message", sendMessageInChannel);
app.post("/api/send-file", sendFileInChannel);
app.post("/api/canvas", createCanvas);

app.post("/api/url-verification", (req, res) => {
  console.log("REQ BODY", req.body);
  res.send(req.body.challenge);
});

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
