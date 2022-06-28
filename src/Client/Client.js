const EventEmitter = require("events");
const WebSocketManager = require("../Websocket/WebSocketManager");

module.exports = class Client extends EventEmitter {
  /**
   * Create the Client class
   * @param {Array<Integer>} intents
   * @throws {Error} If the intents are not an array of Integers
   */
  constructor(intents) {
    super({ captureRejections: true });
    this.ws = null;
    this.token = null;
    this.intents = 0;
    if (intents) {
      if (!Array.isArray(intents)) throw "Intents must be an array of Integers";
      intents.map((intent) => {
        if (typeof intent != "number")
          throw "Intents must be an array of Integers";
        this.intents += intent;
      });
    }
  }
  /**
   * Add an intent to the client
   * @param {Integer} intent
   * @returns {Integer} The new intents
   * @throws {Error} If the intent is not an Integer
   */
  addIntent(intent) {
    if (typeof intent != "number") throw "Intent must be an Integer";
    this.intents += intent;
    return this.intents;
  }
  /**
   * Set the clients intents
   * @param {Array<Integer>} intents
   * @returns {Integer} The new intents
   * @throws {Error} If the intents are not an array of Integers
   */
  setIntents(intents) {
    this.intents = 0;
    if (!Array.isArray(intents)) throw "Intents must be an array of Integers";
    intents.map((intent) => {
      if (typeof intent != "number")
        throw "Intents must be an array of Integers";
      this.intents += intent;
    });
    return this.intents;
  }

  login(token) {
    this.token = token;
    this.ws = new WebSocketManager(this);
  }
};
