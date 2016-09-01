System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "stage": 0,
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "bower:*": "jspm_packages/bower/*"
  },
  bundles: {
    "app/bundle.deps.js": [
      "github:Modernizr/Modernizr@2.8.3.js",
      "npm:fastclick@1.0.6.js",
      "github:angular/bower-angular@1.5.7.js",
      "github:Modernizr/Modernizr@2.8.3/modernizr.js",
      "npm:fastclick@1.0.6/lib/fastclick.js",
      "npm:babel-runtime@5.8.35/helpers/class-call-check.js",
      "npm:angular-local-storage@0.2.2.js",
      "github:angular-ui/angular-ui-router-bower@0.3.1.js",
      "github:angular/bower-angular-animate@1.5.7.js",
      "github:angular/bower-angular-messages@1.5.7.js",
      "github:angular/bower-angular-sanitize@1.5.7.js",
      "bower:angular-inform@0.0.18.js",
      "bower:angular-foundation@0.8.0.js",
      "bower:angular-input-masks@2.1.1.js",
      "npm:angular-ui-mask@1.8.1.js",
      "github:angular/bower-angular-mocks@1.5.7.js",
      "bower:ng-file-upload@12.0.4.js",
      "npm:babel-runtime@5.8.35/helpers/create-class.js",
      "npm:babel-runtime@5.8.35/helpers/get.js",
      "npm:babel-runtime@5.8.35/helpers/inherits.js",
      "github:angular/bower-angular@1.5.7/angular.js",
      "npm:angular-local-storage@0.2.2/dist/angular-local-storage.js",
      "github:angular-ui/angular-ui-router-bower@0.3.1/release/angular-ui-router.js",
      "bower:angular-inform@0.0.18/dist/angular-inform.js",
      "bower:angular-foundation@0.8.0/mm-foundation-tpls.js",
      "bower:angular-input-masks@2.1.1/angular-input-masks-standalone.min.js",
      "bower:ng-file-upload@12.0.4/ng-file-upload.js",
      "npm:angular-ui-mask@1.8.1/index.js",
      "npm:babel-runtime@5.8.35/core-js/object/define-property.js",
      "npm:babel-runtime@5.8.35/core-js/object/get-own-property-descriptor.js",
      "npm:babel-runtime@5.8.35/core-js/object/create.js",
      "github:angular/bower-angular-messages@1.5.7/angular-messages.js",
      "github:angular/bower-angular-animate@1.5.7/angular-animate.js",
      "github:angular/bower-angular-sanitize@1.5.7/angular-sanitize.js",
      "github:angular/bower-angular-mocks@1.5.7/angular-mocks.js",
      "npm:babel-runtime@5.8.35/core-js/object/set-prototype-of.js",
      "npm:babel-runtime@5.8.35/core-js/object/assign.js",
      "npm:core-js@1.2.6/library/fn/object/define-property.js",
      "npm:core-js@1.2.6/library/fn/object/get-own-property-descriptor.js",
      "npm:core-js@1.2.6/library/fn/object/create.js",
      "npm:angular-ui-mask@1.8.1/dist/mask.js",
      "npm:core-js@1.2.6/library/fn/object/set-prototype-of.js",
      "npm:core-js@1.2.6/library/fn/object/assign.js",
      "npm:core-js@1.2.6/library/modules/$.js",
      "npm:core-js@1.2.6/library/modules/es6.object.get-own-property-descriptor.js",
      "npm:core-js@1.2.6/library/modules/$.core.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "npm:core-js@1.2.6/library/modules/es6.object.set-prototype-of.js",
      "npm:core-js@1.2.6/library/modules/es6.object.assign.js",
      "npm:core-js@1.2.6/library/modules/$.to-iobject.js",
      "npm:core-js@1.2.6/library/modules/$.object-sap.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "npm:core-js@1.2.6/library/modules/$.set-proto.js",
      "npm:core-js@1.2.6/library/modules/$.export.js",
      "npm:core-js@1.2.6/library/modules/$.object-assign.js",
      "npm:core-js@1.2.6/library/modules/$.defined.js",
      "npm:core-js@1.2.6/library/modules/$.fails.js",
      "npm:core-js@1.2.6/library/modules/$.iobject.js",
      "npm:process@0.11.2.js",
      "npm:core-js@1.2.6/library/modules/$.is-object.js",
      "npm:core-js@1.2.6/library/modules/$.global.js",
      "npm:core-js@1.2.6/library/modules/$.an-object.js",
      "npm:core-js@1.2.6/library/modules/$.ctx.js",
      "npm:core-js@1.2.6/library/modules/$.to-object.js",
      "npm:core-js@1.2.6/library/modules/$.cof.js",
      "npm:process@0.11.2/browser.js",
      "npm:core-js@1.2.6/library/modules/$.a-function.js"
    ]
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.7",
    "angular-animate": "github:angular/bower-angular-animate@1.5.7",
    "angular-foundation": "bower:angular-foundation@0.8.0",
    "angular-inform": "bower:angular-inform@0.0.18",
    "angular-input-masks": "bower:angular-input-masks@2.1.1",
    "angular-local-storage": "npm:angular-local-storage@0.2.2",
    "angular-messages": "github:angular/bower-angular-messages@1.5.7",
    "angular-mocks": "github:angular/bower-angular-mocks@1.5.7",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.5.7",
    "angular-ui-mask": "npm:angular-ui-mask@1.8.1",
    "angular-ui-router": "github:angular-ui/angular-ui-router-bower@0.3.1",
    "animate.css": "bower:animate.css@3.5.1",
    "babel": "npm:babel-core@5.8.35",
    "babel-runtime": "npm:babel-runtime@5.8.35",
    "core-js": "npm:core-js@1.2.6",
    "fastclick": "npm:fastclick@1.0.6",
    "foundation": "github:zurb/bower-foundation@5.5.3",
    "modernizr": "github:Modernizr/Modernizr@2.8.3",
    "ng-file-upload": "bower:ng-file-upload@12.0.4",
    "bower:angular-foundation@0.8.0": {
      "angular": "bower:angular@1.5.7"
    },
    "bower:angular-inform@0.0.18": {
      "angular": "bower:angular@1.2.29",
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "bower:angular-input-masks@2.1.1": {
      "angular": "bower:angular@1.3.20",
      "br-validations": "bower:br-validations@0.2.4",
      "string-mask": "bower:string-mask@0.2.2"
    },
    "bower:animate.css@3.5.1": {
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "bower:ng-file-upload@12.0.4": {
      "angular": "bower:angular@1.5.7"
    },
    "github:angular-ui/angular-ui-router-bower@0.3.1": {
      "angular": "github:angular/bower-angular@1.5.7"
    },
    "github:angular/bower-angular-animate@1.5.7": {
      "angular": "github:angular/bower-angular@1.5.7"
    },
    "github:angular/bower-angular-messages@1.5.7": {
      "angular": "github:angular/bower-angular@1.5.7"
    },
    "github:angular/bower-angular-mocks@1.5.7": {
      "angular": "github:angular/bower-angular@1.5.7"
    },
    "github:angular/bower-angular-sanitize@1.5.7": {
      "angular": "github:angular/bower-angular@1.5.7"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:zurb/bower-foundation@5.5.3": {
      "jquery": "github:components/jquery@2.2.0"
    },
    "npm:angular-ui-mask@1.8.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.35": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
