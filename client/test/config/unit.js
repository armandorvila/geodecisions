'use strict';

// base path, that will be used to resolve files and exclude
var basePath = '../..';

// list of files / patterns to load in the browser
var files = [
  JASMINE,
  JASMINE_ADAPTER,
  'vendor/jquery/jquery.js',
  'vendor/angular/angular.js',
  'vendor/angular/angular-route.js',
  'vendor/angular-animate/*.js',
  'vendor/angular-sanitize/*.js',
  'vendor/angular-ui/*.js',
  'vendor/socket-io/*.js',
  'vendor/angular-socket-io/*.js',
  'vendor/underscore-js/*.js',
  'http://maps.googleapis.com/maps/api/js?sensor=false',
  'vendor/angular-google-maps/*.js',
  'test/vendor/angular/angular-mocks.js',
  'src/**/*.js',
  'test/unit/**/*.mocks.js',
  'test/unit/**/*.spec.js'
];

// use dots reporter, as travis terminal does not support escaping sequences
// possible values: 'dots' || 'progress'
var reporters = 'progress';

// these are default values, just to show available options

// web server port
var port = 8089;

// cli runner port
var runnerPort = 9109;

var urlRoot = '/__test/';

// enable / disable colors in the output (reporters and logs)
var colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
var logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
var autoWatch = false;

// polling interval in ms (ignored on OS that support inotify)
var autoWatchInterval = 0;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
var browsers = ['PhantomJS'];

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
var singleRun = true;
