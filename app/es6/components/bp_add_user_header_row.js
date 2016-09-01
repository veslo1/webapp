export default function () {
  return {
    restrict: 'E',
    template: `
      <div class="row collapse bp-table-row user headings">
        <div class="small-5 medium-3 columns user-full-name">
          Name
        </div>
        <div class="show-for-medium-up small-4 medium-7 large-4 columns user-email">
          Email
        </div>
        <div class="small-2 columns">
          Options
        </div>
      </div>
    `
  };
};
