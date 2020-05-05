"use strict";

const debug = require("debug")("ember-cli-polyfill-io:addon");
const buildSrc = require("./lib");

module.exports = {
  name: require("./package").name,

  contentFor(type, config) {
    if (type !== "head") {
      return;
    }

    const polyfillConfig = config["polyfill-io"] || {};
    const src = buildSrc(polyfillConfig);

    debug(`Using script src: ${src}`);

    return `
      <script src="${src}"></script>
    `;
  },
};
