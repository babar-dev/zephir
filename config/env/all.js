'use strict';

module.exports = {
  app: {
    title: 'Zephir',
    description: 'A read-only interface to one s bar account.',
    keywords: 'bar, babar, account, customer, drink, balance, charts'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  assets: {
	  lib: {
      css: [
	'public/lib/bootstrap/dist/css/bootstrap.css',
	'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-ui-select/dist/select.css',
		  '//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'
      ],
      js: [
	'public/lib/angular/angular.js',
	'public/lib/angular-resource/angular-resource.js', 
	'public/lib/angular-animate/angular-animate.js', 
	'public/lib/angular-touch/angular-touch.js', 
	'public/lib/angular-sanitize/angular-sanitize.js', 
	'public/lib/angular-ui-router/release/angular-ui-router.js',
	'public/lib/angular-ui-utils/ui-utils.js',
	'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-ui-select/dist/select.js'
      ]
    },
    css: [
      'public/modules/**/css/*.css'
    ],
    js: [
      'public/config.js',
      'public/application.js',
      'public/modules/*/*.js',
      'public/modules/*/*[!tests]*/*.js'
    ],
    tests: [
      'public/lib/angular-mocks/angular-mocks.js',
      'public/modules/*/tests/*.js'
    ]
  }
};
