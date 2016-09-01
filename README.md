# buildpay

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Pre-reqs

Install node, ruby.

$ bundle
$ npm install
$ jspm registry create bower jspm-bower-endpoint
$ jspm install

$ brew install chromedriver

$ npm i -g jspm grunt

## To run server

$ grunt serve

## To run tests

$ grunt chrome

## Deploy Example

node_env=production api_server=https://buildpay-test.sketchdevservices.com/api branch=dev server=buildpay-test.sketchdevservices.com bundle exec cap production deploy

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

# Jspm stuff

Bundle deps command:

jspm bundle app/bootstrap.js - [app/**/*] app/bundle.deps.js --inject --skip-source-maps

# How to upgrade angular

$ jspm install angular angular-animate angular-messages angular-mocks bower:angular-foundation bower:ng-file-upload angular-ui-router angular-sanitize
$ npm install angular-mocks --save-dev

Inside jspm.config.js, make sure all angular-related repos inside the map key reference new angular version. Then upgrade the jspm bundle.

# How to upgrade jspm bundle

$ jspm bundle app/bootstrap.js - [app/**/*] app/bundle.deps.js --inject --skip-source-maps

Then, make sure all references in package.json and jspm.config.js
reference new angular version. Sometimes angular-foundation likes to
reference old version.

Server provisioning instructions:

1. Set up droplet in digital ocean (1GB+ memory recommended).
1. Point DNS to new droplet.
1. Set up vars in ansible/host_vars/{production_server_hostname}
1. Run:
$ ansible-playbook -i ansible/production ansible/setup_webapp_server.yml

Deploy instructions:

Deploying through CodeShip is recommended, but if manual deploy is
needed run:

$ node_env=production api_server=https://{production_server_hostname}.com/api branch=staging server={production_server_hostname}.com bundle exec cap production deploy

