'use strict';

import Address from './address';
import User from './user';
import PhoneNumbers from './phone_numbers';

export default class MerchantLocation {
  constructor(attrs) {
    attrs = attrs || {};

    this.id = attrs.id || '';
    this.store_number = attrs.store_number || '';
    this.name = attrs.name || '';
    this.address = new Address(attrs.address || {});
    this.phone_numbers = new PhoneNumbers(attrs.phone_numbers || {});
    this.primary_contact_user_id = attrs.primary_contact_user_id || '';
    this.primary_contact_user = new User(attrs.primary_contact_user || {});
    this.bank_account_id = attrs.bank_account_id || '';
    this.bank_account_name = attrs.bank_account_name || '';
    this.bank_account_verified = attrs.bank_account_verified;
  }

  bankAccountNameText() {
    if (this.bank_account_name === 'not_set') {
      return 'Not Set';
    } else {
      return this.bank_account_name;
    }
  };

  isBankAccountVerified() {
    return this.bank_account_verified === true;
  }
}
