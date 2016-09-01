'use strict';

class FunderOrganizationOfficeMemberEdit {
  constructor(FunderOrganizationOfficeMembers, $state, Messages, FormErrors) {
    "ngInject";

    this.$state = $state;
    this.memberId = $state.params.memberId;
    this.Messages = Messages;
    this.FormErrors = FormErrors;
    this.FunderOrganizationOfficeMembers = FunderOrganizationOfficeMembers;
    this.officeMember = {};
    this.potentialParentOfficeMembers = [];
  }

  $onInit() {
    this.FunderOrganizationOfficeMembers.getMember(this.memberId).then((officeMember) => {
      this.officeMember = officeMember;
    });

    this.FunderOrganizationOfficeMembers.getPotentialParentMembers(this.memberId).then((members) => {
      this.potentialParentOfficeMembers = members;
    });
  }

  updateOfficeMember() {
    this.FunderOrganizationOfficeMembers.updateMember(this.memberId, { parent_office_member_id: this.officeMember.parent_office_member_id, can_create_projects: this.officeMember.can_create_projects }).then(() => {
      this.Messages.addSuccess('Funder office member updated.');
      this.$state.go('funderOrg.offices.office.overview');
    }, (errors) => {
      this.FormErrors.handle(this.form, errors);
    });
  }
}

export default {
  bindings: {
    funderOffice: '='
  },
  templateUrl: 'es6/components/funder-organization-office-member-edit/funder-organization-office-member-edit.html',
  controller: FunderOrganizationOfficeMemberEdit
};
