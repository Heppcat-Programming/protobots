const EventEmitter = require("events");
const WebSocketManager = require("../Websocket/WebSocketManager");

module.exports = class Client extends EventEmitter {
  /**
   * Create the Client class
   * @param {Array<Integer>} intents
   * @throws {TypeError} If the intents are not an array of Integers
   */
  constructor(intents) {
    super({ captureRejections: true });
    this.ws = null;
    this.token = null;
    this.intents = 0;

    this.version = "0.0.1";
    this.apiVersion = 10;
    this.apiUrl = `https://discord.com/api/v${this.apiVersion}`;

    if (intents) {
      if (!Array.isArray(intents))
        throw new TypeError("Intents must be an array of Integers");
      intents.map((intent) => {
        if (typeof intent != "number")
          throw new TypeError("Intent must be an Integer");
        this.intents += intent;
      });
    }
  }
  /**
   * Add an intent to the client
   * @param {Integer} intent
   * @returns {Integer} The new intents
   * @throws {TypeError} If the intent is not an Integer
   */
  addIntent(intent) {
    if (typeof intent != "number")
      throw new TypeError("Intent must be an Integer");
    this.intents += intent;
    return this.intents;
  }
  /**
   * Set the clients intents
   * @param {Array<Integer>} intents
   * @returns {Integer} The new intents
   * @throws {TypeError} If the intents are not an array of Integers
   */
  setIntents(intents) {
    this.intents = 0;
    if (!Array.isArray(intents))
      throw new TypeError("Intents must be an array of Integers");
    intents.map((intent) => {
      if (typeof intent != "number")
        throw new TypeError("Intents must be an array of Integers");
      this.intents += intent;
    });
    return this.intents;
  }

  /**
   * Get Guild
   * @param {String} id The id of the guild
   * @returns {Guild} The guild
   * @throws {ReferenceError} If the id is not provided
   * @throws {TypeError} If the id is not a String
   */
  async getGuild(id) {
    if (!id) throw new ReferenceError("Id is required");
    if (typeof id != "string") throw new TypeError("Id must be a String");
    return new Request({
      client: this,
      endpoint: "guilds/" + id,
      method: "GET",
    })
      .call()
      .then((g) => {
        let Guild = require("./Guild");
        return new Guild(g, this);
      });
  }

  login(token) {
    this.token = token;
    this.ws = new WebSocketManager(this);
  }
};
