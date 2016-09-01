'use strict';

describe('Service: Profiles', function () {

  // load the service's module
  beforeEach(module('buildpayApp'));

  // instantiate service
  var Profiles, $http;

  var getProfilePromise = jasmine.createSpy('getProfilePromise');

  var updateProfilePromise = jasmine.createSpy('updateProfilePromise');

  beforeEach(inject(function (_Profiles_, _$http_) {
    spyOn(_$http_, 'get').and.returnValue(getProfilePromise);
    spyOn(_$http_, 'put').and.returnValue(updateProfilePromise);
    $http = _$http_;

    Profiles = _Profiles_;
  }));

  describe('#get', function() {
    it('calls GET on $http and returns promise', function() {
      expect(Profiles.get()).toEqual(getProfilePromise);

      expect($http.get).toHaveBeenCalledWith('http://localhost:3000/my_profile');
    });
  });

  describe('#update', function() {
    it('calls PUT on $http and returns promise', function() {
      var updateProfileData = { first_name: 'testupdate' };

      expect(Profiles.update(updateProfileData)).toEqual(updateProfilePromise);

      expect($http.put).toHaveBeenCalledWith('http://localhost:3000/my_profile', { profile: updateProfileData });
    });
  });
});
