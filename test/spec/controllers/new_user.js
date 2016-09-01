'use strict';

//describe('Controller: NewUserCtrl', function () {

  //// load the controller's module
  //beforeEach(module('buildpayApp'));

  //var newUserCtrl,
    //scope, state;

  //var Registrations = jasmine.createSpyObj('Registrations', ['createUser']);
  //var Invites = jasmine.createSpyObj('Invites', ['getInviteByHashId']);
  //var currentUser = jasmine.createSpyObj('currentUser', ['login']);
  //var Messages = jasmine.createSpyObj('Messages', ['addSuccess']);

  //var user = {
    //first_name: '',
    //last_name: '',
    //home_mobile_phone: '',
    //password: '',
    //password_confirmation: ''
  //};

  //var registrationResponse = {
    //user: user,
    //auth_token: 'auth token'
  //};

  //var inviteHashId = '2a2db2e9-1e17-44a8-8e27-dcf107480ecf';

  //var invite = {
    //id: 'some id',
    //email: 'some_user@example.com',
    //first_name: 'some user first',
    //last_name: 'some user last',
    //hash_id: inviteHashId
  //};

  //var userCreateParams = {
    //first_name: invite.first_name,
    //last_name: invite.last_name,
    //home_mobile_phone: '',
    //password: '',
    //password_confirmation: ''
  //};

  //var stateParams = {
    //invite_id: inviteHashId
  //};

  //// Initialize the controller and a mock scope
  //beforeEach(inject(function ($controller, $rootScope, $q) {
    //scope = $rootScope.$new();

    //state = jasmine.createSpyObj('stateSpy', ['go']);
    //state.params = stateParams;

    //Registrations.createUser.and.returnValue($q.when({}));
    //Invites.getInviteByHashId.and.returnValue($q.when({ data: { invite: invite } }));

    //newUserCtrl = $controller('NewUserCtrl', {
      //Invites: Invites,
      //Registrations: Registrations,
      //currentUser: currentUser,
      //Messages: Messages,
      //$state: state
    //});
  //}));

  //it('initializes user with empty data', function () {
    //expect(newUserCtrl.invite).toEqual({});
    //expect(newUserCtrl.user).toEqual(user);
  //});

  //it('sets user data from invite data', function () {
    //scope.$digest();
    //expect(Invites.getInviteByHashId).toHaveBeenCalledWith(inviteHashId);
    //expect(newUserCtrl.user.first_name).toEqual(invite.first_name);
    //expect(newUserCtrl.user.last_name).toEqual(invite.last_name);
    //expect(newUserCtrl.invite).toEqual(invite);
  //});

  //describe('createUser', function() {
    //it('sends user info to registrations api on submit', function() {
      //scope.$digest();
      //newUserCtrl.createUser();
      //scope.$digest();
      //expect(Registrations.createUser).toHaveBeenCalledWith(userCreateParams, inviteHashId);
      //expect(currentUser.login).toHaveBeenCalledWith(registrationResponse.data);
      //expect(state.go).toHaveBeenCalledWith('projects');
      //expect(Messages.addSuccess).toHaveBeenCalledWith('Signed Up!');
    //});
  //});
//});
