'use strict';

import Address from './address';
import PhoneNumbers from './phone_numbers';
import User from './user';

export default class FunderOrganizationOffice {
  constructor(attrs) {
    attrs = attrs || {};

    this.id = attrs.id || '';
    this.name = attrs.name || '';
    this.dba = attrs.dba || '';
    this.address = new Address(attrs.address || {});
    this.website = attrs.website || '';
    this.phone_numbers = new PhoneNumbers(attrs.phone_numbers || {});
    this.ein = attrs.ein || '';
    this.company_type = attrs.company_type || '';
    this.primary_contact_user_id = attrs.primary_contact_user_id || '';
    this.primary_contact_user = new User(attrs.primary_contact_user || {});

    this.can_add_ach_account = attrs.can_add_ach_account || false;
    this.can_add_bank_account = attrs.can_add_bank_account || false;
    this.prevalidation_errors = attrs.prevalidation_errors || {};
    this.permissions = attrs.permissions || {};
  }

  canAddAchAccount() {
    return this.can_add_ach_account === true;
  }

  canAddAchAccountErrors() {
    return this.prevalidationErrorsForKey('can_add_ach_account');
  }

  setCanAddBankAccount() {
    if (!this.can_add_bank_account) {
      this.can_add_bank_account = true;
      this.clearPrevalidationErrorsForKey('can_add_bank_account');
    }
  }

  canAddBankAccount() {
    return this.can_add_bank_account === true;
  }

  canAddBankAccountErrors() {
    return this.prevalidationErrorsForKey('can_add_bank_account');
  }

  clearPrevalidationErrorsForKey(key) {
    if (this.prevalidation_errors.hasOwnProperty(key)) {
      this.prevalidation_errors[key] = [];
    }
  }

  prevalidationErrorsForKey(key) {
    if (this.prevalidation_errors[key]) {
      return this.prevalidation_errors[key];
    } else {
      return [];
    };
  }
}
