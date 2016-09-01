'use strict';

import FunderOrganization from './../models/funder_organization';
import AbstractCurrentModel from './abstract_current_model';

class CurrentFunderOrganization extends AbstractCurrentModel {
  constructor(FunderOrganizations) {
    "ngInject";

    super(FunderOrganizations, FunderOrganizations.get, FunderOrganization);
  }
}

export default CurrentFunderOrganization;
