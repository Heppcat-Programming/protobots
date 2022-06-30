const User = require("./User");
const Request = require("../Util/Request");

module.exports = class Message {
  /**
   * The Message Object
   * @param {Object} data The data for the message
   */
  constructor(data, client) {
    this.tts = null;
    this.timestamp = null;
    this.referenced_message = null;
    this.client = client;
    this.attachements = null;
    this.id = data.id || data;
    if (typeof data === "object") this._patch(data);
  }
  /**
   * The Message Object
   * @param {Object} data The data for the message
   */
  _patch(data) {
    for (let field in data) {
      switch (field) {
        case "channel_id":
          this._channelId = data[field];
          break;
        case "author":
          this.author = new User(data[field]);
          break;
        case "member":
          this.member = new User(data[field]);
          break;
        case "guild_id":
          this._guildId = data[field];
          break;
        default:
          this[field] = data[field];
          break;
      }
    }
  }
  async getChannel() {
    return new Request({
      client: this.client,
      endpoint: "channels/" + this._channelId,
      method: "GET",
    })
      .call()
      .then((c) => {
        let Channel = require("./Channel");
        return new Channel(c, this.client);
      });
  }
  async getGuild() {
    if (!this._guildId) return undefined;
    return new Request({
      client: this.client,
      endpoint: "guilds/" + this._guildId,
      method: "GET",
    })
      .call()
      .then((g) => {
        let Guild = require("./Guild");
        return new Guild(g, this.client);
      });
  }
  async reply(message) {
    let data = {
      message_reference: {
        message_id: this.id,
        guild_id: this._guildId,
        fail_if_not_exists: false,
      },
    };
    let Embed = require("./Embed");
    if (message instanceof Embed) data["embeds"] = [message.toJson()];
    else data["content"] = message;
    return new Promise((resolve) => {
      new Request({
        client: this.client,
        endpoint: "channels/" + this._channelId + "/messages",
        method: "POST",
        data: data,
      })
        .call()
        .then((m) => {
          resolve(new Message(m));
        });
    });
  }
};
