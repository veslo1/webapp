export default class TransactionLineItem {
  constructor(attrs) {
    attrs = attrs || {};

    this.id = attrs.id || '';
    this.transaction_id = attrs.transaction_id || '';
    this.sku_number = attrs.sku_number || '';
    this.description = attrs.description || '';
    this.quantity = attrs.quantity = 0;
    this.unit_price = attrs.unit_price || 0.0;
    this.net_amount = attrs.net_amount = 0.0;
  }
}
