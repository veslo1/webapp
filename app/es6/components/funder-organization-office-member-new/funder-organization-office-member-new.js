'use strict';

class FunderOrganizationOfficeMemberNew {
  constructor(Invites, FunderOrganizationOffices, $state, Messages, FormErrors) {
    "ngInject";

    this.Invites = Invites;
    this.FunderOrganizationOffices = FunderOrganizationOffices;
    this.$state = $state;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
  }

  $onInit() {
    this.invite = {
      first_name: '',
      last_name: '',
      email: ''
    };

    this.parent_office_member_id = '';
    this.showUserExistsDialog = false;
    this.FunderOrganizationOffices.getPotentialParentMembers(this.funderOffice.id).then((members) => {
      this.potentialParentOfficeMembers = members;
    });
  }

  createInviteAndOfficeMember() {
    if (this.showUserExistsDialog) {
      this.createOfficeMember();
    } else {
      this.Invites.createInvite(this.invite).then(() => {
        //this.Messages.addSuccess('Invite sent.');
        this.createOfficeMember();
      }, (response) => {
        if ((response.data.errors.email || []).indexOf("has already been taken") >= 0) {
          this.showUserExistsDialog = true;
        } else {
          this.FormErrors.handle(this.form, response.data.errors);
        }
      });
    }
  };

  createOfficeMember() {
    this.FunderOrganizationOffices.createOfficeMember(this.funderOffice.id, this.invite.email, this.parent_office_member_id).then(() => {
      this.Messages.addSuccess('Office member added.');
      this.$state.go('funderOrg.offices.office.overview');
    }, (errors) => {
      this.FormErrors.handle(this.form, errors);
    });
  };

  cancelForm() {
    this.$state.go('funderOrg.offices.office.overview');
  }
}

export default {
  bindings: {
    funderOffice: '='
  },
  controller: FunderOrganizationOfficeMemberNew,
  templateUrl: 'es6/components/funder-organization-office-member-new/funder-organization-office-member-new.html'
};
