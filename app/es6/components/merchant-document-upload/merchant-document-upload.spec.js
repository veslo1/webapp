'use strict';

var path = require('path');

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var merchant = Generators.merchant.newMerchant();

var page = requireHelper.page('merchant-document-upload')(merchant.id);
var specHelper = requireHelper.specHelper(page);

describe('uploading document', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('merchants/documents')(merchant.id),
      requireHelper.request('merchant')(merchant),
      requireHelper.request('merchant_locations')(merchant.id),
      requireHelper.request('merchants/ach_account')(merchant.id)
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
      expect(page.h2Title.getText()).toEqual('Upload Document');
    });

    it('uploads document correctly', function() {
      var fileToUpload = '../../../../spec/support/files/buildpay-current.png';
      var absolutePath = path.resolve(__dirname, fileToUpload);
      // if test runner errors - process.cwd() instead of __dirname

      page.fileUpload.sendKeys(absolutePath);

      page.submitButton.click();

      expect(page.toastMessage.getText()).toEqual('Document uploaded.');
      expect(page.h2Title.getText()).toEqual('Merchant Details');
    });
  });
});
