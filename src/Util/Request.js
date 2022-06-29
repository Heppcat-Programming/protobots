const fetch = require("node-fetch");
let Client = require("../Client/Client");
let DiscordAPIError = require("../Errors/DiscordAPI");
module.exports = class Request {
  /**
   * The Request Object
   * @param {Object} data The data for the request
   * @param {Client} data.client The client
   * @param {String} data.endpoint The endpoint
   * @param {String} data.method The method
   * @param {Object} data.data The data
   * @throws {ReferenceError} If the client is not provided
   * @throws {ReferenceError} If the endpoint is not provided
   * @throws {ReferenceError} If the method is not provided
   * @throws {TypeError} If the client is not a Client
   * @throws {TypeError} If the data is not an object
   */
  constructor(data) {
    if (typeof data != "object") throw new TypeError("Data must be an object");
    if (!data.client) throw new ReferenceError("Client is required");
    if (!data.endpoint) throw new ReferenceError("Endpoint is required");
    if (!data.method) throw new ReferenceError("Method is required");
    if (data.data && typeof data.data != "object")
      throw new TypeError("Data must be an object");
    this.client = data.client;
    this.endpoint = data.endpoint;
    this.method = data.method;
    this.data = data.data;
  }
  call() {
    return new Promise((resolve, reject) => {
      let params = {
        method: this.method,
        headers: {
          Authorization: `Bot ${this.client.token}`,
          "Content-Type": "application/json",
          "User-Agent": `DiscordBot (https://github.com/Heppcat-Programming/protobots, ${this.client.version})`,
        },
      };
      if (this.data) params["body"] = JSON.stringify(this.data);
      console.log(params);
      fetch(`${this.client.apiUrl}/${this.endpoint}`, params).then((r) => {
        r.json()
          .then((res) => {
            console.log(res);
            if (res.code != 0 && r.status != 200)
              reject(
                new Error(
                  `${this.client.apiUrl}/${this.endpoint} ` +
                    DiscordAPIError.getMessages(res)
                )
              );
            resolve(res);
            this.response = res;
          })
          .catch((err) => {
            reject(new Error(err));
          });
      });
    });
  }
};
