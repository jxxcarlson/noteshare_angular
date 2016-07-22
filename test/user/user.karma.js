"use strict";

/* var app = angular.module('user', []) */

describe('test of testing framework', function(){

  /* http://jasmine.github.io/2.0/introduction.html */

  beforeEach(function() {
      this.foo = 0;
    });

    it("can use the `this` to share state", function() {
      expect(this.foo).toEqual(0);
      this.bar = "test pollution?";
    });

})
