'use strict';

class MyProfile {
  constructor(Profiles, Messages, FormErrors) {
    "ngInject";

    this.Profiles = Profiles;
    this.Messages = Messages;
    this.FormErrors = FormErrors;

    this.profile = {};
    Profiles.get().then((response) => {
      this.profile = response.data.profile;
    });
  }

  updateProfile() {
    this.Profiles.update(this.profile).then(() => {
      this.Messages.addSuccess('Profile updated.');
    }, (response) => {
      this.FormErrors.handle(this.form, response.data.errors);
    });
  }
}

export default {
  controller: MyProfile,
  templateUrl: 'es6/components/my-profile/my-profile.html'
};
