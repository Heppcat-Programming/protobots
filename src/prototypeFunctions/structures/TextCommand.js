const Embed = require("../../apiInteraction/Structures/Embed");

module.exports = class TextCommand {
  /**
   * @param {data} data The command data
   * @param {String} data.name The name of the command
   * @param {String} data.description The description of the command
   * @param {String} data.response The response of the command
   * @param {Boolean} data.reply If the command should reply to the message
   * @param {Boolean} data.allowBots If the command can be used by bots
   */
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
      let resp = JSON.stringify(this.response.toJson());
      let matches = resp.match(/{[a-z0-9]+((\[[a-z0-9]+\])?)+}/gi);
      return new Promise(async function (resolve, reject) {
        await Promise.all(
          matches.map(async function (match) {
            let i = match.replace(/{|}/g, "").replace(/\[[a-z]+]/gi, "");
            let b = match.replace(/{|}/g, "");
            switch (i) {
              case "arg":
                let index = Number(b.replace("arg", ""));
                if (args[index]) resp.replace(match, args[index]);
                else break;
              case "message":
                let current = message;
                match
                  .replace(/{|}/g, "")
                  .match(/\[[a-z]+]/gi)
                  ?.forEach((e) => {
                    e = e.replace(/\[|\]/g, "");
                    current = current[e];
                  });
                resp = resp.replace(match, current);
                break;
              case "channel":
                let channel = await message.getChannel();
                let c = channel;
                match
                  .replace(/{|}/g, "")
                  .match(/\[[a-z]+]/gi)
                  ?.forEach((e) => {
                    e = e.replace(/\[|\]/g, "");
                    c = c[e];
                  });
                resp = resp.replace(match, c);
                break;
              case "guild":
                let guild = await message.getGuild();
                let g = guild;
                match
                  .replace(/{|}/g, "")
                  .match(/\[[a-z]+]/gi)
                  ?.forEach((e) => {
                    e = e.replace(/\[|\]/g, "");
                    g = g[e];
                  });
                resp = resp.replace(match, g);
                break;
            }
          })
        );
        resolve(new Embed(JSON.parse(resp)));
      });
    } else {
      let resp = this.response;
      let matches = resp.match(/{[a-z0-9]+((\[[a-z0-9]+\])?)+}/gi);
      return new Promise(async function (resolve, reject) {
        await Promise.all(
          matches.map(async function (match) {
            let i = match.replace(/{|}/g, "").replace(/\[[a-z]+]/gi, "");
            let b = match.replace(/{|}/g, "");
            switch (i) {
              case "arg":
                let index = Number(b.replace("arg", ""));
                if (args[index]) resp.replace(match, args[index]);
                else break;
              case "message":
                let current = message;
                match
                  .replace(/{|}/g, "")
                  .match(/\[[a-z]+]/gi)
                  ?.forEach((e) => {
                    e = e.replace(/\[|\]/g, "");
                    current = current[e];
                  });
                resp = resp.replace(match, current);
                break;
              case "channel":
                let channel = await message.getChannel();
                let c = channel;
                match
                  .replace(/{|}/g, "")
                  .match(/\[[a-z]+]/gi)
                  ?.forEach((e) => {
                    e = e.replace(/\[|\]/g, "");
                    c = c[e];
                  });
                resp = resp.replace(match, c);
                break;
              case "guild":
                let guild = await message.getGuild();
                let g = guild;
                match
                  .replace(/{|}/g, "")
                  .match(/\[[a-z]+]/gi)
                  ?.forEach((e) => {
                    e = e.replace(/\[|\]/g, "");
                    g = g[e];
                  });
                resp = resp.replace(match, g);
                break;
            }
          })
        );
        resolve(resp);
      });
    }
  }
};
