/* global require, describe, it */

var awesome = require('../src/js/awesome');

describe("Hats", function() {
    it("should do something", function() {
        var result = awesome.add(10, 11);
    });
    
    it("should do something else", function() {
        var result = awesome.add(12, 100);
    });
});