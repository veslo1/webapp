'use strict';

var path = require('path');

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var funderOrg = Generators.funderOrganization.new();
var funderOffice = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id });

var page = requireHelper.page('funder-organization-office-document-upload')(funderOrg.id, funderOffice.id);
var specHelper = requireHelper.specHelper(page);

describe('uploading document', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization_offices/documents')(funderOffice.id),
      requireHelper.request('funder_organization')(funderOrg),
      requireHelper.request('funder_organization_offices/show')(funderOffice),
      requireHelper.request('funder_organization_offices/members')(funderOffice.id, []),
      requireHelper.request('funder_organization_offices/bank_accounts/index')(funderOffice.id),
      requireHelper.request('funder_organization_offices/ach_account/show')(funderOffice.id, {})
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    beforeEach(function() {
      specHelper.getOnce();
    });

    it('has correct title', function() {
      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Responsible Individual Document Upload`)
    });

    it('uploads document correctly', function() {
      var fileToUpload = '../../../../spec/support/files/buildpay-current.png';
      var absolutePath = path.resolve(__dirname, fileToUpload);
      // if test runner errors - process.cwd() instead of __dirname

      page.fileUpload.sendKeys(absolutePath);

      page.submitButton.click();

      expect(page.toastMessage.getText()).toEqual('Document uploaded.');
      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name}`)
    });
  });
});
