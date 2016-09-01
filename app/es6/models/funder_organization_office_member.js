'use strict';
import User from './user';

export default class FunderOrganizationOfficeMember {
  constructor(attrs) {
    attrs = attrs || {};

    this.id = attrs.id || '';
    this.user = new User(attrs.user);
    this.parent_office_member_id = attrs.parent_office_member_id || '';
    this.can_create_projects = attrs.can_create_projects || false;
  }
}
