'use strict';

class Profiles {
  constructor($http, configuration) {
    "ngInject";

    this.$http = $http;
    this.url = configuration.apiServer + '/my_profile';
  }

  get() {
    return this.$http.get(this.url);
  };

  update(profile) {
    return this.$http.put(this.url, { profile: profile });
  };
}

export default Profiles;
