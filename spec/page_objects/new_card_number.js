'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(projectId, memberId) {
  return _.extend({
    url: '/#/projects/' + projectId + '/members/' + memberId + '/card_number/new',
    cardNumber: element(by.css('input[name="card_number"]')),
  }, base);
};
