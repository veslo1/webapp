'use strict';

var _ = require('lodash');
var faker = require('faker');

var BankAccountGenerator = require('./bank_account_generator');
var CardGenerator = require('./card_generator');
var CardLoadApprovalGenerator = require('./card_load_approval_generator');
var CardLoadGenerator = require('./card_load_generator');
var CardTransactionGenerator = require('./card_transaction_generator');
var CardTransactionLineItemGenerator = require('./card_transaction_line_item_generator');
var CommittedFundGenerator = require('./committed_fund_generator');
var FunderOrganizationGenerator = require('./funder_organization_generator');
var FunderOrgOfficeGenerator = require('./funder_org_office_generator');
var FunderOrgOfficeMemberGenerator = require('./funder_org_office_member_generator');
var MerchantGenerator = require('./merchant_generator');
var MerchantLocationGenerator = require('./merchant_location_generator');
var PayoutApprovalGenerator = require('./payout_approval_generator');
var PayoutGenerator = require('./payout_generator');
var ProjectGenerator = require('./project_generator');
var ProjectMemberGenerator = require('./project_member_generator');
var TerminalGenerator = require('./terminal_generator');
var UserGenerator = require('./random_user_generator');
var AchAccountGenerator = require('./ach_account_generator');
var FinancialOverviewGenerator = require('./financial_overview_generator');

module.exports = {
  achAccount: AchAccountGenerator,
  bankAccount: BankAccountGenerator,
  card: CardGenerator,
  cardLoad: CardLoadGenerator,
  cardLoadApproval: CardLoadApprovalGenerator,
  cardTransaction: CardTransactionGenerator,
  cardTransactionLineItem: CardTransactionLineItemGenerator,
  committedFund: CommittedFundGenerator,
  funderOrganization: FunderOrganizationGenerator,
  funderOrgOffice: FunderOrgOfficeGenerator,
  funderOrgOfficeMember: FunderOrgOfficeMemberGenerator,
  merchant: MerchantGenerator,
  merchantLocation: MerchantLocationGenerator,
  payout: PayoutGenerator,
  payoutApproval: PayoutApprovalGenerator,
  project: ProjectGenerator,
  projectMember: ProjectMemberGenerator,
  terminal: TerminalGenerator,
  user: UserGenerator,
  financialOverview: FinancialOverviewGenerator
};
