const ws = require("ws");
const OPCodeHandlers = require("./OPCodeHandlers/index");
const handlers = require("./handlers/index");
const errorCodes = require("../Errors/WebSocket");
const Client = require("../Client/Client");

module.exports = class WebSocketManager {
  /**
   * Create the Websocket
   * @param {Client} client
   */
  constructor(client) {
    this.socket = new ws("wss://gateway.discord.gg/?v=10&encoding=json");

    this.socket.on("close", (d) => {
      throw `${errorCodes[`${d}`]} (${d})`;
    });

    this.socket.on("message", (r) => {
      let data = JSON.parse(r.toString());
      if (data.op != 0)
        OPCodeHandlers[`OP_${data.op}`](this.socket, data, client);
      else if (handlers[data.t]) {
        handlers[data.t](data.d, client);
      }
    });
  }
};
