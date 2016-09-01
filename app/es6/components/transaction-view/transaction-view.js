import TransactionLineItem from '../../models/transaction_line_item';

class TransactionViewCtrl {
  constructor($stateParams, Transactions, Messages) {
    "ngInject";

    this.$stateParams = $stateParams;
    this.Messages = Messages;
    this.newLineItem = new TransactionLineItem();

    this.Transactions = Transactions;

    this.Transactions.getTransaction($stateParams.id).then((transaction) => {
      this.transaction = transaction;
      this.newLineItem.transaction_id = this.transaction.id;
    });
  }

  createLineItem() {
    this.Transactions.createTransactionLineItem(this.newLineItem).then(() => {
      this.Messages.addSuccess('Line item created.');
      this.transaction.line_items.push(this.newLineItem);
      this.newLineItem = new TransactionLineItem();
    });
  };
}

export default {
  templateUrl: 'es6/components/transaction-view/transaction-view.html',
  controller: TransactionViewCtrl,
  controllerAs: 'transactionView'
};
