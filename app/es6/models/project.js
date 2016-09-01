'use strict';

import ProjectPermissions from './../models/project_permissions';

export default function(Projects) {
  "ngInject";

  var Project = function(data) {
    var self = this;

    self.setProperties(data);

    self.permissions = new ProjectPermissions();

    self.getPermissions = function() {
      Projects.getProjectPermissions(self.id).then((response) => {
        self.permissions = new ProjectPermissions(response.data.permissions);
      });
    };

    self.get = function() {
      Projects.getProject(self.id).then(function(response) {
        self.setProperties(response.data.project);
      });
    };

    self.canStartProject = function() {
      return self.can_start_project === true;
    };

    self.canCommitFunds = function() {
      return self.permissions.can_commit_project_funds === true && self.hasStarted();
    };

    self.hasStarted = function() {
      return self.status === 'started';
    };

    self.canStartErrors = function() {
      return self.prevalidationErrorsForKey('can_start_project');
    };

    self.prevalidationErrorsForKey = function(key) {
      if (self.prevalidation_errors && self.prevalidation_errors[key]) {
        return self.prevalidation_errors[key];
      } else {
        return [];
      }
    };
  };

  Project.prototype.setProperties = function(data) {
    for (var attr in data) {
      if (data.hasOwnProperty(attr)) {
        this[attr] = data[attr];
      }
    }
  };

  Project.prototype.statusText = function() {
    if (this.hasStarted()) {
      return 'Started';
    } else if (!this.hasStarted()) {
      return 'Not Started';
    } else {
      return this.status;
    }
  };

  Project.prototype.bankAccountNameText = function() {
    if (this.bank_account_name === 'not_set') {
      return 'Not Set';
    } else {
      return this.bank_account_name;
    }
  };

  return Project;
}
