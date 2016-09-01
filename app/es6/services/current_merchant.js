'use strict';

import Merchant from './../models/merchant';
import AbstractCurrentModel from './abstract_current_model';

class CurrentMerchant extends AbstractCurrentModel {
  constructor(Merchants) {
    "ngInject";

    super(Merchants, Merchants.getMerchant, Merchant);
  }
}

export default CurrentMerchant;
