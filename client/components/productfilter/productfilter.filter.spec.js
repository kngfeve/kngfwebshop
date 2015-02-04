'use strict';

describe('Filter: productfilter', function () {

  // load the filter's module
  beforeEach(module('kngfwebshopApp'));

  // initialize a new instance of the filter before each test
  var productfilter;
  beforeEach(inject(function ($filter) {
    productfilter = $filter('productfilter');
  }));

  it('should return the input prefixed with "productfilter filter:"', function () {
    var text = 'angularjs';
    expect(productfilter(text)).toBe('productfilter filter: ' + text);
  });

});
