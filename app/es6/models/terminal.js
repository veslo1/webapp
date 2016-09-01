export default class Terminal {
  constructor(attrs) {
    attrs = attrs || {};

    this.id = attrs.id || '';
    this.serial_number = attrs.serial_number || '';
    this.terminal_identifier = attrs.terminal_identifier || '';
  }
}
