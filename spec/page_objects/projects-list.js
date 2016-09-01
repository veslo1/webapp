var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/projects',
  newProjectButton: element(by.css('#new-project-button')),
  officeHeaders: element.all(by.css('.project-office-name')),
  projectsList: element.all(by.repeater('project in $ctrl.projectsForFunderOffice')),

  projectByIndex: function(index) {
    var project = this.projectsList.get(index);

    return {
      name: project.element(by.css('.project-name')),
      claimNumber: project.element(by.css('.project-claim-number')),
      location: project.element(by.css('.project-location')),
    };
  }
}, base);
