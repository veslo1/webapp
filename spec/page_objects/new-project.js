var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/projects/new',

  funderOfficeOptions: element.all(by.css('select[name="funder_office"] option')),
  funderOffice: element(by.css('select[name="funder_office"]')),
  name: element(by.model('$ctrl.project.name')),
  address1: element(by.model('$ctrl.project.address_1')),
  address2: element(by.model('$ctrl.project.address_2')),
  city: element(by.model('$ctrl.project.city')),
  state: element(by.model('$ctrl.project.state')),
  postalCode: element(by.model('$ctrl.project.postal_code')),
  claimNumber: element(by.model('$ctrl.project.claim_number')),
  description: element(by.model('$ctrl.project.description')),
  comments: element(by.model('$ctrl.project.comments')),
  material_funds: element(by.model('$ctrl.project.material_funds')),
  labor_funds: element(by.model('$ctrl.project.labor_funds')),
  overhead_funds: element(by.model('$ctrl.project.overhead_funds')),
  profit_funds: element(by.model('$ctrl.project.profit_funds')),

  uniqueErrorMessage: element(by.css('.error span[ng-message=unique]')),
  invalidErrorMessage: element(by.css('.error span[ng-message=serverError]')),
}, base);
