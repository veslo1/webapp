'use strict';

class FormErrors {
  handle(form, errors) {
    form.serverErrors = errors;
    form.base_errors = [];

    angular.forEach(errors, (errorArray, field) => {
      if (form[field]) {
        form[field].$setTouched(true);
        form[field].$setDirty(true);

        form[field].$setValidity('serverError', false);
      } else {
        if (field === 'base') {
          form.base_errors = form.base_errors.concat(errorArray);
        } else {
          let formattedField = field.replace(/[_-]/g, ' ').replace(/(?:^)\S/, function(a) { return a.toUpperCase(); });
          form.base_errors = form.base_errors.concat(
            errorArray.map(function(msg) { return `${formattedField} ${msg}`; })
          );
        }
      }
    });
  }
};

export default FormErrors;
