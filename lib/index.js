'use strict';

const debug = require('debug')('ember-cli-polyfill-io:lib');

function buildSrc(config = {}) {
  let min = typeof config.min !== 'undefined' ? config.min : true;
  let src = config.src || `https://cdn.polyfill.io/v2/polyfill${min ? '.min' : ''}.js`;
  let features = config.features || [];

  debug(`Using ${src} as polyfill location`);

  features = features.map((feature) => {
    let name, gated, always;

    if (typeof feature === 'string') {
      name = feature;
      gated = false;
      always = false;
    }

    if (typeof feature === 'object') {
      ({ name, gated = false, always = false } = feature);
    }

    debug(`Using feature ${name} with options { gated: ${gated}, always: ${always} }`);

    return { name, gated, always };
  });

  // Build up the set of query params
  let queryParams = [];
  if (features.length) {
    const featureParam = features
      .map((feature) => {
        let segment = feature.name;
        if (feature.always) {
          segment += '|always';
        }

        if (feature.gated) {
          segment += '|gated';
        }

        return segment;
      })
      .join(',');
    queryParams.push(`features=${featureParam}`);
  }

  const excludes = config.excludes || [];
  if (excludes.length) {
    queryParams.push(`excludes=${excludes.join(',')}`);
  }

  const flags = config.flags || [];
  if (flags.length) {
    queryParams.push(`flags=${flags.join(',')}`);
  }

  // Add query param for all "literal" config options
  for (const literalParam of ['ua', 'callback', 'unknown', 'rum']) {
    const value = config[literalParam];
    if (value) {
      queryParams.push(`${literalParam}=${value}`);
    }
  }

  // Create the query string from the individual params
  let queryString = '';
  if (queryParams.length) {
    queryString = `?${queryParams.join('&')}`;
  }

  return src + queryString;
}

module.exports = buildSrc;
