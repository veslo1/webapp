'use strict';

class ProjectNotifications {
  constructor($http, configuration) {
    "ngInject";

    this.$http = $http;
    this.configuration = configuration;
  }

  getNotifications(projectId) {
    var url = this.configuration.apiServer + '/projects/' + projectId + '/notifications';
    return this.$http.get(url);
  }

  dismissNotification(notificationId) {
    var url = this.configuration.apiServer + '/notifications/' + notificationId + '/dismiss';
    return this.$http.put(url);
  }
}

export default ProjectNotifications;
