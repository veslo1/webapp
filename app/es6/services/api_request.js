'use strict';

class ObjectsFromResponseHandler {
  constructor(dataKey, ObjectWrapper) {
    this.dataKey = dataKey;
    this.ObjectWrapper = ObjectWrapper;
  }

  handle(data) {
    var objects = data[this.dataKey];
    var items = [];

    angular.forEach(objects, (value, key) => {
      items.push(new this.ObjectWrapper(value));
    });

    return items;
  }
}

class ObjectFromResponseHandler {
  constructor(dataKey, ObjectWrapper) {
    this.dataKey = dataKey;
    this.ObjectWrapper = ObjectWrapper;
  }

  handle(data) {
    var object = data[this.dataKey];
    var instance = new this.ObjectWrapper(object);

    if (data.permissions) {
      instance.permissions = data.permissions;
    }

    return instance;
  }
}

class ResponseHandler {
  handle(data) {
    return data;
  }
}

class ApiRequestPromise {
  constructor(deferred, request, successHandler) {
    this.deferred = deferred;
    this.request = request;
    this.successHandler = successHandler || new ResponseHandler();
  }

  response() {
    this.request.then(this.success, this.failure);
    return this.deferred.promise;
  }

  success = (response) => {
    this.deferred.resolve(this.successHandler.handle(response.data));
  }

  failure = (response) => {
    this.deferred.reject(response.data.errors);
  }
}

export default class ApiRequest {
  constructor($http, $q, configuration) {
    "ngInject";

    this.$http = $http;
    this.$q = $q;
    this.baseUrl = configuration.apiServer;
  }

  queryRaw(url) {
    return this.$http.get(`${this.baseUrl}/${url}`);
  }

  query(url, dataKey, ObjectWrapper) {
    return new ApiRequestPromise(
      this.$q.defer(),
      this.$http.get(`${this.baseUrl}/${url}`),
      new ObjectsFromResponseHandler(dataKey, ObjectWrapper)
    ).response();
  }

  get(url, dataKey, ObjectWrapper) {
    return new ApiRequestPromise(
      this.$q.defer(),
      this.$http.get(`${this.baseUrl}/${url}`),
      new ObjectFromResponseHandler(dataKey, ObjectWrapper)
    ).response();
  }

  put(url, data) {
    return new ApiRequestPromise(
      this.$q.defer(),
      this.$http.put(`${this.baseUrl}/${url}`, data)
    ).response();
  }

  post(url, data) {
    return new ApiRequestPromise(
      this.$q.defer(),
      this.$http.post(`${this.baseUrl}/${url}`, data)
    ).response();
  }
}
