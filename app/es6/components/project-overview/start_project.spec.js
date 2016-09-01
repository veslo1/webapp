'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.helper('generators');

var canStartProjectErrors = [
  'Project must have an owner',
  'Project must have an active bank account'
];

var prevalidationErrors = {
  can_start_project: canStartProjectErrors
};

var project = Generators.project.newProject({ status: 'not_started', prevalidation_errors: prevalidationErrors });

var page = requireHelper.page('project')(project.id);
var specHelper = requireHelper.specHelper(page);

var projectPermissionsRequest = requireHelper.request('project/permissions')(project.id, permissions);
var permissions = projectPermissionsRequest.response.permissions;

describe('starting project', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      projectPermissionsRequest,
      requireHelper.request('project/notifications')(project.id),
      requireHelper.request('project/start_project')(project.id),
      requireHelper.request('project/financial_overview')(project.id),
    ]);
    specHelper.simulateFunderUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('user has permission to start project', function() {
    beforeEach(function() {
      permissions.can_start_project = true;
    });

    describe('project can be started', function() {
      beforeEach(function() {
        project.can_start_project = true;
      });

      it('shows start project button', function() {
        specHelper.get();
        page.startProjectButton.click();
        expect(page.toastMessage.getText()).toEqual('Project started.');
        //expect(page.status.getText()).toEqual('started');
        //expect(page.startProjectButton.isPresent()).toBe(false);
      });

      describe('project has started', function() {
        beforeEach(function() {
          project.status = 'started';
        });

        it('does not show start project button', function() {
          specHelper.get();
          expect(page.startProjectButton.isPresent()).toEqual(false);
        });
      });
    });

    describe('project cannot be started', function() {
      beforeEach(function() {
        project.status = 'not_started';
        project.can_start_project = false;
      });

      it('does not show start project button', function() {
        specHelper.get();

        expect(page.startProjectButton.isDisplayed()).toEqual(false);

        expect(page.projectStartErrors.getText()).toContain(canStartProjectErrors[0]);
        expect(page.projectStartErrors.getText()).toContain(canStartProjectErrors[1]);
      });
    });
  });

  describe('user does not have permission to start project', function() {
    beforeEach(function() {
      permissions.can_start_project = false;
    });

    it('does not show start project button', function() {
      specHelper.get();
      expect(page.startProjectButton.isPresent()).toEqual(false);
    });
  });
});

