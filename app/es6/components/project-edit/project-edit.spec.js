'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var project = Generators.project.newProject();
var project2 = Generators.project.newProject();

var page = requireHelper.page('project-edit')(project.id);
var specHelper = requireHelper.specHelper(page);

var updateProjectRequest = requireHelper.request('project/update')(project);

describe('updating existing project', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      requireHelper.request('project/permissions')(project.id),
      requireHelper.request('project/notifications')(project.id),
      requireHelper.request('project/financial_overview')(project.id),
      updateProjectRequest
    ]);

    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    beforeEach(function() {
      specHelper.get();
    });

    it('has correct title', function() {
      expect(page.h4Title.getText()).toEqual('Edit Project');
    });
  });

  describe('valid form values', function() {
    it('updates project when submitting form', function() {
      specHelper.get();

      expect(page.name.getAttribute('value')).toEqual(project.name);
      expect(page.claimNumber.getAttribute('value')).toEqual(project.claim_number);
      expect(page.address1.getAttribute('value')).toEqual(project.address_1);
      expect(page.address2.getAttribute('value')).toEqual(project.address_2);
      expect(page.city.getAttribute('value')).toEqual(project.city);
      expect(page.state.getAttribute('value')).toEqual(project.state);
      expect(page.postalCode.getAttribute('value')).toEqual(project.postal_code);
      expect(page.description.getAttribute('value')).toEqual(project.description);
      expect(page.comments.getAttribute('value')).toEqual(project.comments);

      // workaround for firefox
      page.clearFieldAndThenTypeText(page.name, project2.name);

      page.address1.sendKeys(project2.address_1);
      page.address2.sendKeys(project2.address_2);
      page.city.sendKeys(project2.city);
      page.state.sendKeys(project2.state);
      page.postalCode.sendKeys(project2.postal_code);
      page.claimNumber.sendKeys(project2.claim_number);
      page.description.sendKeys(project2.description);
      page.comments.sendKeys(project2.comments);

      page.submitButton.click();

      expect(page.toastMessage.getText()).toEqual('Project updated.');
    });
  });

  describe('only changing project description', function() {
    it('updates project when submitting form', function() {
      specHelper.get();

      page.description.clear().sendKeys(project2.description);
      page.submitButton.click();

      expect(page.toastMessage.getText()).toEqual('Project updated.');
    });
  });

  // need to add new endpoint if checking claim number for existing project
  //describe('duplicate claim number value', function() {
    //it('shows server-side validation error', function() {
      //specHelper.get();

      //page.claimNumber.clear().sendKeys('existingclaim  number');

      //// Safari requires this
      //page.name.sendKeys(project.name);
      //// Firefox requires this
      //page.claimNumber.sendKeys(protractor.Key.TAB);

      //expect(page.uniqueErrorMessage.getText()).toEqual('This field value has already been taken!');
    //});
  //});

  describe('invalid postal code', function() {
    beforeEach(function() {
      updateProjectRequest.response = function() {
        return [422, { errors: { postal_code: ["is invalid"] } }, {}];
      };
    });

    it('shows server-side validation error', function() {
      specHelper.get();

      page.postalCode.clear().sendKeys('invalid postal code');
      page.submitButton.click();

      expect(page.h2Title.getText()).toEqual(project.name);
      expect(page.invalidErrorMessage.getText()).toEqual('is invalid');
    });
  })
});
