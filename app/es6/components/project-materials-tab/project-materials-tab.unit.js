describe('component: projectMaterialsTab', function() {
  var component, scope, project, Projects, $componentController, overview, commitments, cardLoads;

  beforeEach(module('buildpayApp'));

  beforeEach(inject(function($rootScope, _$componentController_, $q) {
    scope = $rootScope.$new();
    $componentController = _$componentController_;

    project = jasmine.createSpy('project');
    project.id = jasmine.createSpy('project id');

    Projects = jasmine.createSpyObj('Projects', [
      'getMaterialFundsOverview',
      'getCardLoads',
      'getMaterialCommitments'
    ]);

    overview = jasmine.createSpy('overview');
    cardLoads = jasmine.createSpy('cardLoads');
    commitments = jasmine.createSpy('commitments');

    Projects.getMaterialFundsOverview.and.returnValue($q.when({ data: { data: overview } }));
    Projects.getCardLoads.and.returnValue($q.when(cardLoads));
    Projects.getMaterialCommitments.and.returnValue($q.when(commitments));

    component = $componentController('projectMaterialsTab',
      {$scope: scope, Projects: Projects},
      {project: project}
    );
  }));

  it('should set the default values', function() {
    expect(component.commitments).toEqual([]);
    expect(component.cardLoads).toEqual([]);
    expect(component.overview).toEqual({});
  });

  it('should assign the name bindings', function() {
    expect(component.project).toBe(project);
    expect(component.Projects).toBe(Projects);
  });

  describe('$onInit', function() {
    it('hits server for stuff', function() {
      component.$onInit();

      expect(Projects.getMaterialFundsOverview).toHaveBeenCalledWith(project.id);
      expect(Projects.getCardLoads).toHaveBeenCalledWith(project.id);
      expect(Projects.getMaterialCommitments).toHaveBeenCalledWith(project.id);

      scope.$digest();

      expect(component.overview).toEqual(overview);
      expect(component.cardLoads).toEqual(cardLoads);
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

  describe('requestCardLoadButtonClicked', function() {
    it('enables form', function() {
      expect(component.requestCardLoadFormEnabled).toEqual(false);
      component.requestCardLoadButtonClicked();
      expect(component.requestCardLoadFormEnabled).toEqual(true);
    });
  });

  describe('commitFormClosed', function() {
    it('resets', function() {
      component.commitFormEnabled = true;
      component.commitFormClosed();

      expect(component.commitFormEnabled).toEqual(false);

      expect(Projects.getMaterialFundsOverview).toHaveBeenCalledWith(project.id);
      expect(Projects.getMaterialCommitments).toHaveBeenCalledWith(project.id);
    });
  });

  describe('requestCardLoadFormClosed', function() {
    it('resets', function() {
      component.requestCardLoadFormEnabled = true;
      component.requestCardLoadFormClosed();

      expect(component.requestCardLoadFormEnabled).toEqual(false);

      expect(Projects.getMaterialFundsOverview).toHaveBeenCalledWith(project.id);
      expect(Projects.getCardLoads).toHaveBeenCalledWith(project.id);
    });
  });
});
