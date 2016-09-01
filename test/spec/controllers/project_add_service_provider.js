//'use strict';

//describe('Controller: ProjectAddServiceProvider', function () {
  //beforeEach(module('buildpayApp'));

  //var ProjectAddServiceProviderCtrl, scope, Messages, state, Projects, project;

  //var potentialServiceProviders = [ { user1: 'hello' }, { user2: 'hello2' } ];

  //var projectId = 12345;

  //var stateParams = {
    //id: projectId
  //};

  //beforeEach(inject(function ($controller, $rootScope, $q) {
    //scope = $rootScope.$new();

    //Messages = jasmine.createSpyObj('Messages', ['addSuccess']);

    //project = jasmine.createSpyObj('projectSpy', ['get', 'getPermissions', 'startProject']);
    //project.id = projectId;

    //Projects = jasmine.createSpyObj('Projects', ['getPotentialServiceProviders', 'addServiceProvider']);
    //Projects.getPotentialServiceProviders.and.returnValue($q.when({ data: { users: potentialServiceProviders }}));
    //Projects.addServiceProvider.and.returnValue($q.when({ data: { success: true }}));

    //state = jasmine.createSpyObj('state', ['go']);
    //state.params = stateParams;

    //ProjectAddServiceProviderCtrl = $controller('ProjectAddServiceProviderCtrl', {
      //$state: state,
      //project: project,
      //Projects: Projects,
      //Messages: Messages
    //});
  //}));

  //describe('getting potential service providers', function() {
    //it('sets potential service providers', function() {
      //expect(ProjectAddServiceProviderCtrl.potentialServiceProviders).toEqual([]);
      //scope.$digest();
      //expect(ProjectAddServiceProviderCtrl.potentialServiceProviders).toEqual(potentialServiceProviders);
      //expect(Projects.getPotentialServiceProviders).toHaveBeenCalledWith(projectId);
    //});
  //});

  //describe('addServiceProvider', function() {
    //var userId = 12355;

    //it('adds service provider to project', function() {
      //ProjectAddServiceProviderCtrl.addServiceProvider(userId);

      //scope.$digest();

      //expect(Messages.addSuccess).toHaveBeenCalledWith('Service provider added.');
      //expect(Projects.addServiceProvider).toHaveBeenCalledWith(projectId, userId);
      //expect(state.go).toHaveBeenCalledWith('project.members.member.view', { id: projectId, memberId: userId });
    //});
  //});
//});
