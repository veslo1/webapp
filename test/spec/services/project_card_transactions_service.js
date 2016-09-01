'use strict';

describe('Service: ProjectCardTransactions', function () {
  var httpBackend;

  // load the service's module
  beforeEach(module('buildpayApp'));

  // Necessary to keep ui-router from trying to obtaing the default template (projects/index.html)
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  var projectId = 35;
  var totalUrl = 'http://localhost:3000/projects/35/card_transactions/total';
  var cardTransactionsUrl = 'http://localhost:3000/projects/35/card_transactions';
  var getTotalResponse = { card_transactions: { total: '786.54' } };
  var transaction = { transacted_at: '2015-10-10T12:34:44', merchant: { name: 'merchant name' }, amount: '786.54' };
  var getCardTransactionsResponse = { card_transactions: [ transaction ] };

  // instantiate service
  var ProjectCardTransactions;
  beforeEach(inject(function (_ProjectCardTransactions_, $httpBackend) {
    ProjectCardTransactions = _ProjectCardTransactions_;
    httpBackend = $httpBackend;

    httpBackend.when('GET', totalUrl).respond(getTotalResponse);
    httpBackend.when('GET', cardTransactionsUrl).respond(getCardTransactionsResponse);
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('getTotal', function() {
    it('returns expected response', function () {
      ProjectCardTransactions.getTotal(projectId).then(function(cardTransactionTotal) {
        expect(cardTransactionTotal.total).toEqual(getTotalResponse.card_transactions.total);
      });
      httpBackend.flush();
    });
  });

  describe('getCardTransactions', function() {
    it('returns expected response', function () {
      ProjectCardTransactions.getCardTransactions(projectId).then(function(transactions) {
        expect(transactions.length).toEqual(1);
        expect(transactions[0].transacted_at).toEqual(transaction.transacted_at);
        expect(transactions[0].merchant).toEqual(transaction.merchant);
        expect(transactions[0].amount).toEqual(transaction.amount);
      });
      httpBackend.flush();
    });
  });
});
