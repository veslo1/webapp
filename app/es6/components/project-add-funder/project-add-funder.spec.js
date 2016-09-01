'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var project = Generators.project.newProject();

var page = requireHelper.page('add_project_funder')(project.id);
var specHelper = requireHelper.specHelper(page);

var user1 = Generators.user.newUser();
var user2 = Generators.user.newUser();

describe('adding funder to project', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/permissions')(project.id),
      requireHelper.request('project/members')(project.id),
      requireHelper.request('project/potential_funders')(project.id, [ user1, user2 ]),
      requireHelper.request('project/add_funder')(project.id),
    ]);

    specHelper.simulateAdminUser();
    specHelper.getOnce();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('highlights members tab in sections tab', function() {
    expect(page.activeSectionsTab.getText()).toEqual('Members');
  });

  it('shows potential funders', function() {
    var funderRow1 = page.potentialFunderByIndex(0);

    expect(funderRow1.fullName.getText()).toEqual(user1.full_name);
    expect(funderRow1.email.getText()).toEqual(user1.email);

    var funderRow2 = page.potentialFunderByIndex(1);

    expect(funderRow2.fullName.getText()).toEqual(user2.full_name);
    expect(funderRow2.email.getText()).toEqual(user2.email);
  });

  it('can add funder to project', function() {
    var funderRow = page.potentialFunderByIndex(0);
    funderRow.addButton.click();
    expect(page.toastMessage.getText()).toEqual('Project funder changed.')
  });
});
