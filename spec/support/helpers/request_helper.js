'use strict';

var requireHelper = require('../require_helper');

class RequestHelper {
  requestsForProject(project) {
    return [
      requireHelper.request('project')(project),
      requireHelper.request('project/permissions')(project.id),
      requireHelper.request('project/notifications')(project.id),
      requireHelper.request('project/financial_overview')(project.id)
    ]
  }
}

module.exports = new RequestHelper();
