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
const slackEventHandler = require("./controllers/slackEventHandler");
const connect = require("./database");
const getLatestMessages = require("./controllers/getLatestMessages");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

/* Views */
app.get("/document-picker", (req, res) => res.render("docPicker"));
app.get("/create-channel", (req, res) => res.render("createChannel"));
app.get("/latest-messages", (req, res) => res.render("sharedLinks"));
app.get("/markdown-editor", (req, res) => res.render("markdownEditor"));

/* Controllers */
app.get("/test", test);
app.post("/api/channel", externalInvite);
app.post("/api/send-message", sendMessageInChannel);
app.post("/api/send-file", sendFileInChannel);
app.post("/api/canvas", createCanvas);
app.post("/api/event-handler", slackEventHandler);
app.get("/api/latest-messages", getLatestMessages);

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

async function onListening() {
  try {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("Listening on " + bind);
    await connect();
  } catch (error) {
    console.error("error:", error);
  }
}
