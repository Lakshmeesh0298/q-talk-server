const express = require("express");
const {
  firstConversation,
  getConversation,
  createmessages,
  getMessages,
} = require("../controller/chatController");
const storage = require("../config/multer");
const multer = require("multer");

let uploader = multer({ storage });
const chatrouter = express.Router();

chatrouter.post("/newConverstion", firstConversation);
chatrouter.get("/:userId", getConversation);
chatrouter.post("/sendMessages", createmessages);
chatrouter.get("/getMessages", getMessages);

module.exports = chatrouter;
