'use strict';

export const ProjectPermissionsSet = [
  'can_view_project_applied_funds',
  'can_apply_project_funds',
  'can_start_project',
  'can_edit_project',
  'can_change_project_funder',
  'can_change_project_owner',
  'can_view_project_bank_account',
  'can_change_project_bank_account',
  'can_commit_project_funds',
  'can_view_project_notifications',
  'can_add_service_providers',
  'can_view_project_committed_funds',
  'can_view_project_card_transactions',
  'can_view_funds_totals',
  'can_view_project_savings',
  'can_view_material_funds',
  'can_view_labor_funds',
  'can_view_card_loads',
  'can_request_card_load',
  'can_view_payouts',
  'can_request_payout'
];

class ProjectPermissions {
  constructor(data) {
    var attrs = data || {};

    ProjectPermissionsSet.forEach((permission) => {
      this[permission] = attrs[permission] || false;
    });
  }

  canViewProjectAppliedFunds() {
    return this.can_view_project_applied_funds === true;
  }

  canApplyProjectFunds() {
    return this.can_apply_project_funds === true;
  }

  canStartProject() {
    return this.can_start_project === true;
  }

  canEditProject() {
    return this.can_edit_project === true;
  }

  canChangeFunder() {
    return this.can_change_project_funder === true;
  }

  canChangeOwner() {
    return this.can_change_project_owner === true;
  }

  canViewBankAccount() {
    return this.can_view_project_bank_account === true;
  }

  canChangeBankAccount() {
    return this.can_change_project_bank_account === true;
  }

  canCommitFunds() {
    return this.can_commit_project_funds === true;
  }

  canCommitMaterialFunds() {
    return this.can_commit_project_funds === true;
  }

  canViewProjectNotifications() {
    return this.can_view_project_notifications === true;
  }

  canAddServiceProviders() {
    return this.can_add_service_providers === true;
  }

  canViewProjectCommittedFunds() {
    return this.can_view_project_committed_funds === true;
  }

  canViewProjectCardTransactions() {
    return this.can_view_project_card_transactions === true;
  }

  canViewFundsTotals() {
    return this.can_view_funds_totals === true;
  }

  canViewProjectSavings() {
    return this.can_view_project_savings === true;
  }

  canViewMaterialFunds() {
    return this.can_view_material_funds === true;
  }

  canViewLaborFunds() {
    return this.can_view_labor_funds === true;
  }

  canViewCardLoads() {
    return this.can_view_card_loads === true;
  }

  canRequestCardLoad() {
    return this.can_request_card_load === true;
  }

  canViewPayouts() {
    return this.can_view_payouts === true;
  }

  canRequestPayout() {
    return this.can_request_payout === true;
  }
}

export default ProjectPermissions;
