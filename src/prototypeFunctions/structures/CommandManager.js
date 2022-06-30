const TextCommand = require("./TextCommand");
module.exports = class CommandManager {
  /**
   * Create a command manager
   * @param {Client} client
   * @param {Array} commands
   */
  constructor(client, prefix, commands) {
    this.client = client;
    this.prefix = prefix;
    this.commands = [];
    if (commands instanceof Array) this._patch(commands);
  }
  /**
   * Patch the commands with the data
   * @param {Array} commands
   * @private
   */
  _patch(commands) {
    let Command = require("./TextCommand");
    for (let command in commands) {
      if (!command instanceof Command)
        throw new TypeError("Command must be an instance of Command");
      if (!commands[command].response)
        throw new Error("Command must have a response");
      this["commands"][command.name] = commands[command];
    }
  }
  hasCommand(command) {
    return this.commands[command] ? true : false;
  }
  /**
   * Add a command to the command manager
   * @param {TextCommand} command The command to add
   * @throws {TypeError} If the command is not an instance of TextCommand
   * @throws {ReferenceError} If the command does not have a response
   * @throws {ReferenceError} If the command doesn't have a name
   */
  addCommand(command) {
    if (!command instanceof TextCommand)
      throw new TypeError("Command must be an instance of Command");
    if (!command.response)
      throw new ReferenceError("Command must have a response");
    if (!command.name) throw new ReferenceError("Command must have a name");
    this["commands"][command.name] = command;
  }
  async _respondToCommand(command, args, message) {
    if (this.commands[command]) {
      let response = this.commands[command]._createResponse(args, message);
      if (this.commands[command].reply) message.reply(response);
      else {
        c = await message.getChannel();
        c.send(response);
      }
    }
  }
};
