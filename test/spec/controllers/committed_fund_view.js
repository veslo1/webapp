'use strict';

//describe('Controller: CommittedFundViewCtrl', function () {
  //beforeEach(module('buildpayApp'));

  //var CommittedFundViewCtrl, scope, CommittedFund, state, Messages;

  //var committedFund = jasmine.createSpyObj('committedFund', ['get', 'project_id', 'acknowledgeFund', 'canAcknowledge']);

  //beforeEach(module('buildpayApp', function ($provide) {
    //$provide.decorator('CommittedFund', function () {
      //return jasmine.createSpy('CommittedFund').and.returnValue(committedFund);
    //});
  //}));

  //beforeEach(inject(function ($rootScope, $controller, $q, _CommittedFund_) {
    //scope = $rootScope.$new();

    //state = jasmine.createSpyObj('state', ['params', 'go']);
    //state.params = {
      //id: jasmine.createSpy('committedFundId')
    //};

    //CommittedFund = _CommittedFund_;

    //committedFund.acknowledgeFund.and.returnValue($q.when({ success: true }));

    //Messages = jasmine.createSpyObj('Messages', ['addSuccess']);

    //CommittedFundViewCtrl = $controller('CommittedFundViewCtrl', {
      //scope: scope,
      //$state: state,
      //CommittedFund: _CommittedFund_,
      //Messages: Messages
    //});
  //}));

  //it('should attach fund to vm', function () {
    //expect(CommittedFundViewCtrl.fund).toEqual(committedFund);
    //expect(CommittedFund).toHaveBeenCalledWith({ id: state.params.id });
    //expect(committedFund.get).toHaveBeenCalled();
  //});

  //describe('canAcknowledge', function() {
    //it('asks fund if user can acknowledge', function() {
      //expect(CommittedFundViewCtrl.canAcknowledge).toEqual(committedFund.canAcknowledge);
    //});
  //});

  //describe('acknowledgeFund', function() {
    //it('delegates to committed fund', function() {
      //CommittedFundViewCtrl.acknowledgeFund();

      //scope.$digest();

      //expect(committedFund.acknowledgeFund).toHaveBeenCalled();
      //expect(Messages.addSuccess).toHaveBeenCalledWith('Committed fund acknowledged.');
      //expect(state.go).toHaveBeenCalledWith('project.overview', { id: committedFund.project_id });
    //});
  //});
//});
