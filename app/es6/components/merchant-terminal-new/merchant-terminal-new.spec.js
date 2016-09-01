'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var merchant = Generators.merchant.newMerchant();
var merchantLocation = Generators.merchantLocation.new({merchant_id: merchant.id});

var page = requireHelper.page('merchant_terminal_new')(merchant.id, merchantLocation.id);
var specHelper = requireHelper.specHelper(page);

var certContent = `-----BEGIN CERTIFICATE-----
MIIDRDCCAiwCCQDqfVc2v55dUTANBgkqhkiG9w0BAQUFADBgMQswCQYDVQQGEwJV
UzERMA8GA1UECBMITWlzc291cmkxEjAQBgNVBAcTCVN0LiBMb3VpczEYMBYGA1UE
8fRPPxRtI1Loz93bhW2xKY/+JEB5IuvohWznr8r0P/4gbk/rkDul2x8ahwPTTH/O
1lq3w6g6VCkWHIPkcF6s4Rsp08uhKYfy
-----END CERTIFICATE-----
`

describe('new merchant terminal', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('merchant')(merchant),
      requireHelper.request('merchant_location')(merchantLocation),
      requireHelper.request('merchant_terminal_create')(merchantLocation.id),
    ]);
    specHelper.simulateNormalUser();
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('can create merchant terminal', function() {
    expect(page.h2Title.getText()).toEqual('New Merchant Terminal');

    page.serialNumber.sendKeys('serialnumber001203');
    page.terminalIdentifier.sendKeys(certContent);

    page.submitButton.click();

    expect(page.toastMessage.getText()).toEqual('Merchant Terminal created.');
    expect(page.h2Title.getText()).toEqual('Merchant Location Details');
  });
});
