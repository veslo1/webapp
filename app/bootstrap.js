import Modernizr from 'modernizr';
import fastClick from 'fastclick';

import angular from 'angular';
import buildpayModule from './es6/app.module';

// components
import BpApp from './es6/components/bp-app/bp-app';
import BpNavBar from './es6/components/bp-navbar/bp-navbar';
import BpFooter from './es6/components/bp-footer/bp-footer';
import bpAddUserList from './es6/components/bp_add_user_list';
import bpAddUserHeaderRow from './es6/components/bp_add_user_header_row';
import bpAddUserRow from './es6/components/bp_add_user_row';
import bpBankAccountHeaderRow from './es6/components/bp_bank_account_header_row';
import bpBankAccountRow from './es6/components/bp_bank_account_row';
import bpNoEntriesRow from './es6/components/bp_no_entries_row';
import bpBreadcrumbs from './es6/components/bp_breadcrumbs';
import bpBreadcrumb from './es6/components/bp_breadcrumb';
import bpBaseErrors from './es6/components/bp_base_errors';
import ProjectOverviewFundsTotals from './es6/components/project-overview-funds-totals/project-overview-funds-totals';
import Login from './es6/components/login/login';
import FunderOrganizationsList from './es6/components/funder-organizations-list/funder-organizations-list';
import FunderOrganizationNew from './es6/components/funder-organization-new/funder-organization-new';
import FunderOrganizationOverview from './es6/components/funder-organization-overview/funder-organization-overview';
import FunderOrganizationEdit from './es6/components/funder-organization-edit/funder-organization-edit';
import FunderOrganizationOfficesList from './es6/components/funder-organization-offices-list/funder-organization-offices-list';
import FunderOrganizationOfficeNew from './es6/components/funder-organization-office-new/funder-organization-office-new';
import FunderOrganizationOfficeForm from './es6/components/funder-organization-office-form/funder-organization-office-form';
import FunderOrganizationOfficeView from './es6/components/funder-organization-office-view/funder-organization-office-view';
import FunderOrganizationOfficeEdit from './es6/components/funder-organization-office-edit/funder-organization-office-edit';
import FunderOrganizationOfficeMemberNew from './es6/components/funder-organization-office-member-new/funder-organization-office-member-new';
import FunderOrganizationOfficeMemberEdit from './es6/components/funder-organization-office-member-edit/funder-organization-office-member-edit';
import FunderOrganizationOfficeAchAccountNew from './es6/components/funder-organization-office-ach-account-new/funder-organization-office-ach-account-new';
import FunderOrganizationOfficeMember from './es6/components/funder-organization-office-member/funder-organization-office-member';
import FunderOrganizationOfficeMembersTree from './es6/components/funder-organization-office-members-tree/funder-organization-office-members-tree';
import MerchantsList from './es6/components/merchants-list/merchants-list';
import MerchantNew from './es6/components/merchant-new/merchant-new';
import MerchantEdit from './es6/components/merchant-edit/merchant-edit';
import MerchantView from './es6/components/merchant-view/merchant-view';
import MerchantLocationNew from './es6/components/merchant-location-new/merchant-location-new';
import MerchantLocationView from './es6/components/merchant-location-view/merchant-location-view';
import MerchantLocationEdit from './es6/components/merchant-location-edit/merchant-location-edit';
import MerchantLocationForm from './es6/components/merchant-location-form/merchant-location-form';
import MerchantTerminalNew from './es6/components/merchant-terminal-new/merchant-terminal-new';
import MerchantBankAccountList from './es6/components/merchant-bank-account-list/merchant-bank-account-list';
import MerchantBankAccountNew from './es6/components/merchant-bank-account-new/merchant-bank-account-new';
import MerchantBankAccountVerify from './es6/components/merchant-bank-account-verify/merchant-bank-account-verify';
import TerminalList from './es6/components/terminal-list/terminal-list';
import CityStatePostal from './es6/components/city_state_postal';
import ChangeBankAccountList from './es6/components/change-bank-account-list';
import TransactionsList from './es6/components/transactions-list/transactions-list';
import TransactionView from './es6/components/transaction-view/transaction-view';
import FieldErrors from './es6/components/field_errors';
import ProjectNotificationsList from './es6/components/project-notifications-list/project-notifications-list';
import ResetPassword from './es6/components/reset-password/reset-password';
import ForgotPassword from './es6/components/forgot-password/forgot-password';
import UsersList from './es6/components/users-list/users-list';
import UserView from './es6/components/user-view/user-view';
import NewInvite from './es6/components/new-invite/new-invite';
import NewUser from './es6/components/new-user/new-user';
import ProjectAddBankAccount from './es6/components/project-add-bank-account/project-add-bank-account';
import ProjectAddFunder from './es6/components/project-add-funder/project-add-funder';
import ProjectAddOwner from './es6/components/project-add-owner/project-add-owner';
import ProjectAddServiceProvider from './es6/components/project-add-service-provider/project-add-service-provider';
import BpLeftColumn from './es6/components/bp_left_column';
import BpRightColumn from './es6/components/bp_right_column';
import BpSubmitRow from './es6/components/bp_submit_row';
import BpTextInputWithErrors from './es6/components/bp_text_input_with_errors';
import BpEmailInputWithErrors from './es6/components/bp-email-input-with-errors';
import BpPhoneInputWithErrors from './es6/components/bp-phone-input-with-errors';
import BpEinInputWithErrors from './es6/components/bp-ein-input-with-errors';
import BpTwoColumnRow from './es6/components/bp-two-column-row';
import BpTwoColumnNewPasswordInput from './es6/components/bp-two-column-new-password-input/bp-two-column-new-password-input';
import BpTwoColumnDatePickerInput from './es6/components/bp-two-column-date-picker-input/bp-two-column-date-picker-input';
import BpTwoColumnSsnInput from './es6/components/bp-two-column-ssn-input';
import BpTwoColumnMoneyInput from './es6/components/bp-two-column-money-input';
import BpTwoColumnTextareaInput from './es6/components/bp-two-column-textarea-input';
import BpStateDropdown from './es6/components/bp-state-dropdown';
import BpProjectMemberLink from './es6/components/bp_project_member_link';
import BpAddCardButton from './es6/components/bp_add_card_button';
import BpRequestCardButton from './es6/components/bp_request_card_button';
import ProjectOverview from './es6/components/project-overview/project-overview';
import ProjectAppliedFundsView from './es6/components/project-applied-funds/project-applied-funds';
import ProjectServiceProvider from './es6/components/project-service-provider/project-service-provider';
import ProjectServiceProvidersTree from './es6/components/project-service-providers-tree/project-service-providers-tree';
import ProjectsList from './es6/components/projects-list/projects-list';
import ProjectMembersList from './es6/components/project-members-list/project-members-list';
import ProjectMemberView from './es6/components/project-member-view/project-member-view';
import ProjectMemberAddBankAccount from './es6/components/project-member-add-bank-account/project-member-add-bank-account';
import ProjectCardTransactionsList from './es6/components/project-card-transactions-list/project-card-transactions-list';
import ProjectCardTransaction from './es6/components/project-card-transaction/project-card-transaction';
import CommittedFundView from './es6/components/committed-fund-view/committed-fund-view';
import ProjectCardTransactionDetail from './es6/components/project-card-transaction-detail/project-card-transaction-detail';
import NewProjectMemberCard from './es6/components/new-project-member-card/new-project-member-card';
import PayoutView from './es6/components/payout-view/payout-view';
import CardLoadView from './es6/components/card-load-view/card-load-view';
import MyProfile from './es6/components/my-profile/my-profile';
import ProjectNew from './es6/components/project-new/project-new';
import ProjectEdit from './es6/components/project-edit/project-edit';

import ProjectMaterialsTab from './es6/components/project-materials-tab/project-materials-tab';
import ProjectLaborTab from './es6/components/project-labor-tab/project-labor-tab';

import CommitMaterialFunds from './es6/components/commit-material-funds/commit-material-funds';
import CommitLaborFunds from './es6/components/commit-labor-funds/commit-labor-funds';
import CardLoadRequestForm from './es6/components/card-load-request-form/card-load-request-form';
import PayoutRequestForm from './es6/components/payout-request-form/payout-request-form';
import MyBankAccounts from './es6/components/my-bank-accounts/my-bank-accounts';
import NewUserBankAccount from './es6/components/new-user-bank-account/new-user-bank-account';
import NewBankAccount from './es6/components/new-bank-account/new-bank-account';
import BankAccountDetailsNew from './es6/components/bank-account-details-new/bank-account-details-new';
import BankAccountVerify from './es6/components/bank-account-verify/bank-account-verify';
import UserBankAccountVerify from './es6/components/user-bank-account-verify/user-bank-account-verify';
import DocumentUploadNotice from './es6/components/document-upload-notice';
import BankAccountDocumentUpload from './es6/components/bank-account-document-upload/bank-account-document-upload';
import MerchantDocumentUpload from './es6/components/merchant-document-upload/merchant-document-upload';

import FunderOrganizationOfficeDocumentUpload from './es6/components/funder-organization-office-document-upload/funder-organization-office-document-upload';
import FunderOrganizationOfficeBankAccountNew from './es6/components/funder-organization-office-bank-account-new/funder-organization-office-bank-account-new';
import FunderOrganizationOfficeBankAccountVerify from './es6/components/funder-organization-office-bank-account-verify/funder-organization-office-bank-account-verify';

// directives
import BpMustMatch from './es6/directives/bp_must_match';
import BpValidPassword from './es6/directives/bp-valid-password';
import BpProjectCheckUnique from './es6/directives/bp_project_check_unique';
import BpUserCheckUnique from './es6/directives/bp_user_check_unique';
import BpServerError from './es6/directives/bp_server_error';
import BpFieldClass from './es6/directives/bp_field_class';
import BpConvertToNumber from './es6/directives/bp_convert_to_number';

// services
import Config from './es6/services/config.js';
import ApiRequest from './es6/services/api_request.js';
import Authentication from './es6/services/authentication';
import States from './es6/services/states';
import Sessions from './es6/services/sessions';
import TokenInterceptor from './es6/services/token_interceptor';
import Registrations from './es6/services/registrations';
import {Merchants} from './es6/services/merchants';
import CurrentFunderOrganization from './es6/services/current_funder_organization';
import FunderOrganizations from './es6/services/funder_organizations';
import FunderOrganizationOffices from './es6/services/funder_organization_offices';
import MyFunderOrganizationOffices from './es6/services/my_funder_organization_offices';
import FunderOrganizationOfficeMembers from './es6/services/funder_organization_office_members';
import MerchantLocations from './es6/services/merchant_locations';
import MerchantBankAccounts from './es6/services/merchant_bank_accounts';
import Terminals from './es6/services/terminals';
import CurrentMerchant from './es6/services/current_merchant';
import CurrentDirectoryUser from './es6/services/current_directory_user';
import {Transactions} from './es6/services/transactions';
import FormErrors from './es6/services/form_errors';
import fieldStateService from './es6/services/field_state_service';
import ProjectNotifications from './es6/services/project_notifications';
import ResetPasswords from './es6/services/reset_passwords';
import {Users} from './es6/services/users';
import {Invites} from './es6/services/invites';
import Projects from './es6/services/projects';
import Profiles from './es6/services/profiles';
import ProjectCardTransactions from './es6/services/project_card_transactions';
import Messages from './es6/services/messages';
import {ProjectMembers} from './es6/services/project_members';
import ProjectAppliedFunds from './es6/services/project_applied_funds';
import CommittedFunds from './es6/services/committed_funds';
import CardLoads from './es6/services/card_loads';
import Payouts from './es6/services/payouts';
import BankAccounts from './es6/services/bank_accounts';
import AchAccounts from './es6/services/ach_accounts';
import CompanyTypes from './es6/services/company_types';

// models, used as ng1 factories
import ProjectMember from './es6/models/project_member';
import Project from './es6/models/project';
import CurrentUser from './es6/models/current_user';

angular.module('buildpayApp')
.constant('configuration', Config)
.component('projectOverviewFundsTotals', ProjectOverviewFundsTotals)
.component('projectMaterialsTab', ProjectMaterialsTab)
.component('commitMaterialFunds', CommitMaterialFunds)
.component('cardLoadRequestForm', CardLoadRequestForm)
.component('payoutRequestForm', PayoutRequestForm)
.component('projectLaborTab', ProjectLaborTab)
.component('commitLaborFunds', CommitLaborFunds)
.component('login', Login)
.component('transactionView', TransactionView)
.component('transactionsList', TransactionsList)
.component('funderOrganizationsList', FunderOrganizationsList)
.component('funderOrganizationNew', FunderOrganizationNew)
.component('funderOrganizationOverview', FunderOrganizationOverview)
.component('funderOrganizationEdit', FunderOrganizationEdit)
.component('funderOrganizationOfficesList', FunderOrganizationOfficesList)
.component('funderOrganizationOfficeNew', FunderOrganizationOfficeNew)
.component('funderOrganizationOfficeForm', FunderOrganizationOfficeForm)
.component('funderOrganizationOfficeView', FunderOrganizationOfficeView)
.component('funderOrganizationOfficeEdit', FunderOrganizationOfficeEdit)
.component('funderOrganizationOfficeMemberNew', FunderOrganizationOfficeMemberNew)
.component('funderOrganizationOfficeMemberEdit', FunderOrganizationOfficeMemberEdit)
.component('funderOrganizationOfficeAchAccountNew', FunderOrganizationOfficeAchAccountNew)
.component('funderOrganizationOfficeMember', FunderOrganizationOfficeMember)
.component('funderOrganizationOfficeMembersTree', FunderOrganizationOfficeMembersTree)
.component('funderOrganizationOfficeBankAccountNew', FunderOrganizationOfficeBankAccountNew)
.component('funderOrganizationOfficeBankAccountVerify', FunderOrganizationOfficeBankAccountVerify)
.component('merchantsList', MerchantsList)
.component('projectCardTransactionsList', ProjectCardTransactionsList)
.component('projectCardTransaction', ProjectCardTransaction)
.component('projectCardTransactionDetail', ProjectCardTransactionDetail)
.component('bpApp', BpApp)
.component('bpFooter', BpFooter)
.component('bpNavbar', BpNavBar)
.component('merchantNew', MerchantNew)
.component('merchantEdit', MerchantEdit)
.component('merchantView', MerchantView)
.component('merchantLocationNew', MerchantLocationNew)
.component('merchantLocationView', MerchantLocationView)
.component('merchantLocationEdit', MerchantLocationEdit)
.component('merchantLocationForm', MerchantLocationForm)
.component('merchantBankAccountList', MerchantBankAccountList)
.component('merchantBankAccountNew', MerchantBankAccountNew)
.component('merchantBankAccountVerify', MerchantBankAccountVerify)
.component('merchantTerminalNew', MerchantTerminalNew)
.component('terminalList', TerminalList)
.component('resetPassword', ResetPassword)
.component('forgotPassword', ForgotPassword)
.component('newUser', NewUser)
.component('myProfile', MyProfile)
.component('projectMembersList', ProjectMembersList)
.component('projectMemberView', ProjectMemberView)
.component('projectMemberAddBankAccount', ProjectMemberAddBankAccount)
.component('projectsList', ProjectsList)
.component('usersList', UsersList)
.component('userView', UserView)
.component('projectAddBankAccount', ProjectAddBankAccount)
.component('projectAddFunder', ProjectAddFunder)
.component('projectAddOwner', ProjectAddOwner)
.component('projectAddServiceProvider', ProjectAddServiceProvider)
.component('projectOverview', ProjectOverview)
.component('projectNew', ProjectNew)
.component('projectEdit', ProjectEdit)
.component('newInvite', NewInvite)
.component('committedFundView', CommittedFundView)
.component('payoutView', PayoutView)
.component('cardLoadView', CardLoadView)
.component('projectNotificationsList', ProjectNotificationsList)
.component('projectAppliedFunds', ProjectAppliedFundsView)
.component('newProjectMemberCard', NewProjectMemberCard)
.component('myBankAccounts', MyBankAccounts)
.component('newUserBankAccount', NewUserBankAccount)
.component('newBankAccount', NewBankAccount)
.component('bankAccountDetailsNew', BankAccountDetailsNew)
.component('cityStatePostal', CityStatePostal)
.component('changeBankAccountList', ChangeBankAccountList)
.component('bankAccountVerify', BankAccountVerify)
.component('userBankAccountVerify', UserBankAccountVerify)
.component('documentUploadNotice', DocumentUploadNotice)
.component('bankAccountDocumentUpload', BankAccountDocumentUpload)
.component('merchantDocumentUpload', MerchantDocumentUpload)
.component('funderOrganizationOfficeDocumentUpload', FunderOrganizationOfficeDocumentUpload)
.component('bpTwoColumnRow', BpTwoColumnRow)
.component('bpTwoColumnNewPasswordInput', BpTwoColumnNewPasswordInput)
.component('bpTwoColumnDatePickerInput', BpTwoColumnDatePickerInput)
.component('bpTwoColumnSsnInput', BpTwoColumnSsnInput)
.component('bpTwoColumnMoneyInput', BpTwoColumnMoneyInput)
.component('bpTwoColumnTextareaInput', BpTwoColumnTextareaInput)
.component('bpBankAccountHeaderRow', bpBankAccountHeaderRow)
.component('bpBankAccountRow', bpBankAccountRow)
.component('bpProjectMemberLink', BpProjectMemberLink)
.component('bpStateDropdown', BpStateDropdown)
.component('projectServiceProvider', ProjectServiceProvider)
.component('projectServiceProvidersTree', ProjectServiceProvidersTree)
.directive('bpAddUserList', bpAddUserList)
.directive('bpAddUserHeaderRow', bpAddUserHeaderRow)
.directive('bpAddUserRow', bpAddUserRow)
.directive('bpNoEntriesRow', bpNoEntriesRow)
.directive('bpBreadcrumbs', bpBreadcrumbs)
.directive('bpBreadcrumb', bpBreadcrumb)
.directive('bpBaseErrors', bpBaseErrors)
.directive('mustMatch', BpMustMatch)
.directive('bpValidPassword', BpValidPassword)
.directive('fieldErrors', FieldErrors)
.directive('bpLeftColumn', BpLeftColumn)
.directive('bpRightColumn', BpRightColumn)
.directive('bpSubmitRow', BpSubmitRow)
.directive('bpTextInputWithErrors', BpTextInputWithErrors)
.directive('bpEmailInputWithErrors', BpEmailInputWithErrors)
.directive('bpPhoneInputWithErrors', BpPhoneInputWithErrors)
.directive('bpEinInputWithErrors', BpEinInputWithErrors)
.directive('bpAddCardButton', BpAddCardButton)
.directive('bpRequestCardButton', BpRequestCardButton)
.directive('bpProjectCheckUnique', BpProjectCheckUnique)
.directive('bpUserCheckUnique', BpUserCheckUnique)
.directive('bpServerError', BpServerError)
.directive('bpFieldClass', BpFieldClass)
.directive('bpConvertToNumber', BpConvertToNumber)
.service('Sessions', Sessions)
.service('ApiRequest', ApiRequest)
.service('TokenInterceptor', TokenInterceptor)
.service('Authentication', Authentication)
.service('Registrations', Registrations)
.service('States', States)
.service('CurrentFunderOrganization', CurrentFunderOrganization)
.service('FunderOrganizations', FunderOrganizations)
.service('FunderOrganizationOffices', FunderOrganizationOffices)
.service('MyFunderOrganizationOffices', MyFunderOrganizationOffices)
.service('FunderOrganizationOfficeMembers', FunderOrganizationOfficeMembers)
.service('Merchants', Merchants)
.service('MerchantLocations', MerchantLocations)
.service('MerchantBankAccounts', MerchantBankAccounts)
.service('Terminals', Terminals)
.service('CurrentMerchant', CurrentMerchant)
.service('CurrentDirectoryUser', CurrentDirectoryUser)
.service('Transactions', Transactions)
.service('FormErrors', FormErrors)
.service('fieldStateService', fieldStateService)
.service('ProjectNotifications', ProjectNotifications)
.service('ResetPasswords', ResetPasswords)
.service('Users', Users)
.service('Invites', Invites)
.service('Projects', Projects)
.service('Profiles', Profiles)
.service('ProjectCardTransactions', ProjectCardTransactions)
.service('Messages', Messages)
.service('ProjectMembers', ProjectMembers)
.service('ProjectAppliedFunds', ProjectAppliedFunds)
.service('CommittedFunds', CommittedFunds)
.service('CardLoads', CardLoads)
.service('AchAccounts', AchAccounts)
.service('Payouts', Payouts)
.factory('Project', Project)
.factory('ProjectMember', ProjectMember)
.service('currentUser', CurrentUser)
.service('BankAccounts', BankAccounts)
.service('CompanyTypes', CompanyTypes);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['buildpayApp']);
});
