'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var project = Generators.project.newProject();

var projectMember = Generators.projectMember.new({ project_id: project.id });

var projectMemberPermissions = {
  can_update_role_description: false,
  can_request_card_for_user: false
};

var page = requireHelper.page('project-member-view')(project.id, projectMember.user.id);
var specHelper = requireHelper.specHelper(page);

describe('view user', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/permissions')(project.id),
      requireHelper.request('project/member')(projectMember, projectMemberPermissions),
      requireHelper.request('project/member/request_card')(project.id, projectMember.user.id),
    ]);

    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('has correct title', function() {
    specHelper.get();

    expect(page.h2Title.getText()).toEqual(project.name);
    expect(page.activeNavbarItem.getText()).toEqual('Projects');

    expect(page.h4Title.getText()).toEqual(`Members / ${projectMember.user.full_name}`);
  });

  describe('current user CAN update member role description', function() {
    beforeEach(function() {
      projectMemberPermissions.can_update_role_description = true;
      specHelper.get();
    });

    it('shows user and allows editing', function() {
      expect(page.roleDescriptionSpan.isPresent()).toBe(false);
      expect(page.roleDescriptionInput.isPresent()).toBe(true);
      expect(page.applyRoleDescriptionButton.isPresent()).toBe(true);
      expect(page.roleDescriptionInput.getAttribute('value')).toEqual(projectMember.role_description);

      expect(page.email.getText()).toEqual(projectMember.user.email);

      expect(page.registeredAt.getText()).toMatch(page.dateFormatRegex);
      page.registeredAt.getText().then(function(dateString) {
        var actual = page.dateToUTCString(dateString);
        var expected = page.dateToUTCString(projectMember.user.registered_at);
        expect(actual).toEqual(expected);
      });

      expect(page.createdAt.getText()).toMatch(page.dateFormatRegex);
      page.createdAt.getText().then(function(dateString) {
        var actual = page.dateToUTCString(dateString);
        var expected = page.dateToUTCString(projectMember.user.created_at);
        expect(actual).toEqual(expected);
      });
      expect(page.status.getText()).toEqual(projectMember.user.status);
    });
  });

  describe('current user CAN NOT update member role description', function() {
    beforeEach(function() {
      projectMemberPermissions.can_update_role_description = false;
      specHelper.get();
    });

    it('shows user and does not allow editing', function() {
      expect(page.roleDescriptionSpan.getText()).toEqual(projectMember.role_description);
      expect(page.roleDescriptionInput.isPresent()).toBe(false);
      expect(page.applyRoleDescriptionButton.isPresent()).toBe(false);

      expect(page.email.getText()).toEqual(projectMember.user.email);

      expect(page.registeredAt.getText()).toMatch(page.dateFormatRegex);
      page.registeredAt.getText().then(function(dateString) {
        var actual = page.dateToUTCString(dateString);
        var expected = page.dateToUTCString(projectMember.user.registered_at);
        expect(actual).toEqual(expected);
      });

      expect(page.createdAt.getText()).toMatch(page.dateFormatRegex);
      page.createdAt.getText().then(function(dateString) {
        var actual = page.dateToUTCString(dateString);
        var expected = page.dateToUTCString(projectMember.user.created_at);
        expect(actual).toEqual(expected);
      });
      expect(page.status.getText()).toEqual(projectMember.user.status);
    });
  });

  describe('current user CAN view bank account status', function() {
    beforeEach(function() {
      projectMemberPermissions.can_view_bank_account_status = true;
    });

    describe('current user CAN update bank account', function() {
      beforeEach(function() {
        projectMemberPermissions.can_update_bank_account = true;
        specHelper.stubRequest(
          requireHelper.request('bank_accounts/index')()
        );
        specHelper.getOnce();
      });

      it('shows account name and allows changing', function() {
        expect(page.bankAccountNameSpan.getText()).toEqual(projectMember.bank_account_name);
        expect(page.changeBankAccountButton.isPresent()).toBe(true);
      });

      it('can click change bank account button', function() {
        page.changeBankAccountButton.click();
        expect(browser.getCurrentUrl()).toContain(`projects/${project.id}/members/${projectMember.id}/add_bank_account`);
        expect(page.h4Title.getText()).toContain('Change Bank Account');
      });
    });

    describe('current user CAN NOT update bank account', function() {
      describe('account is set', function() {
        beforeEach(function() {
          projectMemberPermissions.can_update_bank_account = false;
          projectMember.bank_account_status = 'Account Set';
          specHelper.get();
        });

        it('shows account name and allows changing', function() {
          expect(page.bankAccountNameSpan.getText()).toEqual('Account Set');
          expect(page.changeBankAccountButton.isPresent()).toBe(false);
        });
      });

      describe('account is NOT set yet', function() {
        beforeEach(function() {
          projectMemberPermissions.can_update_bank_account = false;
          projectMember.bank_account_status = 'Not Set';
          projectMember.bank_account_name = null;
          specHelper.get();
        });

        it('shows account name and allows changing', function() {
          expect(page.bankAccountNameSpan.getText()).toEqual('Not Set');
          expect(page.changeBankAccountButton.isPresent()).toBe(false);
        });
      });
    });
  });

  describe('current user CAN NOT view bank account status', function() {
    beforeEach(function() {
      projectMemberPermissions.can_view_bank_account_status = false;
      projectMemberPermissions.can_update_bank_account = false;
      specHelper.get();
    });

    it('does not display ACH account section', function() {
      expect(page.bankAccountNameSpan.isPresent()).toBe(false);
    });
  });

  describe('user can not view card info', function() {
    beforeEach(function() {
      projectMemberPermissions.can_view_card_info = false;
      projectMember.card_requested = false;
    });

    it('does not show card status', function() {
      specHelper.get();
      expect(page.cardRequestedText.isPresent()).toEqual(false);
      expect(page.cardIssuedText.isPresent()).toEqual(false);
      expect(page.requestCardButton.isPresent()).toEqual(false);
    });
  });

  describe('user can view card info', function() {
    beforeEach(function() {
      projectMemberPermissions.can_view_card_info = true;
    });

    describe('user already has card requested', function() {
      beforeEach(function() {
        projectMemberPermissions.can_request_card_for_user = false;
        projectMember.card_requested = true;
        projectMember.card_requested_at = '2015-12-01T19:59:44.427Z';
      });

      it('shows date card was requested', function() {
        specHelper.get();

        expect(page.cardRequestedText.getText()).toMatch(page.dateFormatRegex);
        expect(page.requestCardButton.isPresent()).toEqual(false);
      });

      describe('user has card issued', function() {
        beforeEach(function() {
          projectMember.card_issued = true;
          projectMember.card_issued_at = '2015-12-01T19:59:44.427Z';
        });

        it('shows date card was issued', function() {
          specHelper.get();
          expect(page.cardIssuedText.getText()).toMatch(page.dateFormatRegex);
        });

        describe('can add card number', function() {
          beforeEach(function() {
            projectMemberPermissions.can_have_card_number = true;
            projectMember.can_have_card_number = true;
          });

          it('can click add card number button', function() {
            specHelper.get();
            page.addCardNumberButton.click();
            expect(page.h4Title.getText()).toContain('Add Card Number');
          });

          describe('validation failed', function() {
            beforeEach(function() {
              projectMember.can_have_card_number = false;
            });

            it('can click add card number button', function() {
              specHelper.get();
              expect(page.addCardNumberButton.isDisplayed()).toEqual(false);
            });
          });
        });

        describe('cannot add card number', function() {
          beforeEach(function() {
            projectMemberPermissions.can_have_card_number = false;
            projectMember.can_have_card_number = false;
          });

          it('can click add card number button', function() {
            specHelper.get();
            expect(page.addCardNumberButton.isPresent()).toEqual(false);
          });
        });
      });

      describe('user does not have issued card', function() {
        beforeEach(function() {
          projectMember.card_issued = false;
        });

        it('shows card has already been requested', function() {
          specHelper.get();
          expect(page.cardIssuedText.getText()).toEqual('No');
        });
      });
    });

    describe('user can request a card', function() {
      beforeEach(function() {
        projectMember.card_requested = false;
        projectMember.card_requested_at = null;
        projectMemberPermissions.can_request_card_for_user = true;
      });

      it('shows request card button', function() {
        specHelper.get();

        expect(page.cardRequestedText.getText()).toEqual('No');
        expect(page.requestCardButton.isPresent()).toEqual(true);
      });

      describe('request card', function() {
        it('requests card', function() {
          specHelper.get();

          // assert this or a timestamp
          //expect(page.cardRequestedStatus.getText()).toEqual('No');

          page.requestCardButton.click();

          expect(page.toastMessage.getText()).toEqual('Card requested.');
          //expect(page.cardRequestedStatus.getText()).toEqual('Yes');
        });
      });

      describe('can_have_card is false', function() {
        beforeEach(function() {
          projectMember.can_have_card = false;
          projectMember.prevalidation_errors.can_have_card = [ 'User must supply a home address before requesting card']
        });

        it('disables button and shows message why user cannot have card', function() {
          specHelper.get();
          expect(page.cardRequestedText.getText()).toEqual(projectMember.prevalidation_errors.can_have_card[0]);
        });
      });
    });
  });
});
