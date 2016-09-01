'use strict';

var _ = require('lodash');
var base = require('./project');

module.exports = function(projectId) {
  return _.extend({
    url: `/#/projects/${projectId}/overview`,

    appliedFundsTitle: element(by.css('project-applied-funds h4')),
    projectFundsContainer: element(by.css('project-applied-funds .project-funds')),
    materialFundsInput: element(by.model('$ctrl.funds.material_funds')),
    laborFundsInput: element(by.model('$ctrl.funds.labor_funds')),
    overheadFundsInput: element(by.model('$ctrl.funds.overhead_funds')),
    profitFundsInput: element(by.model('$ctrl.funds.profit_funds')),
    applyProjectFundsButton: element(by.css("project-applied-funds [type=submit]")),
    requiredErrorMessages: element.all(by.css('project-applied-funds .error span[ng-message=required]')),
  }, new base(projectId));
};
