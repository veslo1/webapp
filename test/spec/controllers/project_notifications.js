'use strict';

describe('Controller: ProjectNotificationsCtrl', function () {
  beforeEach(module('buildpayApp'));

  var projectId = "1";
  var stateParams = { id: projectId };
  //var scope, projectNotificationsCtrl, ProjectNotifications;
  var projectNotificationsCtrl, ProjectNotifications;

  var notification1 = jasmine.createSpyObj('notification1', ['id']);
  var notification2 = jasmine.createSpyObj('notification2', ['id']);

  var projectNotifications = [ notification1, notification2 ];

  beforeEach(inject(function ($controller, $rootScope, $stateParams, $q) {
    //scope = $rootScope.$new();

    ProjectNotifications = jasmine.createSpyObj('ProjectNotifications', ['query', 'dismissNotification']);

    ProjectNotifications.query.and.returnValue($q.when({ data: { notifications: projectNotifications } }));
    ProjectNotifications.dismissNotification.and.returnValue($q.when({ data: { success: true } }));

    projectNotificationsCtrl = $controller('ProjectNotificationsCtrl', {
      $stateParams: stateParams,
      ProjectNotifications: ProjectNotifications
    });
  }));

  //it('gets notifications from api', function () {
    //expect(projectNotifications).toHaveBeenCalledWith({projectId: projectId});
    //expect(projectNotificationsCtrl.notifications).toEqual(projectNotifications);
  //});

  //describe('dismissNotification', function() {
    //it('dismisses notification', function() {
      //projectNotificationsCtrl.dismissNotification(notification2);
      //scope.$digest();
      //expect(ProjectNotifications.dismissNotification).toHaveBeenCalledWith(notification2.id);
      //expect(projectNotificationsCtrl.notifications).toEqual([ notification1 ]);
    //});
  //});
});

