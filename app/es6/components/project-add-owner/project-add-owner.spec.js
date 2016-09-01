'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var project = Generators.project.newProject();

var page = requireHelper.page('add_project_owner')(project.id);
var specHelper = requireHelper.specHelper(page);

describe('adding owner to project', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/permissions')(project.id),
      requireHelper.request('project/members')(project.id),
      requireHelper.request('project/add_owner')(project.id)
    ]);

    specHelper.simulateFunderUser();
    specHelper.getOnce();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('highlights members tab in sections tab', function() {
    expect(page.activeSectionsTab.getText()).toEqual('Members');
    expect(page.h4Title.getText()).toEqual('Members / Change Owner')
  });

  it('can invite user by first, last, email', function() {
    page.firstName.sendKeys('User First');
    page.lastName.sendKeys('User Last');
    page.email.sendKeys('user@example.com')

    page.submitButton.click();

    expect(page.toastMessage.getText()).toEqual('Project owner changed.')
  });
});
