export default function () {
  return {
    template: `
      <div class="row users-list">
        <div class="small-12 columns">
          <bp-add-user-header-row></bp-add-user-header-row>
            <bp-add-user-row user="userRecord" ng-repeat="userRecord in users">
              <button class="button uppercase tiny add-user-button" ng-click="buttonAction(userRecord.id)">{{ buttonTitle }}</button>
            </bp-add-user-row>
          <bp-no-entries-row ng-show="!users.length">No users</bp-no-entries-row>
        </div>
      </div>
    `,
    transclude: true,
    scope: {
      users: '=',
      buttonAction: '=',
      buttonTitle: '@'
    }
  };
};
