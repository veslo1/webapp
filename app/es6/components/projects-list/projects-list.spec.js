'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var SpecHelper = requireHelper.requireSpecHelper();
var page = requireHelper.page('projects-list');
var ProjectGenerator = requireHelper.helper('project_generator');

var emptyProjectsRequest = requireHelper.request('projects')();
var myFunderOrganizationOfficesRequest = requireHelper.request('my_funder_organization_offices')();

var project1 = ProjectGenerator.newProject();
var project2 = ProjectGenerator.newProject();
var projects = [ project1, project2 ];

var projectsRequest = requireHelper.request('projects')(projects);

describe('projects page', function() {
  var specHelper;

  beforeEach(function() {
    specHelper = new SpecHelper(page);
    specHelper.setSystemPermissions({ can_create_projects: false });
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    beforeEach(function() {
      specHelper.stubRequest(emptyProjectsRequest);
      specHelper.get();
    });

    it('has correct title', function() {
      expect(page.h2Title.getText()).toEqual('Projects');
      expect(page.activeNavbarItem.getText()).toEqual('Projects');
      expect(element(by.css('.no-entries')).getText()).toEqual('No projects');
      expect(page.newProjectButton.isPresent()).toBe(false);
    });
  });

  describe('I am a funder', function() {
    beforeEach(function() {
      specHelper.stubRequests([emptyProjectsRequest, myFunderOrganizationOfficesRequest]);
      specHelper.setSystemPermissions({ can_create_projects: true });
      specHelper.get();
    });

    it('can navigate to new project page', function() {
      page.newProjectButton.click();
      expect(page.h2Title.getText()).toEqual('New Project');
    });
  });

  describe('there are projects', function() {
    var elProject1, elProject2;

    beforeEach(function() {
      specHelper.stubRequest(projectsRequest);

      elProject1 = page.projectByIndex(0);
      elProject2 = page.projectByIndex(1);
    });

    it('lists projects', function() {
      specHelper.get();

      expect(page.projectsList.count()).toEqual(2);

      expect(page.officeHeaders.get(0).getText()).toEqual(`${project1.funder_organization_name} - ${project1.funder_organization_office_name}`);

      expect(elProject1.name.getText()).toEqual(project1.name);
      expect(elProject1.claimNumber.getText()).toEqual(project1.claim_number);
      expect(elProject1.location.getText()).toEqual(project1.city + ', ' + project1.state);

      expect(page.officeHeaders.get(1).getText()).toContain(project2.funder_organization_office_name);

      expect(elProject2.name.getText()).toEqual(project2.name);
      expect(elProject2.claimNumber.getText()).toEqual(project2.claim_number);
      expect(elProject2.location.getText()).toEqual(project2.city + ', ' + project2.state);
    });

    it('displays no projects div', function() {
      specHelper.get();

      expect(element(by.css('.no-entries')).getText()).toEqual('');
    });

    describe('clicking a project', function() {
      beforeEach(function() {
        specHelper.stubRequests([
          requireHelper.request('project')(project1),
          requireHelper.request('project/permissions')(project1.id),
          requireHelper.request('project/notifications')(project1.id),
          requireHelper.request('project/financial_overview')(project1.id),
        ]);

        specHelper.get();
      });

      it('can visit project page', function() {
        var project1El = page.projectsList.get(0);

        var project1Link = project1El.element(by.css('.project-name a'));

        project1Link.click();

        expect(page.h2Title.getText()).toEqual(project1.name);
      });
    });
  });

  describe('not logged in', function() {
    var notLoggedInRequest = {
      method: 'GET',
      url: 'http://localhost:3000/projects',
      response: function(method, url, data, headers) {
        return [401, { errors: [ 'Invalid Auth Token' ] }, {}];
      }
    };

    beforeEach(function() {
      specHelper.stubRequest(notLoggedInRequest);
      specHelper.get();
    });

    it('redirects to login page', function() {
      expect(page.h2Title.getText()).toEqual('Log In');
    });
  });
});
