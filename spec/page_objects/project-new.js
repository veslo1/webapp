var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/projects/new',

  funderOfficeOptions: element.all(by.css('select[name="funder_office"] option')),
  funderOffice: element(by.css('select[name="funder_office"]')),
  name: element(by.css('input[name="name"]')),
  address1: element(by.css('input[name="street1"]')),
  address2: element(by.css('input[name="street2"]')),
  city: element(by.css('input[name="city"]')),
  state: element(by.css('select[name="state"]')),
  postalCode: element(by.css('input[name="postal_code"]')),
  claimNumber: element(by.css('input[name="claim_number"]')),
  material_funds: element(by.css('input[name="material_funds"]')),
  labor_funds: element(by.css('input[name="labor_funds"]')),
  overhead_funds: element(by.css('input[name="overhead_funds"]')),
  profit_funds: element(by.css('input[name="profit_funds"]')),
  description: element(by.css('textarea[name="description"]')),
  comments: element(by.css('textarea[name="comments"]')),

  uniqueErrorMessage: element(by.css('.error span[ng-message=unique]')),
  invalidErrorMessage: element(by.css('.error span[ng-message=serverError]')),
}, base);
