'use strict';

class AbstractCurrentModel {
  constructor(service, resourceFn, Model) {
    this.service = service;
    this.resourceFn = resourceFn;
    this._instance = new Model();
  }

  load(...args) {
    this.resourceFn.apply(this.service, args).then((model) => {
      Object.assign(this._instance, model);
    });
  }

  instance() {
    return this._instance;
  }
}

export default AbstractCurrentModel;
