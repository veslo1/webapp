'use strict';

//describe('Controller: ProjectMembersCtrl', function () {

  //// load the controller's module
  //beforeEach(module('buildpayApp'));

  //var scope, ProjectMembersCtrl, project, ProjectMembers, members;
  //var canChangeFunderValue = jasmine.createSpy('can change funder return value');
  //var canChangeOwnerValue = jasmine.createSpy('can change owner return value');
  //var canAddServiceProvidersValue = jasmine.createSpy('can add sp return value');

  //beforeEach(inject(function ($rootScope, $controller, $q) {
    //scope = $rootScope.$new();
    //project = jasmine.createSpyObj('projectSpy', ['id', 'get', 'getPermissions', 'getMembers', 'members']);

    //members = {
      //funder: jasmine.createSpy('funder'),
      //owner: jasmine.createSpy('owner'),
      //service_providers: jasmine.createSpy('service providers')
    //};

    //ProjectMembers = jasmine.createSpyObj('ProjectMembers', ['getProjectMembers']);
    //ProjectMembers.getProjectMembers.and.returnValue($q.when({ data: { members: members }}));

    //project.permissions = jasmine.createSpyObj('projectPermissions', ['canChangeFunder', 'canChangeOwner', 'canAddServiceProviders']);
    //project.permissions.canChangeFunder.and.returnValue(canChangeFunderValue);
    //project.permissions.canChangeOwner.and.returnValue(canChangeOwnerValue);
    //project.permissions.canAddServiceProviders.and.returnValue(canAddServiceProvidersValue);


    //ProjectMembersCtrl = $controller('ProjectMembersCtrl', {
      //project: project,
      //ProjectMembers: ProjectMembers
    //});
  //}));

  //it('sets project from resolve', function() {
    //scope.$digest();
    //expect(ProjectMembersCtrl.projectId).toEqual(project.id);
    //expect(ProjectMembersCtrl.funder).toEqual(members.funder);
    //expect(ProjectMembersCtrl.owner).toEqual(members.owner);
    //expect(ProjectMembersCtrl.service_providers).toEqual(members.service_providers);
    //expect(ProjectMembers.getProjectMembers).toHaveBeenCalledWith(project.id);
  //});

  //describe('permissions methods', function() {
    //it('returns correct value', function() {
      //expect(ProjectMembersCtrl.canChangeFunder()).toEqual(canChangeFunderValue);
      //expect(ProjectMembersCtrl.canChangeOwner()).toEqual(canChangeOwnerValue);
      //expect(ProjectMembersCtrl.canAddServiceProviders()).toEqual(canAddServiceProvidersValue);
    //});
  //});
//});
