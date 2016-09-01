export default class User {
  constructor(attrs) {
    attrs = attrs || {};

    this.id = attrs.id || '';
    this.full_name = attrs.full_name || '';
    this.first_name = attrs.first_name || '';
    this.last_name = attrs.last_name || '';
    this.email = attrs.email || '';
    this.mobile_phone_number = attrs.mobile_phone_number || '';
    this.registered_at = attrs.registered_at || '';
    this.created_at = attrs.created_at || '';
    this.updated_at = attrs.updated_at || '';
    this.status = attrs.status || '';
    this.system_role = attrs.system_role || 'user';
    this.permissions = attrs.permissions || {};
  }
}
