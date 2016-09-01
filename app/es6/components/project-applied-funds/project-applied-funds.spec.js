'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var project = Generators.project.newProject();

var page = requireHelper.page('project_applied_funds')(project.id);
var specHelper = requireHelper.specHelper(page);

var newAmounts = {
  material: 12.50,
  labor: 22.50,
  overhead: 32.50,
  profit: 42.50,
};

var projectPermissionsRequest = requireHelper.request('project/permissions')(project.id);
var permissions = projectPermissionsRequest.response.permissions;

describe('view project funds', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/get_applied_funds')(project.id),
      requireHelper.request('project/update_applied_funds')(project.id),
      projectPermissionsRequest,
    ]);
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('project applied funds', function() {
    describe('user does not have permission to see funds section', function() {
      beforeEach(function() {
        permissions.can_apply_project_funds = false;
        permissions.can_view_project_applied_funds = false;
        specHelper.get();
      });

      it('does not show project applied funds section', function() {
        expect(page.appliedFundsTitle.isPresent()).toBe(false);
      });
    });

    describe('project state is NOT active and user only has permission to view applied funds', function() {
      beforeEach(function() {
        permissions.can_apply_project_funds = false;
        permissions.can_view_project_applied_funds = true;
        specHelper.get();
      });

      it('shows read only values', function() {
        expect(page.projectFundsContainer.getText()).toEqual('Labor\n$223,123.45\nOverhead\n$323,123.45\nProfit\n$423,123.45\nMaterial\n$123,123.45');
      });
    });

    describe('project state is NOT active and user has permission to apply Funds', function() {
      beforeEach(function() {
        permissions.can_apply_project_funds = true;
      });

      describe('project has started', function() {
        beforeEach(function() {
          project.status = 'started';
          specHelper.get();
        });

        it('shows read only values', function() {
          expect(page.projectFundsContainer.getText()).toEqual('Labor\n$223,123.45\nOverhead\n$323,123.45\nProfit\n$423,123.45\nMaterial\n$123,123.45');
        });
      });

      describe('project has not started', function() {
        beforeEach(function() {
          project.status = 'not_started';
          specHelper.get();
        });

        it('highlights funds tab in sections tab', function() {
          expect(page.activeSectionsTab.getText()).toEqual('Overview');
          expect(page.appliedFundsTitle.getText()).toEqual('Applied Project Funds');
          expect(page.materialFundsInput.getAttribute('value')).toEqual('$ 123,123.45')
          expect(page.laborFundsInput.getAttribute('value')).toEqual('$ 223,123.45')
          expect(page.overheadFundsInput.getAttribute('value')).toEqual('$ 323,123.45')
          expect(page.profitFundsInput.getAttribute('value')).toEqual('$ 423,123.45')
        });

        it('allows me to edit project applied funds', function() {
          page.materialFundsInput.clear();
          page.materialFundsInput.sendKeys(newAmounts.material);
          page.laborFundsInput.clear();
          page.laborFundsInput.sendKeys(newAmounts.labor);
          page.overheadFundsInput.clear();
          page.overheadFundsInput.sendKeys(newAmounts.overhead);
          page.profitFundsInput.clear();
          page.profitFundsInput.sendKeys(newAmounts.profit);

          page.applyProjectFundsButton.click();

          expect(page.toastMessage.getText()).toEqual('Project applied funds updated.')
        });

        describe('values entered are invalid', function() {
          it('shows server-side validation error', function() {
            page.materialFundsInput.clear();
            page.materialFundsInput.sendKeys('non numeric value'); // invalid because it is required and the alpha chars are ignored
            page.laborFundsInput.clear();
            page.laborFundsInput.sendKeys(''); // invalid because it is required
            page.overheadFundsInput.clear();
            page.overheadFundsInput.sendKeys(-34); // negative value but the - gets ignored so the value ends up being $0.34
            page.profitFundsInput.clear();
            page.profitFundsInput.sendKeys(45.45); // valid value

            expect(page.applyProjectFundsButton.getAttribute('disabled')).toEqual('true');
            expect(page.requiredErrorMessages.count()).toEqual(2);
          });
        });
      });
    });
  });
});
