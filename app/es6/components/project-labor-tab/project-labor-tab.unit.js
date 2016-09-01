describe('component: projectLaborTab', function() {
  var component, scope, project, Projects, $componentController, overview, commitments, payouts;

  beforeEach(module('buildpayApp'));

  beforeEach(inject(function($rootScope, _$componentController_, $q) {
    scope = $rootScope.$new();
    $componentController = _$componentController_;

    project = jasmine.createSpy('project');
    project.id = jasmine.createSpy('project id');

    Projects = jasmine.createSpyObj('Projects', [
      'getLaborFundsOverview',
      'getPayouts',
      'getLaborCommitments'
    ]);

    overview = jasmine.createSpy('overview');
    commitments = jasmine.createSpy('commitments');
    payouts = jasmine.createSpy('payouts');

    Projects.getLaborFundsOverview.and.returnValue($q.when({ data: { data: overview } }));
    Projects.getPayouts.and.returnValue($q.when(payouts));
    Projects.getLaborCommitments.and.returnValue($q.when(commitments));

    component = $componentController('projectLaborTab',
      {$scope: scope, Projects: Projects},
      {project: project}
    );
  }));

  it('should set the default values', function() {
    expect(component.commitments).toEqual([]);
    expect(component.payouts).toEqual([]);
    expect(component.overview).toEqual({});
  });

  it('should assign the name bindings', function() {
    expect(component.project).toBe(project);
    expect(component.Projects).toBe(Projects);
  });

  describe('$onInit', function() {
    it('hits server for stuff', function() {
      component.$onInit();

      expect(Projects.getLaborFundsOverview).toHaveBeenCalledWith(project.id);
      expect(Projects.getPayouts).toHaveBeenCalledWith(project.id);
      expect(Projects.getLaborCommitments).toHaveBeenCalledWith(project.id);

      scope.$digest();

      expect(component.overview).toEqual(overview);
      expect(component.payouts).toEqual(payouts);
      expect(component.commitments).toEqual(commitments);
    });
  });

  describe('commitFundsButtonClicked', function() {
    it('enables form', function() {
      expect(component.commitFormEnabled).toEqual(false);
      component.commitFundsButtonClicked();
      expect(component.commitFormEnabled).toEqual(true);
    });
  });

  describe('requestPayoutButtonClicked', function() {
    it('enables form', function() {
      expect(component.requestPayoutFormEnabled).toEqual(false);
      component.requestPayoutButtonClicked();
      expect(component.requestPayoutFormEnabled).toEqual(true);
    });
  });

  describe('commitFormClosed', function() {
    it('resets', function() {
      component.commitFormEnabled = true;
      component.commitFormClosed();

      expect(component.commitFormEnabled).toEqual(false);

      expect(Projects.getLaborFundsOverview).toHaveBeenCalledWith(project.id);
      expect(Projects.getLaborCommitments).toHaveBeenCalledWith(project.id);
    });
  });

  describe('requestPayoutFormClosed', function() {
    it('resets', function() {
      component.requestPayoutFormEnabled = true;
      component.requestPayoutFormClosed();

      expect(component.requestPayoutFormEnabled).toEqual(false);

      expect(Projects.getLaborFundsOverview).toHaveBeenCalledWith(project.id);
      expect(Projects.getPayouts).toHaveBeenCalledWith(project.id);
    });
  });
});
