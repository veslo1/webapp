'use strict';

export default {
  bindings: {
    projectId: '=',
    memberId: '='
  },
  transclude: true,
  template: '<a ui-sref="project.members.member.view({ id: $ctrl.projectId, memberId: $ctrl.memberId })" ng-transclude></a>'
};
