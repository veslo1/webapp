//'use strict';

//describe('Controller: ProjectAddFunderCtrl', function () {
  //beforeEach(module('buildpayApp'));

  //var ProjectAddFunderCtrl, project, scope, Messages, state, Projects;

  //var user1 = {
    //id: 12345,
    //first_name: 'Funder1 First Name',
    //last_name: 'Funder1 Last Name'
  //};

  //var user2 = {
    //id: 5431,
    //first_name: 'Funder2 First Name',
    //last_name: 'Funder2 Last Name'
  //};

  //var potentialFunders = [ user1, user2 ];

  //var projectId = 12345;

  //var stateParams = {
    //id: projectId
  //};

  //beforeEach(inject(function ($controller, $rootScope, $q) {
    //scope = $rootScope.$new();

    //Messages = jasmine.createSpyObj('Messages', ['addSuccess']);

    //project = jasmine.createSpyObj('projectSpy', ['get', 'getPermissions', 'startProject']);
    //project.id = projectId;

    //Projects = jasmine.createSpyObj('Projects', ['getPotentialFunders', 'updateFunder']);
    //Projects.getPotentialFunders.and.returnValue($q.when({ data: { users: potentialFunders }}));
    //Projects.updateFunder.and.returnValue($q.when({ data: { success: true }}));

    //state = jasmine.createSpyObj('state', ['go']);
    //state.params = stateParams;

    //ProjectAddFunderCtrl = $controller('ProjectAddFunderCtrl', {
      //$state: state,
      //project: project,
      //Projects: Projects,
      //Messages: Messages
    //});
  //}));

  //describe('getting potential funders', function() {
    //it('sets potential funders', function() {
      //expect(ProjectAddFunderCtrl.potentialFunders).toEqual([]);
      //scope.$digest();
      //expect(ProjectAddFunderCtrl.potentialFunders).toEqual(potentialFunders);
      //expect(Projects.getPotentialFunders).toHaveBeenCalledWith(projectId);
    //});
  //});

  //describe('addFunder', function() {
    //var userId = 12355;

    //it('adds funder to project', function() {
      //ProjectAddFunderCtrl.addFunder(userId);

      //scope.$digest();

      //expect(Messages.addSuccess).toHaveBeenCalledWith('Project funder changed.');
      //expect(Projects.updateFunder).toHaveBeenCalledWith(projectId, userId);
      //expect(state.go).toHaveBeenCalledWith('project.members.index', { id: projectId });
    //});
  //});
//});
