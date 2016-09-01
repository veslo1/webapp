//'use strict';

//describe('Controller: ProjectCommittedFundsBalanceCtrl', function() {

  //// load the controller's module
  //beforeEach(module('buildpayApp'));

  //var ProjectCommittedFundsBalanceCtrl,
      //scope,
      //Messages;

  //var projectId = "1";
  //var stateParams = { id: projectId };

  //var MaterialFundsCommitment;
  //var LopFundsCommitment;

  //var newCommitment = jasmine.createSpyObj('newCommitment', ['commitFunds', 'getPotentialReceivers']);

  //var funds = jasmine.createSpyObj('funds', ['get']);
  //var form = jasmine.createSpyObj('form', ['$setPristine']);

  //beforeEach(module('buildpayApp', function ($provide) {
    //$provide.decorator('MaterialFundsCommitment', function () {
      //return jasmine.createSpy('MaterialsFundsCommitment').and.returnValue(newCommitment);
    //});
    //$provide.decorator('LopFundsCommitment', function () {
      //return jasmine.createSpy('LopsFundsCommitment').and.returnValue(newCommitment);
    //});
  //}));

  //beforeEach(inject(function ($controller, $rootScope, $q, _MaterialFundsCommitment_, _LopFundsCommitment_) {
    //scope = $rootScope.$new();

    //newCommitment.commitFunds.and.returnValue($q.when({ data: { success: true }}));

    //Messages = jasmine.createSpyObj('Messages', ['addSuccess']);

    //MaterialFundsCommitment = _MaterialFundsCommitment_;
    //LopFundsCommitment = _LopFundsCommitment_;

    //ProjectCommittedFundsBalanceCtrl = $controller('ProjectCommittedFundsBalanceCtrl', {
      //$stateParams: stateParams,
      //MaterialFundsCommitment: _MaterialFundsCommitment_,
      //LopFundsCommitment: _LopFundsCommitment_,
      //Messages: Messages
    //});

    //newCommitment.fund_type = 'Material';

    //ProjectCommittedFundsBalanceCtrl.funds = funds;
    //ProjectCommittedFundsBalanceCtrl.form = form;
  //}));

  //describe('commitMaterialFundsButtonClicked', function() {
    //it('sets potential receivers to response from api when we call showForm', function() {
      //ProjectCommittedFundsBalanceCtrl.commitMaterialFundsButtonClicked();

      //expect(MaterialFundsCommitment).toHaveBeenCalledWith({ projectId: projectId });
      //expect(newCommitment.getPotentialReceivers).toHaveBeenCalled();
      //expect(ProjectCommittedFundsBalanceCtrl.formShowing).toBe(true);
    //});
  //});

  //describe('commitLopFundsButtonClicked', function() {
    //it('sets potential receivers to response from api when we call showForm', function() {
      //ProjectCommittedFundsBalanceCtrl.commitLopFundsButtonClicked();

      //expect(LopFundsCommitment).toHaveBeenCalledWith({ projectId: projectId });
      //expect(newCommitment.getPotentialReceivers).toHaveBeenCalled();
      //expect(ProjectCommittedFundsBalanceCtrl.formShowing).toBe(true);
    //});
  //});

  //describe('commitFunds()', function() {
    //it('calls api then creates a toaster message; toggles form view and updates lop and material totals', function() {
      //ProjectCommittedFundsBalanceCtrl.newCommitment = newCommitment;
      //ProjectCommittedFundsBalanceCtrl.commitFunds();

      //expect(newCommitment.commitFunds).toHaveBeenCalled();
      //scope.$digest();

      //expect(form.$setPristine).toHaveBeenCalled();
      //expect(Messages.addSuccess).toHaveBeenCalledWith('Material funds committed.');
      //expect(ProjectCommittedFundsBalanceCtrl.formShowing).toEqual(false);
      //expect(ProjectCommittedFundsBalanceCtrl.funds.get).toHaveBeenCalled();
    //});
  //});
//});
