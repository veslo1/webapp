'use strict';

class ProjectNotificationsList {
  constructor($stateParams, ProjectNotifications) {
    "ngInject";

    this.ProjectNotifications = ProjectNotifications;

    this.notifications = [];
    ProjectNotifications.getNotifications($stateParams.id).then((response) => {
      this.notifications = response.data.notifications;
    });
  }

  dismissNotification(notification) {
    this.ProjectNotifications.dismissNotification(notification.id).then(() => {
      var index = this.notifications.indexOf(notification);
      this.notifications.splice(index, 1);
    });
  };
};

export default {
  controller: ProjectNotificationsList,
  templateUrl: 'es6/components/project-notifications-list/project-notifications-list.html'
};
