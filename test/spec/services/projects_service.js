'use strict';

describe('Service: Projects', function () {
  var httpBackend;

  // load the service's module
  beforeEach(module('buildpayApp'));

  // Necessary to keep ui-router from trying to obtaing the default template (projects/index.html)
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  var project = {
    id: 35,
    name: 'some project name'
  };

  // instantiate service
  var Projects;
  beforeEach(inject(function (_Projects_, $httpBackend) {
    Projects = _Projects_;
    httpBackend = $httpBackend;

    httpBackend.when('GET', 'http://localhost:3000/projects/35').respond(project);
    httpBackend.when('GET', 'http://localhost:3000/projects').respond([project]);
    httpBackend.whenGET(/http:\/\/localhost:3000\/projects\/check_unique.*/).respond({unique: true});
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('query', function() {
    it('gets projects from api', function() {
      httpBackend.expectGET('http://localhost:3000/projects');

      var projects = Projects.query();
      httpBackend.flush();
      expect(projects).toBeDefined();
    });
  });

  describe('getProject', function() {
    it('gets project from api', function() {
      httpBackend.expectGET('http://localhost:3000/projects/35');
      Projects.getProject(35);
      httpBackend.flush();
    });
  });

  describe('checkUnique', function() {
    describe('key is provided', function() {

      it('returns api result for uniqueness', function() {
        httpBackend.expectGET('http://localhost:3000/projects/check_unique?id=123&prop=propVal', {"Accept": "application/json, text/plain, */*"});

        Projects.checkUnique('123', 'prop', 'propVal').then(function(response) {
          expect(response.data.unique).toEqual(true);
        });
        httpBackend.flush();
      });
    });

    describe('key is NOT provided', function() {
      it('returns api result for uniqueness', function() {
        httpBackend.expectGET('http://localhost:3000/projects/check_unique?prop=propVal', {"Accept": "application/json, text/plain, */*"});

        Projects.checkUnique('', 'prop', 'propVal').then(function(response) {
          expect(response.data.unique).toEqual(true);
        });
        httpBackend.flush();
      });
    });
  });
});
