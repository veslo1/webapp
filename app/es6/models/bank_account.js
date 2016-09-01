import Address from './address';

export class BankAccountInfo {
  constructor(data) {
    data = data || {};

    this.account_name = data.account_name || '';
    this.account_type = data.account_type || '';
    this.routing_number = data.routing_number || '';
    this.account_number = data.account_number || '';
  }
}

export class BankAccountCompanyInfo {
  constructor(data) {
    data = data || {};

    this.name = data.name || '';
    this.dba = data.dba || '';
    this.ein = data.ein || '';
    this.type = data.type || '';
    this.website = data.website || '';
  }
}

export class BankAccountUserInfo {
  constructor(data) {
    data = data || {};

    this.email = data.email || '';
    this.first_name = data.first_name || '';
    this.last_name = data.last_name || '';

    if (data.dob) {
      this.dob = Date.parse(data.dob);
    } else {
      this.dob = new Date();
    }

    this.ssn = data.ssn || '';
    this.phone_number = data.phone_number || '';
    this.email = data.email || '';

    this.address = new Address(data.address);
  }
}

export class BankInfo {
  constructor(data) {
    data = data || {};

    this.name = data.name || '';
    this.branch_name = data.branch_name || '';
    this.phone_number = data.phone_number || '';

    this.address = new Address(data.address);
  }
}

export default class BankAccount {
  constructor(data) {
    data = data || {};

    if (data.id) {
      this.id = data.id || '';
    }

    this.status = data.status || '';

    this.company_info = new BankAccountCompanyInfo(data.company_info);
    this.account_info = new BankAccountInfo(data.account_info);
    this.user_info = new BankAccountUserInfo(data.user_info);
    this.bank_info = new BankInfo(data.bank_info);
  }

  isVerifiable() {
    return this.status === 'microdeposits_added';
  }

  statusText() {
    var text = 'Pending';
    if (this.status === 'microdeposits_added') {
      text = 'Pending Verification';
    } else if (this.status === 'verified') {
      text = 'Verified';
    } else if (this.status === 'verification_failed') {
      text = 'Verification Failed';
    }
    return text;
  }
}
