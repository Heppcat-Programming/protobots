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
      this[field] = data[field];
    }
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
