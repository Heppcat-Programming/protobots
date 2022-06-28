module.exports = function (data, client) {
  client.emit("MESSAGE_CREATE", data);
};
