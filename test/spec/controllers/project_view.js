//'use strict';

//describe('Controller: ProjectOverview', function () {
  //beforeEach(module('buildpayApp'));

  //var ProjectOverview, project, scope, Messages, Projects;
  //var canStartProjectValue = jasmine.createSpy('return value for start project');

  //beforeEach(inject(function ($controller, $rootScope, $q) {
    //scope = $rootScope.$new();

    //project = jasmine.createSpyObj('projectSpy', ['id', 'get', 'getPermissions']);
    //project.permissions = jasmine.createSpyObj('projectPermissions', ['canStartProject']);
    //project.permissions.canStartProject.and.returnValue(canStartProjectValue);

    //Projects = jasmine.createSpyObj('Projects', ['startProject']);
    //Projects.startProject.and.returnValue($q.when({ data: { success: true } }));

    //Messages = jasmine.createSpyObj('Messages', ['addSuccess']);

    //ProjectOverview = $controller('ProjectOverview', {
      //project: project,
      //Projects: Projects,
      //Messages: Messages
    //});
  //}));

  //it('sets project to resolve', function () {
    //expect(ProjectOverview.project).toEqual(project);
  //});

  //describe('startProject', function() {
    //it('calls projects service start project', function() {
      //ProjectOverview.startProject();
      //scope.$digest();
      //expect(Projects.startProject).toHaveBeenCalledWith(project.id);
      //expect(project.get).toHaveBeenCalled();
      //expect(project.getPermissions).toHaveBeenCalled();
      //expect(Messages.addSuccess).toHaveBeenCalledWith('Project started.');
    //});
  //});
//});
