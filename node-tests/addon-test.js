/* eslint-env mocha */

"use strict";

const expect = require("chai").expect;
const readFileSync = require("fs").readFileSync;
const resolve = require("path").resolve;

describe("generating the `index.html`", function () {
  beforeEach(function () {
    this.index = readFileSync(
      resolve(__dirname, "../dist/index.html")
    ).toString();
  });

  it("injects the polyfill before the app", function () {
    const lines = this.index.split("\n");
    const polyfillLine = lines.find((line) => line.includes("polyfill.io"));
    const appLine = lines.find((line) => line.includes("dummy.js"));

    expect(lines.indexOf(polyfillLine) < lines.indexOf(appLine)).to.be.ok;
  });
});
