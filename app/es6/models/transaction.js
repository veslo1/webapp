export default class Transaction {
  constructor(attrs) {
    attrs = attrs || {};

    this.id = attrs.id || '';
    this.project = attrs.project || {};
    this.merchant = attrs.merchant || {};
    this.card = attrs.card || {};
    this.sale = (attrs.hasOwnProperty('sale') ? attrs.sale : true);
    this.amount = attrs.amount || '';
    this.reference_number = attrs.reference_number || '';
    this.sold_by = attrs.sold_by || '';
    this.slsp_number = attrs.slsp_number || '';
    this.cshr_number = attrs.cshr_number || '';
    this.subtotal = attrs.subtotal || '';
    this.sales_tax_percent = attrs.sales_tax_percent || '';
    this.sales_tax_amount = attrs.sales_tax_amount || '';
    this.transacted_at = attrs.transacted_at || '';
    this.created_at = attrs.created_at || '';
    this.updated_at = attrs.updated_at || '';
    this.line_items = attrs.line_items || [];
  }

  amountTextForType() {
    return (this.sale ? this.amount : (this.amount * -1).toString());
  }

  typeText() {
    return (this.sale ? 'Sale' : 'Return');
  }
}
