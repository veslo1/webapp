class LoginCtrl {
  constructor(currentUser, Sessions, Messages, $state) {
    "ngInject";

    this.currentUser = currentUser;
    this.Sessions = Sessions;
    this.Messages = Messages;
    this.$state = $state;

    this.user = {
      email: '',
      password: ''
    };

    this.errorMessage = null;
  }

  createSession() {
    this.Sessions.create(this.user).then((response) => {
      this.currentUser.login(response.data);
      this.Messages.addSuccess('Logged In!');
      this.$state.go('projects');
    }, (response) => {
      this.errorMessage = response.data.errors.join(". ");
    });
  };
}

export default {
  templateUrl: 'es6/components/login/login.html',
  controller: LoginCtrl,
  controllerAs: 'login'
};
