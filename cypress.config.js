/* eslint-disable key-spacing */
/* eslint-disable indent */
const { defineConfig } = require("cypress");
const path = require("path");
const fs = require("fs-extra");
const _ = require('lodash');
module.exports = defineConfig({
  requestTimeout: 10000,
  responseTimeout: 10000,
  execTimeout: 60000,
  chromeWebSecurity: false,
  screenshotsFolder: "cypress/reports/screenshots",
  videosFolder: "cypress/reports/videos",
  fixturesFolder: "cypress/fixtures",
  screenshotOnRunFailure: true,
  watchForFileChanges: false,
  video: true,
  retries: {
    runMode: 2,
  },
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter",
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: 'EnergyAustraliaTestResultsReport',
      reportTitle: 'EnergyAustraliaTestResultsReport',
      embeddedScreenshots: true,
      inlineAssets: true,
      videoOnFailOnly: true,
      saveAllAttempts: false,
      reportFilename: 'EA_[datetime]_report',
      reportDir: 'cypress/reports/'
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      //this event to create a video for failure test
      on("after:spec", (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = _.some(results.tests, (test) => {
            return _.some(test.attempts, { state: 'failed' });
          });
          if (!failures) {
            // Delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video);
          }
        }
      });
      //If this environment variable envFile doesn't exist it will use the value of preprod and The fetchConfigurationByFile function is called and specify the file as a parameter for this function
      const environment = config.env.envFile || "preprod";
      const configurationForEnvironment = fetchConfigurationByFile(environment);
      return configurationForEnvironment;
    },
    slowTestThreshold: 300,
    excludeSpecPattern: [
    ],
    specPattern: "cypress/e2e/**/*-spec.cy.js",
  },
});
/**
 * This function is used to retrieve file from the path
 * @param {string} file value getitng from config.env.envFile in the config task
 * @returns fs.readJSON(fileLocation)
 */
function fetchConfigurationByFile(file) {
  const fileLocation = path.resolve("environment", `${file}.json`);
  return fs.readJSON(fileLocation);
}
