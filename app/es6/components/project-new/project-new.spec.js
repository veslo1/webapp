'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();
var page = requireHelper.page('project-new');
var specHelper = requireHelper.specHelper(page);

var funderOrg = Generators.funderOrganization.new();
var office1 = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id });
var office2 = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id });
var office3 = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id, permissions: { can_create_projects: false } });

var myFunderOrganizationOfficesRequest = requireHelper.request('my_funder_organization_offices')([office1, office2, office3]);
var projectsRequest = requireHelper.request('projects')();

var project = {
  name: 'Window replacement #89',
  address_1: '42 Wampler Drive',
  address_2: '',
  city: 'Arnold',
  state: 'MO',
  postal_code: '63010',
  claim_number: 'claim000888',
  description: 'Windows need replaced after October 15th storm.',
  comments: 'general comments here',
  material_funds: 1250050,
  labor_funds: 775645,
  overhead_funds: 43400,
  profit_funds: 92000
};

var newProjectRequest = {
  method: 'POST',
  url: `http://localhost:3000/funder_organization_offices/${office1.id}/projects`,
  data: {
    data: project
  },
  response: function(method, url, data, headers) {
    var jsonData = JSON.parse(data);
    if (jsonData.data.postal_code === 'invalid postal code') {
      return [422, { errors: { postal_code: ["is invalid"] } }, {}];
    } else {
      return [201, {}, {}];
    }
  }
};

describe('submitting a new project', function() {
  beforeEach(function() {
    specHelper.stubRequests([ newProjectRequest, projectsRequest, myFunderOrganizationOfficesRequest ]);
    specHelper.simulateFunderUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    beforeEach(function() {
      specHelper.get();
    });

    it('has correct title', function() {
      expect(page.h2Title.getText()).toEqual('New Project');
      expect(page.activeNavbarItem.getText()).toEqual('Projects');
    });
  });

  describe('valid form values', function() {
    it('creates a new project when submitting form', function() {
      specHelper.get();

      expect(page.funderOfficeOptions.count()).toEqual(3);
      page.funderOffice.sendKeys(office1.name);
      page.name.sendKeys(project.name);
      page.claimNumber.sendKeys(project.claim_number);
      page.address1.sendKeys(project.address_1);
      page.address2.sendKeys(project.address_2);
      page.city.sendKeys(project.city);
      page.state.sendKeys(project.state);
      page.postalCode.sendKeys(project.postal_code);
      page.material_funds.sendKeys(project.material_funds);
      page.labor_funds.sendKeys(project.labor_funds);
      page.overhead_funds.sendKeys(project.overhead_funds);
      page.profit_funds.sendKeys(project.profit_funds);
      page.description.sendKeys(project.description);
      page.comments.sendKeys(project.comments);

      page.submitButton.click();

      expect(page.h2Title.getText()).toEqual('Projects');
      expect(page.toastMessage.getText()).toEqual('Project saved.');
    });
  });

  // Need an endpoint that accepts both funder office and claim number for this to work
  //describe('duplicate claim number value', function() {
    //it('shows server-side validation error', function() {
      //specHelper.get();

      //page.claimNumber.sendKeys('existingclaim  number');

      //// Safari requires this
      //page.name.sendKeys(project.name);
      //// Firefox requires this
      //page.claimNumber.sendKeys(protractor.Key.TAB);

      //expect(page.uniqueErrorMessage.getText()).toEqual('This field value has already been taken!');
    //});
  //});

  describe('invalid postal code', function() {
    it('shows server-side validation error', function() {
      specHelper.get();

      expect(page.funderOfficeOptions.count()).toEqual(3);
      page.funderOffice.sendKeys(office1.name);
      page.name.sendKeys(project.name);
      page.address1.sendKeys(project.address_1);
      page.address2.sendKeys(project.address_2);
      page.city.sendKeys(project.city);
      page.state.sendKeys(project.state);
      page.postalCode.sendKeys('invalid postal code');
      page.claimNumber.sendKeys(project.claim_number);
      page.description.sendKeys(project.description);
      page.comments.sendKeys(project.comments);

      page.submitButton.click();

      expect(page.h2Title.getText()).toEqual('New Project');
      expect(page.invalidErrorMessage.getText()).toEqual('is invalid');
    });
  })
});
