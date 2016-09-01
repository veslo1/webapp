'use strict';

export default class Invite {
  constructor(attrs) {
    attrs = attrs || {};

    //this.id = attrs.id || null;
    this.first_name = attrs.first_name || '';
    this.last_name = attrs.last_name || '';
    this.email = attrs.email || '';
  }
}
