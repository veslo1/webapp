'use strict';

class SystemPermissions {
 constructor(attrs) {
   attrs = attrs || {};

   this.can_manage_funders = attrs.can_manage_funders || false;
   this.can_manage_merchants = attrs.can_manage_merchants || false;
   this.can_create_projects = attrs.can_create_projects || false;
   this.can_view_transactions = attrs.can_view_transactions || false;
   this.can_view_directory = attrs.can_view_directory || false;
   this.can_view_my_bank_accounts = attrs.can_view_my_bank_accounts || false;
 }

 canManageFunders() {
   return this.can_manage_funders === true;
 }

 canManageMerchants() {
   return this.can_manage_merchants === true;
 }

 canCreateProjects() {
   return this.can_create_projects === true;
 }

 canViewTransactions() {
   return this.can_view_transactions === true;
 }

 canViewDirectory() {
   return this.can_view_directory === true;
 }

 canViewMyBankAccounts() {
   return this.can_view_my_bank_accounts === true;
 }
}

export default SystemPermissions;
