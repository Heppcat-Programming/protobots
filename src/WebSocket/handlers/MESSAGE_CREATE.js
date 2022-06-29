const Message = require("../../Structures/Message");
module.exports = function (data, client) {
  client.emit("MESSAGE_CREATE", new Message(data, client));
};
