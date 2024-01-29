import addContext from 'mochawesome/addContext';
/**
 * reporterLog is a custome command is used to create cypress logs
 *  just mean this handler will be used only 1 time, after which will be unregistered.
 **/
Cypress.Commands.add('reporterLog', (logText) => {
  cy.log(logText);
  cy.once('test:after:run', (test) => addContext({ test }, logText));
});
