const Embed = require("../../apiInteraction/Structures/Embed");

module.exports = class TextCommand {
  constructor(data) {
    if (typeof data === "object") this._patch(data);
  }
  _patch(data) {
    this.name = data.name;
    this.description = data.description;
    this.response = data.response;
    this.allowBots = data.allowBots ?? false;
    this.reply = data.reply ?? true;
  }
  /**
   * Set the command name
   * @param {String} name
   */
  setName(name) {
    this.name = name;
  }
  /**
   * Set if the command can be used by bots
   * @param {Boolean} allowBots
   * @default false
   */
  setAllowBots(allowBots) {
    this.allowBots = allowBots;
  }
  /**
   * Set the command description
   * @param {String} description
   */
  setDescription(description) {
    this.description = description;
  }
  /**
   * Set text/embed response
   * @param {String/Embed} response
   */
  setResponse(response) {
    this.response = response;
  }
  /**
   * Set if the command should reply to the message
   * @param {Boolean} reply
   * @default true
   */
  setReply(reply) {
    this.reply = reply;
  }
  _createResponse(args, message) {
    if (this.response instanceof Embed) {
      return new Embed(
        JSON.parse(
          JSON.stringify(this.response.toJson()).replace(
            /{[a-z0-9]+((\[[a-z0-9]+\])?)+}/gi,
            function (match) {
              let i = match.replace(/{|}/g, "").replace(/\[[a-z]+]/gi, "");
              let b = match.replace(/{|}/g, "");
              if (b.startsWith("arg")) {
                let index = Number(b.replace("arg", ""));
                if (args[index]) return args[index];
              } else {
                let current = message[i];
                match
                  .replace(/{|}/g, "")
                  .match(/\[[a-z]+]/gi)
                  ?.forEach((e) => {
                    e = e.replace(/\[|\]/g, "");
                    current = current[e];
                  });
                return current;
              }
            }
          )
        )
      );
    } else {
      return this.response.replace(
        /{[a-z0-9]+((\[[a-z0-9]+\])?)+}/gi,
        function (match) {
          let i = match.replace(/{|}/g, "").replace(/\[[a-z]+]/gi, "");
          let b = match.replace(/{|}/g, "");
          if (b.startsWith("arg")) {
            let index = Number(b.replace("arg", ""));
            if (args[index]) return args[index];
          } else {
            let current = message[i];
            match
              .replace(/{|}/g, "")
              .match(/\[[a-z]+]/gi)
              ?.forEach((e) => {
                e = e.replace(/\[|\]/g, "");
                current = current[e];
              });
            return current;
          }
        }
      );
    }
  }
};
