'use strict';

//describe('Controller: ProjectAppliedFundsCtrl', function () {
  //beforeEach(module('buildpayApp'));

  //var ProjectAppliedFundsCtrl, scope, Messages, projectAppliedFundsService;

  //var projectId = 12345;

  //var stateParams = {
    //id: projectId
  //};

  //var project = jasmine.createSpyObj('projectSpy', ['id', 'appliedFunds', 'getAppliedFunds']);
  //project.permissions = jasmine.createSpyObj('projectPermissions', ['canViewProjectFunds', 'canApplyProjectFunds']);

  //beforeEach(module('buildpayApp', function ($provide) {
    //$provide.provider('project', function () {
      //return {
        //$get: jasmine.createSpy('project').and.returnValue(project)
      //};
    //});
  //}));

  //beforeEach(inject(function ($controller, $rootScope, $q, project) {
    //scope = $rootScope.$new();

    //Messages = jasmine.createSpyObj('Messages', ['addSuccess']);

    //projectAppliedFundsService = jasmine.createSpyObj('projectAppliedFundsService', ['updateFunds']);

    //projectAppliedFundsService.updateFunds.and.returnValue($q.when({ data: { success: true }}));

    //ProjectAppliedFundsCtrl = $controller('ProjectAppliedFundsCtrl', {
      //$stateParams: stateParams,
      //projectAppliedFundsService: projectAppliedFundsService,
      //Messages: Messages,
      //project: project
    //});
  //}));

  ////it('initializes funds to empty object and then sets it via service call', function() {
    ////expect(ProjectAppliedFundsCtrl.funds).toEqual(project.appliedFunds);
    ////expect(project.getAppliedFunds).toHaveBeenCalled();
  ////});

  ////describe('updateProjectFunds', function() {
    ////it('utilizes service to update funds', function() {
      ////scope.$digest();
      ////ProjectAppliedFundsCtrl.updateProjectFunds();

      ////scope.$digest();

      ////expect(Messages.addSuccess).toHaveBeenCalledWith('Project applied funds updated.');
      ////expect(projectAppliedFundsService.updateFunds).toHaveBeenCalledWith(project.id, project.appliedFunds);
    ////});
  ////});
//});
