'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var project = Generators.project.newProject();
var projectMember = Generators.projectMember.new({ project_id: project.id });

var projectMemberPermissions = {
  can_update_role_description: false,
  can_request_card_for_user: false
};

var page = requireHelper.page('new_card_number')(project.id, projectMember.user.id);
var specHelper = requireHelper.specHelper(page);

describe('new card number', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/permissions')(project.id),
      requireHelper.request('project/members')([]),
      requireHelper.request('project/member')(projectMember, projectMemberPermissions),
      requireHelper.request('project/notifications')(project.id),
      requireHelper.request('project/member/add_card_number')(project.id, projectMember.user.id)
    ]);

    specHelper.simulateNormalUser();
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('creates card number', function() {
    expect(page.h4Title.getText()).toEqual(`Members / ${projectMember.user.full_name} / Add Card Number`);

    page.cardNumber.sendKeys('1234567890123456');
    page.submitButton.click();

    expect(page.toastMessage.getText()).toEqual('Card number added.');
    expect(page.h4Title.getText()).toEqual(`Members / ${projectMember.user.full_name}`);
  });
});
