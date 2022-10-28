const Conversation = require("../Model/chat/Conversition");
const Messages = require("../Model/chat/Messages");
const firstConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

const createmessages = async (req, res, next) => {
  const newMessages = new Messages(req.body);

  try {
    const savednewMessages = await newMessages.save();
    res.status(200).json(savednewMessages);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await Messages.find({
      conerstionId: req.params.conerstionId,
    });
    res.status(200).json(messages);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

const findchat = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  firstConversation,
  getConversation,
  createmessages,
  getMessages,
  findchat,
};
