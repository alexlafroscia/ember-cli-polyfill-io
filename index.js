'use strict';

const debug = require('debug')('ember-cli-polyfill-io:addon');
const buildSrc = require('./lib');

module.exports = {
  name: 'polyfill-io',

  contentFor(type, config) {
    const polyfillConfig = config['polyfill-io'] || {};
    const contentForType = polyfillConfig.contentFor || 'head';

    if (type !== contentForType) {
      return;
    }

    const src = buildSrc(polyfillConfig);

    debug(`Using script src: ${src}`);

    return `
      <script src="${src}"></script>
    `;
  }
};
