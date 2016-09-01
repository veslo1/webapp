'use strict';

describe('Service: currentUser', function () {
  beforeEach(module('buildpayApp'));

  var currentUser;

  beforeEach(inject(function (_currentUser_) {
    currentUser = _currentUser_;
    currentUser.system_role = 'user';
  }));

  it('extends user', function() {
    expect(currentUser.system_role).toEqual('user');
  });
});
