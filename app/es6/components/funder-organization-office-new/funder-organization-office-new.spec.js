'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var funderOrg = Generators.funderOrganization.new();

var user1 = Generators.user.newUser();
var user2 = Generators.user.newUser();

var page = requireHelper.page('funder_organization_office_new')(funderOrg.id);
var specHelper = requireHelper.specHelper(page);

describe('new funder organization', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization')(funderOrg),
      requireHelper.request('funder_organizations/office_create')(funderOrg.id),
      requireHelper.request('funder_organizations/offices')(funderOrg.id, [])
    ]);
    specHelper.simulateNormalUser();
    specHelper.setSystemPermissions({ can_manage_funders: true });
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('can create new funder organization office', function() {
    expect(page.h2Title.getText()).toEqual(funderOrg.name);
    expect(page.h4Title.getText()).toEqual('Offices / New Office');

    page.name.sendKeys('Safeco Insurance');
    page.dba.sendKeys('Safeco');
    page.address.street1.sendKeys('Street 1');
    page.address.street2.sendKeys('Street 2');
    page.address.city.sendKeys('St. Louis');
    page.address.state.sendKeys('MO');
    page.address.postalCode.sendKeys('63110');
    page.website.sendKeys('http://safeco.com');
    page.officePhone.sendKeys('123-456-8876');
    page.fax.sendKeys('321-164-8876');
    page.ein.sendKeys('34-1643366');
    page.companyTypeOption('LLC').click();

    page.submitButton.click();

    expect(page.h2Title.getText()).toEqual(funderOrg.name);
    expect(page.h4Title.getText()).toEqual('Offices');
    expect(page.toastMessage.getText()).toEqual('Funder office created.');
  });
});
