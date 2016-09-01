'use strict';

import User from './../models/user';
import AbstractCurrentModel from './abstract_current_model';

class CurrentDirectoryUser extends AbstractCurrentModel {
  constructor(Users) {
    "ngInject";

    super(Users, Users.getUser, User);
  }
}

export default CurrentDirectoryUser;
