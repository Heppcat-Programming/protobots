module.exports = class Embed {
  /**
   * The embed data in an object
   * @param {Object} data
   */
  constructor(data) {
    if (typeof data === "object") this._patch(data);
    else this._patch({});
  }
  _patch(data) {
    this.title = data.title ?? undefined;
    this.description = data.description ?? undefined;
    this.url = data.url ?? undefined;
    this.timestamp = data.timestamp ?? undefined;
    let color;
    if (typeof color === "string")
      if (color.startsWith("#")) color = parseInt(color.replace(/^#/, ""), 16);
      else color = parseInt(color);
    this.color = color ?? undefined;
    this.footer = data.footer ?? undefined;
    this.image = data.image ?? undefined;
    this.thumbnail = data.thumbnail ?? undefined;
    this.video = data.video ?? undefined;
    this.provider = data.provider ?? undefined;
    this.author = data.author ?? undefined;
    this.fields = data.fields ?? [];
  }
  /**
   * Set the embed title
   * @param {String} title
   */
  setTitle(title) {
    this.title = title;
  }
  /**
   * Set the embed description
   * @param {String} description
   */
  setDescription(description) {
    this.description = description;
  }
  /**
   * Set the embed url
   * @param {String} url
   */
  setUrl(url) {
    this.url = url;
  }
  /**
   * Set the embed timestamp
   * @param {Date} timestamp
   */
  setTimestamp(timestamp = new Date().getTime()) {
    this.timestamp = timestamp;
  }
  /**
   * Set the embed color
   * @param {String} color Hex color code
   */
  setColor(color) {
    if (typeof color === "string")
      if (color.startsWith("#")) color = parseInt(color.replace(/^#/, ""), 16);
      else color = parseInt(color);
    this.color = color;
  }
  /**
   * Set the embed footer
   * @param {Object} footer Object containing the footer data
   * @param {String} footer.text Text of the footer
   * @param {String} footer.icon_url URL of the footer icon
   * @param {String} footer.proxy_icon_url URL of the footer icon proxy
   */
  setFooter(footer) {
    this.footer = footer;
  }
  /**
   * Set the embed image
   * @param {Object} image Object containing the image data
   * @param {String} image.url URL of the image
   * @param {String} image.proxy_url URL of the image proxy
   * @param {Number} image.height Height of the image
   * @param {Number} image.width Width of the image
   */
  setImage(image) {
    this.image = image;
  }
  /**
   * Set the embed thumbnail
   * @param {Object} thumbnail Object containing the thumbnail data
   * @param {String} thumbnail.url URL of the thumbnail
   * @param {String} thumbnail.proxy_url URL of the thumbnail proxy
   * @param {Number} thumbnail.height Height of the thumbnail
   * @param {Number} thumbnail.width Width of the thumbnail
   */
  setThumbnail(thumbnail) {
    this.thumbnail = thumbnail;
  }
  /**
   * Set the embed video
   * @param {Object} video Object containing the video data
   * @param {String} video.url URL of the video
   * @param {Number} video.height Height of the video
   * @param {Number} video.width Width of the video
   * @param {String} video.proxy_url URL of the video proxy
   */
  setVideo(video) {
    this.video = video;
  }
  /**
   * Set the embed provider
   * @param {Object} provider Object containing the provider data
   * @param {String} provider.name Name of the provider
   * @param {String} provider.url URL of the provider
   */
  setProvider(provider) {
    this.provider = provider;
  }
  /**
   * Set the embed author
   * @param {Object} author Object containing the author data
   * @param {String} author.name Name of the author
   * @param {String} author.url URL of the author
   * @param {String} author.icon_url URL of the author icon
   * @param {String} author.proxy_icon_url URL of the author icon proxy
   */
  setAuthor(author) {
    this.author = author;
  }
  /**
   * Add an embed field
   * @param {Object} field Object containing the fields data
   * @param {String} field.name Name of the field
   * @param {String} field.value Value of the field
   * @param {Boolean} field.inline Whether the field is inline or not
   */
  setFields(field) {
    this.fields.push(field);
  }
  toJson() {
    let data = {};
    for (let field in this) {
      if (this[field] != undefined) {
        data[field] = this[field];
      }
    }
    return data;
  }
};
