module.exports = class User {
  constructor(data) {
    this.id = null;
    this.username = null;
    this.discriminator = null;
    this.avatar = null;
    this.bot = null;
    this.system = null;
    this.banner = null;
    this.accent_color = null;
    this.public_flags = null;
    if (typeof data == "object") this._patch(data);
  }
  _patch(data) {
    for (let field in data) {
      switch (field) {
        case "avatar":
          this[field] = `https://cdn.discordapp.com/${data[field]}.jpg`;
        default:
          this[field] = data[field];
      }
    }
  }
};
