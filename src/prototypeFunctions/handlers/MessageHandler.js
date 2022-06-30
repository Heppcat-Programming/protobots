let Client = require("../../apiInteraction/Client/Client");
let CommandManager = require("../structures/CommandManager");
module.exports = class MessageHandler {
  /**
   * The Message Handler
   * @param {Client} client The bot client
   * @param {CommandManager} cmdManager The command manager for the bot
   */
  constructor(client, cmdManager) {
    if (!client instanceof Client)
      throw new TypeError("Client must be an instance of Client");
    if (!cmdManager instanceof CommandManager)
      throw new TypeError(
        "CommandManager must be an instance of CommandManager"
      );
    this.client = client;
    this.cmdManager = cmdManager;
    this._startListenting();
  }
  _startListenting() {
    this.client.on("MESSAGE_CREATE", (msg) => this._checkIfCommand(msg));
  }
  _checkIfCommand(message) {
    let msg = message.content.toLowerCase();
    if (msg.startsWith(this.cmdManager.prefix)) {
      let args = msg.slice(this.cmdManager.prefix.length).trim().split(/ +/);
      let command = args.shift().toLowerCase();
      if (this.cmdManager.hasCommand(command)) {
        this.cmdManager._respondToCommand(command, args, message);
      }
    }
  }
};
