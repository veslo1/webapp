'use strict';

describe('Directive: bpNavbar', function () {

  // load the directive's module
  beforeEach(module('buildpayApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bp-navbar></bp-navbar>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the bpNavbar directive');
  }));
});

// test taken from NavCtrl test...
// figure out how to test this stuff in directive

//describe('Controller: NavCtrl', function () {

  //// load the controller's module
  //beforeEach(module('buildpayApp'));

  //var NavCtrl, state, currentState, scope, sessionsService, currentUser;

  //beforeEach(inject(function ($controller, $rootScope, $q) {
    //scope = $rootScope.$new();

    //currentState = { url: null };
    //state = {
      //go: jasmine.createSpy(),
      //current: currentState
    //};

    //sessionsService = jasmine.createSpyObj('sessionsService', ['destroy']);
    //sessionsService.destroy.and.returnValue($q.when({ data: { success: true }}));
    //currentUser = jasmine.createSpyObj('currentUser', ['logout']);

    //NavCtrl = $controller('NavCtrl', {
      //$state: state,
      //sessionsService: sessionsService,
      //currentUser: currentUser
    //});
  //}));

  //describe('initialize', function() {
    //it('sets authenticated funtion', function() {
      //expect(NavCtrl.currentUser).toEqual(currentUser);
    //});
  //});

  //describe('isActive', function() {
    //describe('when $state.current.url is /', function() {
      //beforeEach(function() {
        //currentState.url = '/';
        //currentState.name = 'root';
      //});

      //it('returns true when path is root url', function() {
        //expect(NavCtrl.isActive('/')).toBe(true);
      //});

      //it('returns false when path is not root url', function() {
        //expect(NavCtrl.isActive('projects')).toBe(false);
      //});
    //});

    //describe('when $state.current.url is /projects', function() {
      //beforeEach(function() {
        //currentState.name = 'projects';
      //});

      //it('returns false when path is root url', function() {
        //expect(NavCtrl.isActive('/')).toBe(false);
      //});

      //it('returns true when path starts with /projects', function() {
        //expect(NavCtrl.isActive('projects')).toBe(true);
      //});
    //});

    //describe('when $state.current.url is /projects/new', function() {
      //beforeEach(function() {
        //currentState.name = 'projects_new';
      //});

      //it('returns false when path is root url', function() {
        //expect(NavCtrl.isActive('/')).toBe(false);
      //});

      //it('returns true when path starts with /projects', function() {
        //expect(NavCtrl.isActive('projects')).toBe(true);
      //});
    //});

    //describe('when $state.current.url is /directory', function() {
      //beforeEach(function() {
        //currentState.name = 'directory_users';
      //});

      //it('returns false when path is root url', function() {
        //expect(NavCtrl.isActive('/')).toBe(false);
      //});

      //it('returns true when test path is /directory', function() {
        //expect(NavCtrl.isActive('directory')).toBe(true);
      //});
    //});

    //describe('when $state.current.url is /directory/invites/new', function() {
      //beforeEach(function() {
        //currentState.name = 'directory_invites_new';
      //});

      //it('returns false when path is root url', function() {
        //expect(NavCtrl.isActive('/')).toBe(false);
      //});

      //it('returns true when test path is /directory', function() {
        //expect(NavCtrl.isActive('directory')).toBe(true);
      //});
    //});
  //});

  //describe('destroySession', function() {
    //it('destroys session', function() {
      //NavCtrl.destroySession();
      //scope.$digest();
      //expect(currentUser.logout).toHaveBeenCalled();
      //expect(state.go).toHaveBeenCalledWith('login');
    //});
  //});
//});
