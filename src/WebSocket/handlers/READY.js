module.exports = function (data, client) {
  client.emit("Ready", data);
};
