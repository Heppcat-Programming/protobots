const Request = require("../Util/Request");

module.exports = class Guild {
  /**
   * The Guild Object
   * @param {Object} data The data for the guild
   */
  constructor(data, client) {
    this.type = null;
    this.name = null;
    this.client = client;
    this.id = data.id || data.guild_id;
    if (typeof data === "object") this._patch(data);
  }
  /**
   * Patch the guild with the data
   * @param {Object} data The guild data
   * @private
   */
  _patch(data) {
    for (let field in data) {
      this[field] = data[field];
    }
  }
};
