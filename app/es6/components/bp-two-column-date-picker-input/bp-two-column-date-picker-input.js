'use strict';

class BpTwoColumnDatePickerInput {
  constructor() {
  }

  $onInit() {

    this.monthOptions = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    this.dayOptions = Array(31).fill(0).map((e, i) => i + 1);
    this.yearOptions = Array(100).fill(new Date().getFullYear()).map((e, i) => e - i);

    this.datePicker = {
      month: this.monthOptions[this.model.getUTCMonth()],
      day: this.model.getUTCDate().toString(),
      year: this.model.getUTCFullYear().toString()
    };
  }

  dateChanged() {
    this.model.setUTCFullYear(this.datePicker.year, this.monthOptions.indexOf(this.datePicker.month), this.datePicker.day);
  }
}

export default {
  require: {
    form: '^form'
  },
  bindings: {
    model: '=',
    label: '@',
    name: '@'
  },
  controller: BpTwoColumnDatePickerInput,
  templateUrl: 'es6/components/bp-two-column-date-picker-input/bp-two-column-date-picker-input.html'
};
