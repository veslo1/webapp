//'use strict';

//describe('Controller: ProjectsCtrl', function () {
  //beforeEach(module('buildpayApp'));

  //var projectsCtrl, scope, Projects, currentUser;

  //var projects = jasmine.createSpy('mock projects');

  //// Initialize the controller and a mock scope
  //beforeEach(inject(function ($controller, $rootScope, $q) {
    //scope = $rootScope.$new();

    //Projects = jasmine.createSpyObj('Projects', ['query']);
    //Projects.query.and.returnValue($q.when({ data: { projects: projects } }));

    //currentUser = jasmine.createSpyObj('currentUser', ['permissions']);
    //currentUser.permissions = jasmine.createSpyObj('permissions', ['canCreateProjects']);

    //projectsCtrl = $controller('ProjectsCtrl', {
      //Projects: Projects,
      //currentUser: currentUser
    //});
  //}));

  //it('gets projects from api', function () {
    //// initial value
    //expect(projectsCtrl.projects).toEqual([]);

    //// after retrieving users from service
    //scope.$digest();
    //expect(projectsCtrl.projects).toEqual(projects);
  //});

  //describe('canCreateProject', function() {
    //describe('currentUser is set as funder', function() {
      //beforeEach(function() {
        //currentUser.permissions.canCreateProjects.and.returnValue(true);
      //});

      //it('returns true', function() {
        //expect(projectsCtrl.canCreateProject()).toEqual(true);
      //});
    //});

    //describe('currentUser is NOT set as funder', function() {
      //beforeEach(function() {
        //currentUser.permissions.canCreateProjects.and.returnValue(false);
      //});

      //it('returns false', function() {
        //expect(projectsCtrl.canCreateProject()).toEqual(false);
      //});
    //});
  //});
//});
