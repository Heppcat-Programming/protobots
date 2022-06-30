module.exports = function (data, client) {
  client.emit("ready", data);
};
