'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var project = Generators.project.newProject();

var projectMember = Generators.projectMember.new({ project_id: project.id });

var page = requireHelper.page('project-member-view')(project.id, projectMember.user.id);
var specHelper = requireHelper.specHelper(page);

describe('update member role description', function() {
  var formattedDates;

  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/permissions')(project.id),
      requireHelper.request('project/member')(projectMember, { can_update_role_description: true }),
      requireHelper.request('project/members')(project.id),
      requireHelper.request('project/member/update_role_description')(project.id, projectMember.user.id),
    ]);

    specHelper.simulateNormalUser();
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('updates role description', function() {
    expect(page.h4Title.getText()).toEqual(`Members / ${projectMember.user.full_name}`);

    page.roleDescriptionInput.clear();
    page.roleDescriptionInput.sendKeys('Master Plumber');
    page.applyRoleDescriptionButton.click();

    expect(page.toastMessage.getText()).toEqual('Member role description updated.')
  });
});
