const os = require("os");
const heartbeat = require("../handlers/index").heartbeat;
module.exports = function (socket, data, client) {
  socket.send(
    JSON.stringify({
      op: 2,
      d: {
        intents: client.intents,
        token: client.token,
        properties: {
          os: os.type(),
          browser: "protobots",
          device: "protobots",
        },
      },
    })
  );
  heartbeat.start(socket, data.d.heartbeat_interval);
};
