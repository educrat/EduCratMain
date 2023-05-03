const ChatModel = require("../../models/chatModel.js");

const createChat = async (req, res) => {

    console.log(req.body);

    if (!req.body.senderId || !req.body.receiverId) {
        return res.status(500).send({ status: "Failed", message: "senderId and receiverId required!" })
    }

    const isChatAlreadyPresent = await ChatModel.findOne({
        members: { $all: [req.body.senderId, req.body.receiverId] }
    })

    if (isChatAlreadyPresent) {
        console.log("🚀 ~ file: chat.controller.js ~ line 14 ~ createChat ~ isChatAlreadyPres̥ent", isChatAlreadyPresent)
        return res.status(200).send({ ...isChatAlreadyPresent._doc, message: "Chat is already present in DB" })
    }

    const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const userChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

const findChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
};

module.exports = {
    createChat, userChats, findChat
}