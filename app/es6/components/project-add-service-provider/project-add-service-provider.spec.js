'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var project = Generators.project.newProject();

var page = requireHelper.page('add_service_provider')(project.id);
var specHelper = requireHelper.specHelper(page);

var user1 = Generators.user.newUser();

var projectMember = {
  id: user1.id,
  project_id: project.id,
  user: user1
};

describe('adding service provider to project', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/permissions')(project.id),
      requireHelper.request('project/add_service_provider')(project.id, projectMember),
      requireHelper.request('project/member')(projectMember)
    ]);
    specHelper.simulateNormalUser();
    specHelper.getOnce();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('highlights members tab in sections tab', function() {
    expect(page.activeSectionsTab.getText()).toEqual('Members');
  });

  it('can invite service provider by first, last, email', function() {
    page.firstName.sendKeys('User First');
    page.lastName.sendKeys('User Last');
    page.email.sendKeys('user@example.com')

    page.submitButton.click();

    expect(page.toastMessage.getText()).toEqual('Service provider added.')
  });
});
