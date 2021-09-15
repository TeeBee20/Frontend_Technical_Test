'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'ember-quickstart',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  ENV.firebase = {
    apiKey: 'AIzaSyArQbvJ4Gw1aXxCIWhM_qcIfJ-EF_-hh_g',
    authDomain: 'cwms-tech-test.firebaseapp.com',
    projectId: 'cwms-tech-test',
    storageBucket: 'cwms-tech-test.appspot.com',
    messagingSenderId: '906423604073',
    appId: '1:906423604073:web:ee81fe55fee70c371263f8',
    measurementId: 'G-0CVGR1BZ0B',
  };

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
