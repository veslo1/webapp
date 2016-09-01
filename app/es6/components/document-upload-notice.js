'use strict';

export default {
  bindings: {
    sref: '@',
    verificationText: '@'
  },
  template: `
    <div data-alert class="document-upload-needed-alert alert-box secondary">
      <p>
        You need to upload a document in order to verify your {{ $ctrl.verificationText || 'bank account'}}.
      </p>

      <button class="tiny inline document-upload-button" ui-sref="{{$ctrl.sref}}">Upload Document</button>
    </div>
  `
};
