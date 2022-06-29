const User = require("./User");
const Guild = require("./Guild");
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
        case "author":
          this.author = new User(data[field]);
        case "guild_id":
          this._guildId = data[field];
        default:
          this[field] = data[field];
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
  async reply(message) {
    return new Promise((resolve) => {
      new Request({
        client: this.client,
        endpoint: "channels/" + this._channelId + "/messages",
        method: "POST",
        data: {
          content: message,
          message_reference: {
            message_id: this.id,
            guild_id: this._guildId,
            fail_if_not_exists: false,
          },
        },
      })
        .call()
        .then((m) => {
          resolve(new Message(m));
        });
    });
  }
};
