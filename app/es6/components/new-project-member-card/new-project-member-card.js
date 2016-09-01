'use strict';

class NewProjectMemberCard {
  constructor($state, Messages, FormErrors) {
    "ngInject";

    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;

    this.card = {
      number: ''
    };
  }

  addCardNumber() {
    this.member.updateCardNumber(this.card.number).then(() => {
      this.Messages.addSuccess('Card number added.');
      this.member.get();
      this.$state.go('project.members.member.view', { id: this.member.project_id, memberId: this.member.id });
    }, (response) => {
      this.FormErrors.handle(this.form, response.data.errors);
    });
  };
}

export default {
  bindings: {
    member: '='
  },
  controller: NewProjectMemberCard,
  templateUrl: 'es6/components/new-project-member-card/new-project-member-card.html'
};
