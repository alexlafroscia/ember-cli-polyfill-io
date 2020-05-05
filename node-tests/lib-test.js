/* eslint-env mocha */

"use strict";

// Default Address
const DA = "https://cdn.polyfill.io/v3/polyfill.min.js";

const expect = require("chai").expect;
const buildSrc = require("../lib");

describe("no configuration", function () {
  it("just returns the default polyfill src", function () {
    expect(buildSrc({})).to.equal(DA);
  });

  it("does not blow up when passed nothing", function () {
    expect(buildSrc()).to.equal(DA);
  });
});

describe("adding features", function () {
  describe("passing an array of strings", function () {
    it("sets up a the list of features", function () {
      const result = buildSrc({
        features: ["foo", "bar"],
      });

      expect(result).to.equal(`${DA}?features=foo,bar`);
    });
  });

  describe("passing an array of configuration objects", function () {
    it("sets up a the list of features", function () {
      const result = buildSrc({
        features: [{ name: "foo" }, { name: "bar" }],
      });

      expect(result).to.equal(`${DA}?features=foo,bar`);
    });

    it("can configure the `gated` property", function () {
      const result = buildSrc({
        features: [{ name: "foo", gated: true }],
      });

      expect(result).to.equal(`${DA}?features=foo|gated`);
    });

    it("can configure the `always` property", function () {
      const result = buildSrc({
        features: [{ name: "foo", always: true }],
      });

      expect(result).to.equal(`${DA}?features=foo|always`);
    });

    it("works with both `gated` and `always`", function () {
      const result = buildSrc({
        features: [{ name: "foo", always: true, gated: true }],
      });

      expect(result).to.equal(`${DA}?features=foo|always|gated`);
    });
  });
});

describe("exluding features", function () {
  it("can be given an array of features to exclude", function () {
    const result = buildSrc({
      excludes: ["foo", "bar"],
    });

    expect(result).to.equal(`${DA}?excludes=foo,bar`);
  });
});

describe("using multiple configuration options", function () {
  it("can create a complex polyfill source", function () {
    const result = buildSrc({
      features: ["foo"],
      excludes: ["bar"],
    });

    expect(result).to.equal(`${DA}?features=foo&excludes=bar`);
  });
});

describe("using the minified file", function () {
  it("can use the un-minified file", function () {
    expect(buildSrc({ min: false })).to.equal(
      "https://cdn.polyfill.io/v3/polyfill.js"
    );
  });

  it("does not interfere with providing a custom src", function () {
    const customPath = "https://foo/polyfill.js";
    const result = buildSrc({ min: false, src: customPath });

    expect(result).to.equal(customPath);
  });
});

describe("providing a custom path to the polyfill", function () {
  it("can provide a custom polyfill path", function () {
    const customPath = "https://foo/polyfill.js";

    expect(buildSrc({ src: customPath })).to.equal(customPath);
  });
});

describe("providing flags", function () {
  it("can set default flags", function () {
    expect(buildSrc({ flags: ["gated", "always"] })).to.equal(
      `${DA}?flags=gated,always`
    );
  });
});

describe("literal params", function () {
  it("URI encodes the provided parameters", function () {
    expect(buildSrc({ ua: "foo bar" })).to.equal(`${DA}?ua=foo%20bar`);
  });

  it("can pass through the `ua` param", function () {
    expect(buildSrc({ ua: "foo" })).to.equal(`${DA}?ua=foo`);
  });

  it("can pass through the `callback` param", function () {
    expect(buildSrc({ callback: "foo" })).to.equal(`${DA}?callback=foo`);
  });

  it("can pass through the `unknown` param", function () {
    expect(buildSrc({ unknown: "foo" })).to.equal(`${DA}?unknown=foo`);
  });

  it("can pass through the `rum` param", function () {
    expect(buildSrc({ rum: 1 })).to.equal(`${DA}?rum=1`);
  });
});
