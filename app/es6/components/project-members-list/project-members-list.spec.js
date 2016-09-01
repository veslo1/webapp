'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();
var UserGenerator = Generators.user;

var project = Generators.project.newProject();

var page = requireHelper.page('project_members')(project.id);
var specHelper = requireHelper.specHelper(page);

var funder = UserGenerator.newUser();
var owner = UserGenerator.newUser();

var user1 = UserGenerator.newUser();
var user2 = UserGenerator.newUser();

var serviceProvider1 = UserGenerator.newServiceProvider();
var serviceProvider2 = UserGenerator.newServiceProvider();
var serviceProvider3 = UserGenerator.newServiceProvider();
var serviceProvider4 = UserGenerator.newServiceProvider();
var serviceProvider5 = UserGenerator.newServiceProvider();
var serviceProvider6 = UserGenerator.newServiceProvider();
var serviceProvider7 = UserGenerator.newServiceProvider();
var serviceProvider8 = UserGenerator.newServiceProvider();
var serviceProvider9 = UserGenerator.newServiceProvider();
var serviceProvider10 = UserGenerator.newServiceProvider();

serviceProvider1.children = [
  serviceProvider2
];

serviceProvider2.children = [
  serviceProvider3,
  serviceProvider7
];

serviceProvider3.children = [
  serviceProvider4,
  serviceProvider5
];

serviceProvider5.children = [
  serviceProvider6
];

serviceProvider6.children = [
  serviceProvider9
];

var serviceProviders = [
  serviceProvider1,
  serviceProvider8,
  serviceProvider10
];

var projectMembers = {
  funder: funder,
  owner: owner,
  service_providers: serviceProviders
};

var projectMembersRequest = requireHelper.request('project/members')(project.id, projectMembers);
var projectPermissionsRequest = requireHelper.request('project/permissions')(project.id);
var permissionsResponse = projectPermissionsRequest.response.permissions;

describe('view project members', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(project),
      projectMembersRequest,
      requireHelper.request('project/potential_funders')(project.id, [ user1, user2 ]),
      projectPermissionsRequest
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('project has funder', function() {
    beforeEach(function() {
      specHelper.getOnce();
    });

    it('has correct title', function() {
      expect(page.h2Title.getText()).toEqual(project.name);
    });

    it('highlights projects link in navbar', function() {
      expect(page.activeNavbarItem.getText()).toEqual('Projects');
    });

    it('highlights members tab in sections tab', function() {
      expect(page.activeSectionsTab.getText()).toEqual('Members');
    });

    it('shows funder info', function() {
      var funderRow = page.funder();

      expect(funderRow.fullName.getText()).toEqual(funder.full_name);
      expect(funderRow.email.getText()).toEqual(funder.email);
    });
  });

  describe('funder is null', function() {
    beforeEach(function() {
      projectMembersRequest.response.members.funder = null;
      specHelper.get();
    });

    it('shows no funder', function() {
      expect(page.funderInfo.getText()).toEqual('No Funder');
    });
  });

  describe('current user is normal user', function() {
    beforeEach(function() {
      specHelper.simulateNormalUser();
      specHelper.getOnce();
    });

    it('cannot change owner', function() {
      expect(page.addOwnerButton.isPresent()).toBe(false);
    });

    it('cannot change funder', function() {
      expect(page.addFunderButton.isPresent()).toBe(false);
    });
  });

  describe('current user is admin', function() {
    beforeEach(function() {
      permissionsResponse.can_change_project_funder = true;
      specHelper.simulateAdminUser();
    });

    it('can change funder but not owner', function() {
      specHelper.get();

      expect(page.addOwnerButton.isPresent()).toBe(false);
      expect(page.addFunderButton.isPresent()).toBe(true);

      page.addFunderButton.click();

      expect(page.h4Title.getText()).toEqual('Change Funder');
    });

    describe('project has started', function() {
      beforeEach(function() {
        project.status = 'started';
      });

      it('does not show change funder button', function() {
        specHelper.get();
        expect(page.addFunderButton.isDisplayed()).toBe(false);
      });
    });
  });

  describe('current user is funder', function() {
    beforeEach(function() {
      permissionsResponse.can_change_project_funder = false;
      specHelper.simulateFunderUser();
    });

    describe('change funder/owner buttons', function() {
      beforeEach(function() {
        specHelper.getOnce();
      });

      describe('user is not project funder', function() {
        it('cannot change owner', function() {
          expect(page.addOwnerButton.isPresent()).toBe(false);
        });
      });

      it('cannot change funder', function() {
        expect(page.addFunderButton.isPresent()).toBe(false);
      });
    });

    describe('user is project funder', function() {
      beforeEach(function() {
        project.status = 'not_started';
        projectMembersRequest.response.members.funder = funder;
        projectMembersRequest.response.members.funder.id = 'funderId';

        permissionsResponse.can_change_project_owner = true;
        specHelper.simulateFunderUser();
      });

      it('can change owner', function() {
        specHelper.get();

        expect(page.addOwnerButton.isPresent()).toBe(true);

        page.addOwnerButton.click();
        expect(page.h4Title.getText()).toEqual('Members / Change Owner');
      });

      describe('project has started', function() {
        beforeEach(function() {
          project.status = 'started';
        });

        it('does not show change owner button', function() {
          specHelper.get();
          expect(page.addOwnerButton.isDisplayed()).toBe(false);
        });
      });
    });
  });

  describe('project has owner', function() {
    beforeEach(function() {
      specHelper.get();
    });

    it('shows owner details', function() {
      var ownerRow = page.owner();

      expect(ownerRow.fullName.getText()).toEqual(owner.full_name);
      expect(ownerRow.email.getText()).toEqual(owner.email);
    });
  });

  describe('owner is null', function() {
    beforeEach(function() {
      projectMembersRequest.response.members.owner = null;
      specHelper.get();
    });

    it('shows no owner', function() {
      expect(page.ownerInfo.getText()).toEqual('No Owner');
    });
  });

  describe('project has service providers', function() {
    it('shows service providers', function() {
      specHelper.get();

      var serviceProviderEl1 = page.serviceProviders.get(1);
      var serviceProviderEl2 = page.serviceProviders.get(2);
      var serviceProviderEl3 = page.serviceProviders.get(3);
      var serviceProviderEl4 = page.serviceProviders.get(4);
      var serviceProviderEl5 = page.serviceProviders.get(5);
      var serviceProviderEl6 = page.serviceProviders.get(6);
      var serviceProviderEl7 = page.serviceProviders.get(7);
      var serviceProviderEl8 = page.serviceProviders.get(8);
      var serviceProviderEl9 = page.serviceProviders.get(9);
      var serviceProviderEl10 = page.serviceProviders.get(10);

      expect(serviceProviderEl1.getText()).toContain(serviceProvider1.user.full_name);
      expect(serviceProviderEl1.getText()).toContain(serviceProvider1.user.email);

      expect(serviceProviderEl2.getText()).toContain(serviceProvider2.user.full_name);
      expect(serviceProviderEl2.getText()).toContain(serviceProvider2.user.email);

      expect(serviceProviderEl3.getText()).toContain(serviceProvider3.user.full_name);
      expect(serviceProviderEl3.getText()).toContain(serviceProvider3.user.email);

      expect(serviceProviderEl4.getText()).toContain(serviceProvider4.user.full_name);
      expect(serviceProviderEl4.getText()).toContain(serviceProvider4.user.email);

      expect(serviceProviderEl5.getText()).toContain(serviceProvider5.user.full_name);
      expect(serviceProviderEl5.getText()).toContain(serviceProvider5.user.email);

      expect(serviceProviderEl6.getText()).toContain(serviceProvider6.user.full_name);
      expect(serviceProviderEl6.getText()).toContain(serviceProvider6.user.email);

      expect(serviceProviderEl7.getText()).toContain(serviceProvider9.user.full_name);
      expect(serviceProviderEl7.getText()).toContain(serviceProvider9.user.email);

      expect(serviceProviderEl8.getText()).toContain(serviceProvider7.user.full_name);
      expect(serviceProviderEl8.getText()).toContain(serviceProvider7.user.email);

      expect(serviceProviderEl9.getText()).toContain(serviceProvider8.user.full_name);
      expect(serviceProviderEl9.getText()).toContain(serviceProvider8.user.email);

      expect(serviceProviderEl10.getText()).toContain(serviceProvider10.user.full_name);
      expect(serviceProviderEl10.getText()).toContain(serviceProvider10.user.email);
    });

    describe('clicking a service provider', function() {
      beforeEach(function() {
        serviceProvider1.project_id = project.id;

        var projectMember = {
          project_id: project.id,
          user: serviceProvider1.user
        };

        specHelper.stubRequests([
          requireHelper.request('project/member')(projectMember)
        ]);

        specHelper.get();
      });

      it('goes to project member page', function() {
        var serviceProviderEl1 = page.serviceProviders.get(1);

        var nameLink = serviceProviderEl1.element(by.css('.user-full-name a'));

        nameLink.click();

        expect(page.h2Title.getText()).toEqual(project.name);
        expect(page.h4Title.getText()).toEqual('Members / ' + serviceProvider1.user.full_name);
      });
    });
  });

  describe('there are no service providers', function() {
    beforeEach(function() {
      projectMembersRequest.response.members.service_providers = [];
      specHelper.get();
    });

    it('shows no owner', function() {
      expect(element(by.css('.no-entries')).getText()).toContain('No service providers');
    });
  });

  describe('user can add service providers', function() {
    beforeEach(function() {
      permissionsResponse.can_add_service_providers = true;

      specHelper.get();
    });

    it('shows add service provider button', function() {
      expect(page.addServiceProviderButton.isPresent()).toBe(true);
      page.addServiceProviderButton.click();
      expect(page.h4Title.getText()).toEqual('Members / Add Service Provider');
    });
  });

  describe('user cannot add service providers', function() {
    beforeEach(function() {
      permissionsResponse.can_add_service_providers = false;
      specHelper.get();
    });

    it('does not show add service provider button', function() {
      expect(page.addServiceProviderButton.isPresent()).toBe(false);
    });
  });
});
