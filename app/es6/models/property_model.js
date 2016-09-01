'use strict';

class PropertyModel {
  constructor(data) {
    //this.setProperties(data);
    for (var attr in data) {
      if (data.hasOwnProperty(attr)) {
        this[attr] = data[attr];
      }
    }
  }
}

//PropertyModel.prototype.setProperties = function(data) {
  //for (var attr in data) {
    //if (data.hasOwnProperty(attr)) {
      //this[attr] = data[attr];
    //}
  //}
//};

export default PropertyModel;
