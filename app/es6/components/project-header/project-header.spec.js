'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.helper('generators');
var project = Generators.project.newProject();

var page = requireHelper.page('project')(project.id);
var specHelper = requireHelper.specHelper(page);

var projectPermissionsRequest = requireHelper.request('project/permissions')(project.id);
var projectPermissions = projectPermissionsRequest.response.permissions;

describe('view project header', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      projectPermissionsRequest,
      requireHelper.request('project/material_funds_overview')(project.id),
      requireHelper.request('project/material_commitments')(project.id),
      requireHelper.request('project_card_transactions')(project.id),
      requireHelper.request('project/card_loads')(project.id),

      requireHelper.request('project/labor_funds_overview')(project.id),
      requireHelper.request('project/labor_commitments')(project.id),
      requireHelper.request('project/payouts')(project.id),
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    describe('displayed content', function() {
      beforeEach(function() {
        projectPermissions.can_view_material_funds = false;
        projectPermissions.can_view_labor_funds = false;
        specHelper.getOnce();
      });

      it('has correct title', function() {
        expect(page.h2Title.getText()).toEqual(project.name);
      });

      it('has correct navbar item', function() {
        expect(page.activeNavbarItem.getText()).toEqual('Projects');
      });

      it('has correct tab selected', function() {
        expect(page.activeSectionsTab.getText()).toEqual('Overview');
      });

      it('does not show materials tab', function() {
        expect(page.tabs.materialsLink.isPresent()).toEqual(false);
      });

      it('does not show labor tab', function() {
        expect(page.tabs.laborLink.isPresent()).toEqual(false);
      });
    });

    describe('user can view material and labor funds', function() {
      beforeEach(function() {
        projectPermissions.can_view_material_funds = true;
        projectPermissions.can_view_labor_funds = true;
        specHelper.get();
      });

      it('can click materials tab link', function() {
        page.tabs.materialsLink.click();
        expect(page.h4Title.getText()).toContain('Material Commitments');
        expect(page.activeSectionsTab.getText()).toEqual('Materials');
      });

      it('can click labor tab link', function() {
        page.tabs.laborLink.click();
        expect(page.h4Title.getText()).toContain('Labor Commitments');
        expect(page.activeSectionsTab.getText()).toEqual('Labor');
      });
    });
  });
});
