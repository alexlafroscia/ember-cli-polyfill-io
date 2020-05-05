"use strict";

const debug = require("debug")("ember-cli-polyfill-io:lib");

function processArrayElement(value) {
  if (typeof value === "string") {
    return encodeURIComponent(value);
  }

  let segment = value.name;
  for (const key of Object.keys(value)) {
    if (key !== "name" && value[key]) {
      segment += `|${key}`;
    }
  }

  return segment;
}

function buildSrc(_config) {
  const config = Object.assign({}, _config);
  let min = typeof config.min !== "undefined" ? config.min : true;
  let src =
    config.src || `https://cdn.polyfill.io/v3/polyfill${min ? ".min" : ""}.js`;

  delete config.src;
  delete config.min;

  debug(`Using ${src} as polyfill location`);

  const queryParams = [];
  for (const key of Object.keys(config)) {
    const value = config[key];
    let segment;

    if (Array.isArray(value)) {
      segment = `${key}=${value.map(processArrayElement).join(",")}`;
    } else {
      segment = `${key}=${encodeURIComponent(value)}`;
    }

    queryParams.push(segment);
  }

  // Create the query string from the individual params
  let queryString = "";
  if (queryParams.length) {
    queryString = `?${queryParams.join("&")}`;
  }

  return src + queryString;
}

module.exports = buildSrc;
