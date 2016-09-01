'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var funderOrg = Generators.funderOrganization.new();

var member1 = Generators.user.newUser();
var member2 = Generators.user.newUser();

var funderOffice = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id, primary_contact_user_id: member1.id });

var page = requireHelper.page('funder-organization-office-edit')(funderOrg.id, funderOffice.id);
var specHelper = requireHelper.specHelper(page);

var achAccount = Generators.achAccount.new({id: 123});

var updateRequest = requireHelper.request('funder_organization_offices/update')(funderOffice.id);

describe('edit funder organization office', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization')(funderOrg),
      requireHelper.request('funder_organization_offices/potential_primary_contacts')(funderOffice.id, [member1, member2]),
      updateRequest,
      requireHelper.request('funder_organization_offices/show')(funderOffice),
      requireHelper.request('funder_organization_offices/members')(funderOffice.id, [member1, member2]),
      requireHelper.request('funder_organization_offices/bank_accounts/index')(funderOffice.id),
      requireHelper.request('funder_organization_offices/ach_account/show')(funderOffice.id, achAccount)
    ]);

    specHelper.simulateNormalUser();
    specHelper.setSystemPermissions({ can_manage_funders: true });
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('shows current office details in form', function() {
    specHelper.get();

    expect(page.h2Title.getText()).toEqual(funderOrg.name);
    expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Edit`);

    expect(page.name.getAttribute('value')).toEqual(funderOffice.name);
    expect(page.dba.getAttribute('value')).toEqual(funderOffice.dba);
    expect(page.address.street1.getAttribute('value')).toEqual(funderOffice.address.street1);
    expect(page.address.street2.getAttribute('value')).toEqual(funderOffice.address.street2);
    expect(page.address.city.getAttribute('value')).toEqual(funderOffice.address.city);
    expect(page.address.state.getAttribute('value')).toEqual(funderOffice.address.state);
    expect(page.address.postalCode.getAttribute('value')).toEqual(funderOffice.address.postal_code);
    expect(page.website.getAttribute('value')).toEqual(funderOffice.website);
    expect(page.officePhone.getAttribute('value')).toEqual(funderOffice.phone_numbers.primary);
    expect(page.fax.getAttribute('value')).toEqual(funderOffice.phone_numbers.fax);
    expect(page.ein.getAttribute('value')).toEqual(funderOffice.ein);
    expect(page.primaryContactDropdown.getAttribute('value')).toEqual('' + member1.id);
  });

  describe('successful edit', function() {
    it('can edit funder organization office', function() {
      specHelper.get();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Edit`);

      page.name.clear().sendKeys('Safeco Insurance');
      page.dba.clear().sendKeys('Safeco');
      page.address.street1.clear().sendKeys('Street 1');
      page.address.street2.clear().sendKeys('Street 2');
      page.address.city.clear().sendKeys('St. Louis');
      page.address.state.sendKeys('MO');
      page.address.postalCode.clear().sendKeys('63110');
      page.website.clear().sendKeys('http://safeco.com');
      page.officePhone.clear().sendKeys('123-456-8876');
      page.fax.clear().sendKeys('321-164-8876');
      page.ein.clear().sendKeys('34-1643366');
      page.companyTypeOption('LLC').click();
      page.primaryContactOption(member2.full_name).click();

      page.submitButton.click();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      //expect(page.detailsHeader.getText()).toContain(`Offices / Safeco Insurance`);
      expect(page.toastMessage.getText()).toEqual('Funder office updated.');
    });
  });

  describe('validation error', function() {
    beforeEach(function() {
      updateRequest.response = function() {
        return [422, { errors: { name: ["has already been taken"] } }, {}];
      };
    })

    it('shows valiation error upon edit', function() {
      specHelper.get();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Edit`);

      page.submitButton.click();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Edit`);

      expect(page.submitButton.isEnabled()).toEqual(false);
      expect(page.fieldErrorsFor('name').getText()).toEqual('has already been taken');
    })
  });
});
