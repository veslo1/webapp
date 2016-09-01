//'use strict';

//describe('Controller: ProjectAddOwnerCtrl', function () {
  //beforeEach(module('buildpayApp'));

  //var ProjectAddOwnerCtrl, scope, Messages, state, Projects;
  //var project;

  //var potentialOwners = [ { user1: 'hello' }, { user2: 'hello2' } ];

  //beforeEach(inject(function ($controller, $rootScope, $q) {
    //scope = $rootScope.$new();

    //Messages = jasmine.createSpyObj('Messages', ['addSuccess']);

    //project = jasmine.createSpyObj('project', ['id', 'getPermissions']);

    //Projects = jasmine.createSpyObj('Projects', ['getPotentialOwners', 'updateOwner']);
    //Projects.getPotentialOwners.and.returnValue($q.when({ data: { users: potentialOwners }}));
    //Projects.updateOwner.and.returnValue($q.when({ data: { success: true }}));

    //state = jasmine.createSpyObj('state', ['go']);

    //ProjectAddOwnerCtrl = $controller('ProjectAddOwnerCtrl', {
      //$state: state,
      //project: project,
      //Projects: Projects,
      //Messages: Messages
    //});
  //}));

  //describe('getting potential owners', function() {
    //it('sets potential owners', function() {
      //expect(ProjectAddOwnerCtrl.potentialOwners).toEqual([]);
      //scope.$digest();
      //expect(ProjectAddOwnerCtrl.potentialOwners).toEqual(potentialOwners);
      //expect(Projects.getPotentialOwners).toHaveBeenCalledWith(project.id);
    //});
  //});

  //describe('addOwner', function() {
    //var userId = 12355;

    //it('adds owner to project', function() {
      //ProjectAddOwnerCtrl.addOwner(userId);

      //scope.$digest();

      //expect(project.getPermissions).toHaveBeenCalled();
      //expect(Messages.addSuccess).toHaveBeenCalledWith('Project owner changed.');
      //expect(Projects.updateOwner).toHaveBeenCalledWith(project.id, userId);
      //expect(state.go).toHaveBeenCalledWith('project.members.index', { id: project.id });
    //});
  //});
//});
