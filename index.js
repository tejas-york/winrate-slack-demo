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
const renameChannel = require("./controllers/renameChannel");
const listAllChannels = require("./controllers/listAllChannels");
const archiveChannel = require("./controllers/archiveChannel");
const listAllUsers = require("./controllers/listAllUsers");
const searchMessages = require("./controllers/searchMessages");
const joinChannel = require("./controllers/joinChannel");
// const uploadCommand = require("./controllers/uploadCommand");
const handleSlackActions = require("./controllers/handleSlackActions");
const handleSlackOauthRedirect = require("./controllers/handleSlackOauthRedirect");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

/* View Routes */
app.get("/document-picker", (_, res) => res.render("docPicker"));
app.get("/create-channel", (_, res) => res.render("createChannel"));
app.get("/latest-messages", (_, res) => res.render("sharedLinks"));
app.get("/markdown-editor", (_, res) => res.render("markdownEditor"));
app.get("/channel-list", (_, res) => res.render("channelList"));
app.get("/users-list", (_, res) => res.render("usersList"));
app.get("/launch-channel", (_, res) => res.render("launchChannel"));
app.get("/search", (_, res) => res.render("search"));
app.get("/customize-channel", (_, res) => res.render("customizeChannel"));
app.get("/join-channel", (_, res) => res.render("joinChannel"));
app.get("/dealrooms", (_, res) => res.render("dealrooms"));
app.get("/slack-oauth-redirect", (_, res) => res.render("slackOauthRedirect"));
app.get("/slack-login", (_, res) => res.render("slackLogin"));

/* Controller Routes */
app.get("/api/test", test);
app.post("/api/channel", externalInvite);
app.post("/api/send-message", sendMessageInChannel);
app.post("/api/send-file", sendFileInChannel);
app.post("/api/canvas", createCanvas);
app.post("/api/event-handler", slackEventHandler);
app.get("/api/latest-messages", getLatestMessages);
app.put("/api/rename-channel/:channel", renameChannel);
app.get("/api/list-all-channels", listAllChannels);
app.delete("/api/archive-channel/:channel", archiveChannel);
app.get("/api/list-all-users", listAllUsers);
app.get("/api/search", searchMessages);
app.put("/api/join-channel/:channel", joinChannel);
app.post("/api/handle-slack-actions", handleSlackActions)
app.get("/api/handle-slack-oauth-redirect", handleSlackOauthRedirect)

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
