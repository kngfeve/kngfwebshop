'use strict';

describe('Service: cartFactory', function () {

  // load the service's module
  beforeEach(module('kngfwebshopApp'));

  // instantiate service
  var shipFactory;
  beforeEach(inject(function (_shipFactory_) {
    shipFactory = _shipFactory_;
  }));

  it('should do something', function () {
    expect(!!shipFactory).toBe(true);
  });

});
