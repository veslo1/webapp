'use strict';

import angular from 'angular';
import 'angular-animate';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-local-storage';
import 'angular-ui-router';
import 'angular-inform';
import 'angular-foundation';
import 'angular-input-masks';
import uiMask from 'angular-ui-mask';
import 'angular-mocks';
import 'ng-file-upload';

/**
 * @ngdoc overview
 * @name buildpayApp
 * @description
 * # buildpayApp
 *
 * Main module of the application.
 */
angular
  .module('buildpayApp', [
    'ngAnimate',
    //'ngCookies',
    'ngMessages',
    //'ngResource',
    'ui.router',
    'ngSanitize',
    'inform',
    'LocalStorageModule',
    'mm.foundation',
    'ui.utils.masks',
    uiMask,
    'ngFileUpload'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider, informProvider, $compileProvider, configuration) {
    "ngInject";

    $stateProvider
      .state('main', {
        abstract: true,
        url: '',
        views: {
          "": {
            template: '<ui-view/>'
          },
          "header": {
            controller: function($state) { this.$state = $state; },
            controllerAs: '$ctrl',
            template: "<h2>{{ $ctrl.$state.current.data.pageTitle }}</h2>" }
        }
      })
      .state('projects', {
        url: "/projects",
        parent: 'main',
        views: {
          "": {
            template: '<projects-list></projects-list>'
          },
          "header@": {
            controller: function(currentUser) { this.currentUser = currentUser; },
            controllerAs: '$ctrl',
            template: `
            <h2 class="left">Projects</h2>
            <a id="new-project-button" ui-sref="projectsNew" ng-if="$ctrl.currentUser.permissions.canCreateProjects()" class="button topbar-button small info uppercase right">New Project</a>
            `
          }
        }
      })
      .state('projectsNew', {
        url: "/projects/new",
        parent: 'main',
        template: '<project-new></project-new>',
        data: {
          pageTitle: 'New Project'
        }
      })
      .state('project', {
        abstract: true,
        url: "/projects/:id",
        views: {
          "": {
            template: '<ui-view/>'
          },
          "header": {
            controller: function(project) { this.project = project; },
            controllerAs: '$ctrl',
            templateUrl: "es6/components/project-header/project-header.html"
          }
        },
        resolve: {
          project: function($stateParams, Project) {
            var project = new Project({ id: $stateParams.id });
            project.get();
            project.getPermissions();
            return project;
          }
        }
      })
      .state('project.overview', {
        abstract: true,
        url: "/overview",
        template: '<ui-view/>'
      })
      .state('project.overview.index', {
        url: "/index",
        views: {
          "": {
            controller: function(project) { this.project = project; },
            controllerAs: '$ctrl',
            template: '<project-overview project="$ctrl.project"></project-overview>'
          }
        }
      })
      .state('project.overview.addBankAccount', {
        url: "/add_bank_account",
        controller: function(project) { this.project = project; },
        controllerAs: '$ctrl',
        template: '<project-add-bank-account project="$ctrl.project"></project-add-owner>'
      })
      .state('project.members', {
        abstract: true,
        url: "/members",
        template: '<ui-view/>'
      })
      .state('project.members.index', {
        url: "/index",
        controller: function(project) { this.project = project; },
        controllerAs: '$ctrl',
        template: '<project-members-list project="$ctrl.project"></project-members-list>'
      })
      .state('project.members.member', {
        abstract: true,
        url: "/:memberId",
        template: '<ui-view></ui-view>',
        resolve: {
          member: function($stateParams, ProjectMember) {
            var member = new ProjectMember({ project_id: $stateParams.id, id: $stateParams.memberId });
            member.get();
            return member;
          }
        }
      })
      .state('project.members.member.view', {
        url: "/overview",
        controller: function(member) { this.member = member; },
        controllerAs: '$ctrl',
        template: '<project-member-view member="$ctrl.member"></project-member-view>'
      })
      .state('project.members.member.addCardNumber', {
        url: "/card_number/new",
        controller: function(member) { this.member = member; },
        controllerAs: '$ctrl',
        template: '<new-project-member-card member="$ctrl.member"></new-project-member-card>'
      })
      .state('project.members.member.addBankAccount', {
        url: "/add_bank_account",
        controller: function(member) { this.member = member; },
        controllerAs: '$ctrl',
        template: '<project-member-add-bank-account member="$ctrl.member"></project-member-add-bank-account>'
      })
      .state('project.members.addFunder', {
        url: "/add_funder",
        controller: function(project) { this.project = project; },
        controllerAs: '$ctrl',
        template: '<project-add-funder project="$ctrl.project"></project-add-funder>'
      })
      .state('project.members.addOwner', {
        url: "/add_owner",
        controller: function(project) { this.project = project; },
        controllerAs: '$ctrl',
        template: '<project-add-owner project="$ctrl.project"></project-add-owner>'
      })
      .state('project.members.addServiceProvider', {
        url: "/add_service_provider",
        controller: function(project) { this.project = project; },
        controllerAs: '$ctrl',
        template: '<project-add-service-provider project="$ctrl.project"></project-add-service-provider>'
      })
      .state('project.materials', {
        abstract: true,
        url: "/materials",
        template: '<ui-view/>'
      })
      .state('project.materials.overview', {
        url: "/overview",
        controller: function(project) { this.project = project; },
        controllerAs: '$ctrl',
        template: '<project-materials-tab project="$ctrl.project"></project-materials-tab>'
      })
      .state('project.materials.card_transaction_details', {
        url: "/card_transactions/:transactionId",
        controller: function(project) { this.project = project; },
        controllerAs: '$ctrl',
        template: '<project-card-transaction-detail project="$ctrl.project"></project-card-transaction-detail>'
      })
      .state('project.labor', {
        abstract: true,
        url: "/labor",
        template: '<ui-view/>'
      })
      .state('project.labor.overview', {
        url: "/overview",
        controller: function(project) { this.project = project; },
        controllerAs: '$ctrl',
        template: '<project-labor-tab project="$ctrl.project"></project-labor-tab>'
      })
      .state('project.edit', {
        url: "/edit",
        controller: function(project) { this.project = project; },
        controllerAs: '$ctrl',
        template: '<project-edit input-project="$ctrl.project"></project-edit>'
      })
      .state('committedFund', {
        url: "/committed_funds/:id",
        parent: 'main',
        template: '<committed-fund-view></committed-fund-view>',
        data: {
          pageTitle: 'Committed Fund'
        }
      })
      .state('payout', {
        url: "/payouts/:id",
        parent: 'main',
        template: '<payout-view></payout-view>',
        data: {
          pageTitle: 'Payout'
        }
      })
      .state('cardLoad', {
        url: "/card_loads/:id",
        parent: 'main',
        template: '<card-load-view></card-load-view>',
        data: {
          pageTitle: 'Card Load'
        }
      })
      .state('directory', {
        abstract: true,
        parent: 'main',
        url: "/directory",
        template: '<ui-view/>',
        data: {
          pageTitle: 'Directory'
        }
      })
      .state('directory.inviteUser', {
        url: "/invites/new",
        template: '<new-invite></new-invite>',
        data: {
          pageTitle: 'Invite User'
        }
      })
      .state('directory.users', {
        url: "/users",
        views: {
          "": {
            template: '<users-list></users-list>'
          },
          "header@": {
            template: `
            <h2 class="left">Directory</h2>
            <a ui-sref="directory.inviteUser" class="button small info topbar-button uppercase right new-invite-button">Invite User</a>
            `
          }
        }
      })
      .state('directory.user', {
        url: "/users/:id",
        views: {
          "": {
            controller: function(user) { this.user = user; },
            controllerAs: '$ctrl',
            template: '<user-view user=$ctrl.user></user-view>'
          },
          "header@": {
            controller: function(user) { this.user = user; },
            controllerAs: '$ctrl',
            template: "<h2>{{ $ctrl.user.first_name }} {{ $ctrl.user.last_name }}</h2>"
          }
        },
        resolve: {
          user: function(CurrentDirectoryUser, $stateParams) {
            CurrentDirectoryUser.load($stateParams.id);
            return CurrentDirectoryUser.instance();
          }
        }
      })
      .state('myProfile', {
        url: "/my_profile",
        parent: 'main',
        template: '<my-profile></my-profile>',
        data: {
          pageTitle: 'My Profile'
        }
      })
      .state('myBankAccounts', {
        url: "/bank_accounts",
        parent: 'main',
        template: '<ui-view/>'
      })
      .state('myBankAccounts.overview', {
        url: "/overview",
        template: '<my-bank-accounts></my-bank-accounts>',
        data: {
          pageTitle: 'My Bank Accounts'
        }
      })
      .state('myBankAccounts.new', {
        url: "/new",
        template: '<new-user-bank-account></new-user-bank-account>',
        data: {
          pageTitle: 'New Bank Account'
        }
      })
      .state('myBankAccounts.verify', {
        url: "/:id/verify",
        template: '<user-bank-account-verify></user-bank-account-verify>',
        data: {
          pageTitle: 'Verify Bank Account'
        }
      })
      .state('signup', {
        url: "/signup?invite_id",
        parent: 'main',
        controller: function($stateParams) { this.inviteId = $stateParams.invite_id; },
        controllerAs: '$ctrl',
        template: '<new-user invite-id="$ctrl.inviteId"></new-user>',
        data: {
          pageTitle: 'Sign Up'
        }
      })
      .state('forgot_password', {
        url: "/forgot_password",
        parent: 'main',
        template: '<forgot-password></forgot-password>',
        data: {
          pageTitle: 'Forgot Password'
        }
      })
      .state('reset_password', {
        url: "/reset_password?hash_id",
        parent: 'main',
        template: '<reset-password></reset-password>',
        data: {
          pageTitle: 'Reset Password'
        }
      })
      .state('funder_organizations', {
        url: "/funders",
        parent: 'main',
        views: {
          "": {
            template: '<funder-organizations-list></funder-organizations-list>'
          },
          "header@": {
            template: `
            <h2 class="left">Funders</h2>
            <a ui-sref="funder_organizations_new" class="button info topbar-button small uppercase new-funder-org-button right">Add Funder</a>
            `
          }
        }
      })
      .state('funder_organizations_new', {
        url: "/funders/new",
        parent: 'main',
        template: '<funder-organization-new></funder-organization-new>',
        data: {
          pageTitle: 'New Funder'
        }
      })
      .state('funderOrg', {
        url: "/funders/:id",
        parent: 'main',
        abstract: true,
        views: {
          "": {
            template: '<ui-view/>'
          },
          "header@": {
            controller: function(funderOrganization) { this.funderOrganization = funderOrganization; },
            controllerAs: '$ctrl',

            templateUrl: "es6/components/funder-organization-header/funder-organization-header.html"
          }
        },
        resolve: {
          funderOrganization: function($stateParams, CurrentFunderOrganization) {
            CurrentFunderOrganization.load($stateParams.id);
            return CurrentFunderOrganization.instance();
          }
        }
      })
      .state('funderOrg.overview', {
        abstract: true,
        url: "/overview",
        views: {
          "": {
            template: '<ui-view/>'
          }
        }
      })
      .state('funderOrg.overview.index', {
        url: "/index",
        controller: function(funderOrganization) { this.funderOrganization = funderOrganization; },
        controllerAs: '$ctrl',
        template: '<funder-organization-overview funder-organization="$ctrl.funderOrganization"></funder-organization-overview>'
      })
      .state('funderOrg.overview.edit', {
        url: "/edit",
        controller: function(funderOrganization) { this.funderOrganization = funderOrganization; },
        controllerAs: '$ctrl',
        template: '<funder-organization-edit funder-organization="$ctrl.funderOrganization"></funder-organization-edit>'
      })
      .state('funderOrg.offices', {
        abstract: true,
        url: "/offices",
        views: {
          "": {
            template: '<ui-view/>'
          }
        }
      })
      .state('funderOrg.offices.index', {
        url: "/index",
        controller: function(funderOrganization) { this.funderOrganization = funderOrganization; },
        controllerAs: '$ctrl',
        template: '<funder-organization-offices-list funder-organization="$ctrl.funderOrganization"></funder-organization-offices-list>'
      })
      .state('funderOrg.offices.new', {
        url: "/new",
        controller: function(funderOrganization) { this.funderOrganization = funderOrganization; },
        controllerAs: '$ctrl',
        template: '<funder-organization-office-new funder-organization="$ctrl.funderOrganization"></funder-organization-office-new>'
      })
      .state('funderOrg.offices.office', {
        url: "/:officeId",
        abstract: true,
        template: '<ui-view/>',
        resolve: {
          funderOffice: function($stateParams, FunderOrganizationOffices) {
            return FunderOrganizationOffices.get($stateParams.officeId);
          }
        }
      })
      .state('funderOrg.offices.office.overview', {
        url: "/overview",
        controller: function(funderOffice) { this.funderOffice = funderOffice; },
        controllerAs: '$ctrl',
        template: '<funder-organization-office-view funder-office="$ctrl.funderOffice"></funder-organization-office-view>'
      })
      .state('funderOrg.offices.office.edit', {
        url: "/edit",
        controller: function(funderOffice) { this.funderOffice = funderOffice; },
        controllerAs: '$ctrl',
        template: '<funder-organization-office-edit funder-office="$ctrl.funderOffice"></funder-organization-office-edit>'
      })
      .state('funderOrg.offices.office.addMember', {
        url: "/members/new",
        controller: function(funderOffice) { this.funderOffice = funderOffice; },
        controllerAs: '$ctrl',
        template: '<funder-organization-office-member-new funder-office="$ctrl.funderOffice"></funder-organization-office-member-new>'
      })
      .state('funderOrg.offices.office.editMember', {
        url: "/members/:memberId",
        controller: function(funderOffice) { this.funderOffice = funderOffice; },
        controllerAs: '$ctrl',
        template: '<funder-organization-office-member-edit funder-office="$ctrl.funderOffice"></funder-organization-office-member-edit>'
      })
      .state('funderOrg.offices.office.addResponsibleIndividual', {
        url: "/responsible_individual/new",
        controller: function(funderOffice) { this.funderOffice = funderOffice; },
        controllerAs: '$ctrl',
        template: '<funder-organization-office-ach-account-new funder-office="$ctrl.funderOffice"></funder-organization-office-ach-account-new>'
      })
      .state('funderOrg.offices.office.documentUpload', {
        url: "/documents/new",
        controller: function(funderOffice) { this.funderOffice = funderOffice; },
        controllerAs: '$ctrl',
        template: '<funder-organization-office-document-upload funder-office="$ctrl.funderOffice"></funder-organization-office-document-upload>'
      })
      .state('funderOrg.offices.office.bankAccounts', {
        url: "/bank_accounts",
        abstract: true,
        template: '<ui-view/>'
      })
      .state('funderOrg.offices.office.bankAccounts.new', {
        url: "/new",
        controller: function(funderOffice) { this.funderOffice = funderOffice; },
        controllerAs: '$ctrl',
        template: '<funder-organization-office-bank-account-new funder-office="$ctrl.funderOffice"></funder-organization-office-bank-account-new>'
      })
      .state('funderOrg.offices.office.bankAccounts.verify', {
        url: "/:bankAccountId/verify",
        controller: function(funderOffice) { this.funderOffice = funderOffice; },
        controllerAs: '$ctrl',
        template: '<funder-organization-office-bank-account-verify funder-office="$ctrl.funderOffice"></funder-organization-bank-account-verify>'
      })
      .state('merchants', {
        url: "/merchants",
        parent: 'main',
        views: {
          "": {
            template: '<merchants-list></merchants-list>'
          },
          "header@": {
            controller: function(currentUser) { this.currentUser = currentUser; },
            controllerAs: '$ctrl',
            template: `
            <h2 class="left">Merchants</h2>
            <a ui-sref="merchants_new" class="button small topbar-button info uppercase new-merchant-button right" ng-if="$ctrl.currentUser.permissions.canManageMerchants()">Add Merchant</a>
            `
          }
        }
      })
      .state('merchants_new', {
        url: "/merchants/new",
        parent: 'main',
        template: '<merchant-new></merchant-new>',
        data: {
          pageTitle: 'New Merchant'
        }
      })
      .state('merchant', {
        url: "/merchants/:id",
        parent: 'main',
        abstract: true,
        template: '<ui-view></ui-view>',
        controller: function(CurrentMerchant, $stateParams) {
          CurrentMerchant.load($stateParams.id);
        }
      })
      .state('merchant.view', {
        url: "/view",
        template: '<merchant-view></merchant-view>',
        data: {
          pageTitle: 'Merchant Details'
        }
      })
      .state('merchant.edit', {
        url: "/edit",
        template: '<merchant-edit></merchant-edit>',
        data: {
          pageTitle: 'Edit Merchant'
        }
      })
      .state('merchant.locations_new', {
        url: "/locations/new",
        template: '<merchant-location-new></merchant-location-new>',
        data: {
          pageTitle: 'New Merchant Location'
        }
      })
      .state('merchant.location', {
        abstract: true,
        url: "/locations/:locationId",
        template: '<ui-view/>'
      })
      .state('merchant.location.view', {
        url: "/view",
        template: '<merchant-location-view></merchant-location-view>',
        data: {
          pageTitle: 'Merchant Location Details'
        }
      })
      .state('merchant.location.edit', {
        url: "/edit",
        template: '<merchant-location-edit></merchant-location-edit>',
        data: {
          pageTitle: 'Edit Merchant Location'
        }
      })
      .state('merchant.location.terminals_new', {
        url: '/terminals/new',
        template: '<merchant-terminal-new></merchant-terminal-new>',
        data: {
          pageTitle: 'New Merchant Terminal'
        }
      })
      .state('merchant.bankAccounts', {
        url: "/bank_accounts",
        abstract: true,
        template: '<ui-view/>'
      })
      .state('merchant.bankAccounts.new', {
        url: "/new",
        template: '<merchant-bank-account-new></merchant-bank-account-new>',
        data: {
          pageTitle: 'New Merchant Bank Account'
        }
      })
      .state('merchant.bankAccounts.verify', {
        url: "/:bankAccountId/verify",
        template: '<merchant-bank-account-verify></merchant-bank-account-verify>',
        data: {
          pageTitle: 'Bank Accounts'
        }
      })
      .state('merchant.documentUpload', {
        url: "/documents/new",
        template: '<merchant-document-upload></merchant-document-upload>',
        data: {
          pageTitle: 'Upload Document'
        }
      })
      .state('transactions', {
        url: "/transactions?page",
        parent: 'main',
        template: '<transactions-list></transactions-list>',
        data: {
          pageTitle: 'Transactions'
        }
      })
      .state('transaction', {
        url: "/transactions/:id",
        parent: 'main',
        template: '<transaction-view></transaction-view>',
        data: {
          pageTitle: 'Transaction Details'
        }
      })
      .state('termsOfService', {
        url: "/terms-of-service",
        parent: 'main',
        templateUrl: 'terms_of_service.html',
        data: {
          pageTitle: 'Terms of Service'
        }
      })
      .state('login', {
        url: "/login",
        parent: 'main',
        template: '<login></login>',
        data: {
          pageTitle: 'Log In'
        }
      });
    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get("$state");
      $state.go("projects");
    });

    $httpProvider.interceptors.push('TokenInterceptor');

    informProvider.defaults({ ttl: 3000 });

    $compileProvider.debugInfoEnabled(configuration.nodeEnv === 'development');
  });
