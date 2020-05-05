# ember-cli-polyfill-io

![CI](https://github.com/alexlafroscia/ember-cli-polyfill-io/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/ember-cli-polyfill-io.svg)](https://badge.fury.io/js/ember-cli-polyfill-io)

Ember CLI addon for including [`polyfill.io`][polyfill-io] in your Ember application

## Installation

```bash
ember install ember-cli-polyfill-io
```

## Configuration

You can provide configuration options through the `config/environment.js` file in your Ember app. The properties align with the [API provided by Polyfill.io][polyfill-docs], so use that for deeper documentation.

None of the following options are required, not even an empty `polyfill-io` object; with no configuration, the polyfill will just be injected by itself.

```javascript
module.exports = function () {
  return {
    "polyfill-io": {
      // Custom URL to the polyfill, in case you are self-hosting
      src: "https://cdn.mysite.com/assets/polyfill.js",

      // min: Whether or not to use the minified version of the polyfill
      //      Only applicable if using the default `src`
      min: false,

      // features: What you want to enable
      features: [
        // Supports a string format...
        "Intl",

        // ...and an object format
        { name: "Array.prototype.find", always: false, gated: true },
      ],

      // excludes: features to leave out
      excludes: ["Array.prototype.contains"],

      // flags: flags to add to all features
      flags: ["gated"],

      // All other options just provide the value directly to the query param
      ua: "foo",
      callback: "bar",
      unknown: "baz",
      rum: 0,
    },
  };
};
```

[polyfill-io]: https://polyfill.io/v3/
[polyfill-docs]: https://polyfill.io/v3/api/
