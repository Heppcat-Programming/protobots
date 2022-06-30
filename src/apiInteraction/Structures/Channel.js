const Request = require("../Util/Request");

module.exports = class Channel {
  /**
   * The Channel Object
   * @param {Object} data The data for the channel
   */
  constructor(data, client) {
    this.type = null;
    this.name = null;
    this.client = client;
    this.id = data.id || data.channel_id;
    if (typeof data === "object") this._patch(data);
  }
  /**
   * Patch the channel with the data
   * @param {Object} data The channel data
   */
  _patch(data) {
    for (let field in data) {
      switch (field) {
        case "guild_id":
          this._guildId = data[field];
        default:
          this[field] = data[field];
      }
    }
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
  /**
   * Get a message from the channel
   * @param {String} messageId The message id
   * @throws {ReferenceError} If the id is not provided
   * @throws {TypeError} If the id is not a String
   * @returns {Message} The message
   */
  async getMessage(messageId) {
    if (!messageId) throw new ReferenceError("Message id is not provided");
    if (typeof messageId !== "string")
      throw new TypeError("Message id is not a String");
    return new Request({
      client: this.client,
      endpoint: "channels/" + this.id + "/messages/" + messageId,
      method: "GET",
    })
      .call()
      .then((m) => {
        let Message = require("./Message");
        return new Message(m, this.client);
      });
  }
  /**
   * Send a message to the channel
   * @param {String} message The message to send
   * @returns {Promise<Message>} The message object
   */
  async send(message) {
    return new Promise((resolve) => {
      new Request({
        client: this.client,
        endpoint: "channels/" + this._channelId + "/messages",
        method: "POST",
        data: {
          content: message,
        },
      })
        .call()
        .then((m) => {
          let Message = require("./Message");
          resolve(new Message(m));
        });
    });
  }
};
