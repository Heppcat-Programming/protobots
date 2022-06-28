const Channel = require("./Channel");
const User = require("./User");
const Guild = require("./Guild");

module.exports = class Message {
  /**
   * The Message Object
   * @param {Object} data The data for the message
   */
  constructor(data) {
    this.tts = null;
    this.timestamp = null;
    this.referenced_message = null;
    this.channel = new Channel(data.channel_id);
    this.author = new User(data.author);
    this.attachements = null;
    this.guild = new Guild(data.guild_id);
    if (typeof data != "object" && !isNaN(Number(data))) return;
    if (data) this._patch(data);
  }
  /**
   * The Message Object
   * @param {Object} data The data for the message
   */
  _patch(data) {
    for (field in data) {
      switch (field) {
        case "channel_id":
          break;
        case "author":
          break;
        case "guild_id":
          break;
        default:
          this[field] = data[field];
      }
    }
  }
};
