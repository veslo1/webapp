'use strict';

//describe('Controller: LoginCtrl', function () {
  //beforeEach(module('buildpayApp'));

  //var LoginCtrl,
    //scope, state;

  //var Sessions = jasmine.createSpyObj('Sessions', ['create']);
  //var Messages = jasmine.createSpyObj('Messages', ['addSuccess']);
  //var currentUser = jasmine.createSpyObj('currentUser', ['login']);

  //var user = {
    //email: '',
    //password: ''
  //};

  //var loginParams = {
    //email: 'test@example.com',
    //password: 'password123'
  //};

  //var serverUser = {
    //id: 5,
    //email: 'test@example.com',
    //first_name: 'Test First',
    //last_name: 'Test Last'
  //};

  //var authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjp7ImlkIjoxMjExLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicGFzc3dvcmRfaGFzaCI6IiQyYSQxMCRKSGJZRm0xRGhFWU9jS1p2bmsub1VleS9xR214MWNjUVhacXNlSHU1NVMzZG1MYWhXTXlJMiIsImZpcnN0X25hbWUiOiJKb2huIiwibGFzdF9uYW1lIjoiRG9lIiwiYXV0aF90b2tlbiI6bnVsbCwic3RhdHVzIjoiYWN0aXZlIiwicmVnaXN0ZXJlZF9hdCI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMTUtMDktMzBUMTM6MzA6NTYuMjQ4WiIsInVwZGF0ZWRfYXQiOiIyMDE1LTA5LTMwVDEzOjMwOjU2LjI0OFoifSwiaWF0IjoxNDQzNjE5ODU2LCJpc3MiOiJkYW5pZWwtbWFjLmxvY2FsIiwiZXhwIjoxNDQ0MjI0NjU2fQ.xH6uIW8c6tXj-jxxkCbjHLHMXLWcUcEs5d_XpmHC9vBKlIT6LYSmJsjkeaKVIs6XoQXxJa2md3dzFCUX_fbjrg";

  //var authDataResponse = {
    //user: serverUser,
    //auth_token: authToken
  //};

  //beforeEach(inject(function ($controller, $rootScope, $q) {
    //scope = $rootScope.$new();
    //state = jasmine.createSpyObj('stateSpy', ['go']);

    //Sessions.create.and.returnValue($q.when({ data: authDataResponse }));

    //LoginCtrl = $controller('LoginCtrl', {
      //$scope: scope,
      //$state: state,
      //Messages: Messages,
      //currentUser: currentUser,
      //Sessions: Sessions
    //});
  //}));

  //it('initializes user with empty data', function () {
    //expect(LoginCtrl.user).toEqual(user);
  //});

  //describe('createSession', function() {
    //it('sends user info to sessions api', function() {
      //LoginCtrl.user = loginParams;
      //LoginCtrl.createSession();
      //scope.$digest();
      //expect(Sessions.create).toHaveBeenCalledWith(loginParams);
      //expect(currentUser.login).toHaveBeenCalledWith(authDataResponse);
      //expect(state.go).toHaveBeenCalledWith('projects');
      //expect(Messages.addSuccess).toHaveBeenCalledWith('Logged In!');
    //});
  //});
//});
