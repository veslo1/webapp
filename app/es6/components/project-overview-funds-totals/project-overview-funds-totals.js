'use strict';

class ProjectOverviewFundsTotals {
  constructor(Projects) {
    "ngInject";

    this.Projects = Projects;

    this.Projects.getFinancialOverview(this.project.id).then((response) => {
      var totals = response.data.totals;

      this.material_funds = totals.material_funds;
      this.labor_funds = totals.labor_funds;

      this.total = {
        budgeted: parseFloat(totals.material_funds.budgeted) + parseFloat(totals.labor_funds.budgeted),
        allocated: parseFloat(totals.material_funds.allocated) + parseFloat(totals.labor_funds.allocated),
        spent: parseFloat(totals.material_funds.spent) + parseFloat(totals.labor_funds.spent)
      };

      this.savings = this.total.budgeted - this.total.spent;
    });
  }
}

export default {
  templateUrl: 'es6/components/project-overview-funds-totals/project-overview-funds-totals.html',
  bindings: {
    'project': '='
  },
  controllerAs: 'fundsTotals',
  controller: ProjectOverviewFundsTotals
};
