'use strict';

export default function(inform) {
  "ngInject";

  return {
    addSuccess: function(message) {
      inform.add(message, {
        // do not set TTL here, for app-wide setting, use angular
        // config block
        type: "success"
      });
    }
  };
};
