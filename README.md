**#Software Installation**
**PRE-CONDTION: **Install Node.js up to 18 version
1. Clone the Repository from https://github.com/pradeepkamatham67270/Automation-EnergyAustraliaAPI.git
2. Open Visual Studio code and load the Project. 
3. Open the Terminal to run the "npm install" command, which will install all the required plugins for the Automation project. 
4. The commands below would help you open the Cypress in headed and headless mode. 
    npm run test:preprodInfigen (Headless Mode, target to load preprod.json)
    npm run cy:open (Headed Mode, Target to load Preprod.json) 
5. Spec files are in e2e folder

----------------------------------------------------------------End Software Installation------------------------------------------------------------------------------
Framework highlights:

1. Validated the API call response body:
Confirming that the API call responses contain the expected data.
2. Validated URL not found status code:
Ensuring that the application returns the appropriate status code (e.g., 404) for URLs that are expected to be not found.
3. Tried to reproduce the Throttled scenario:
Attempting to simulate scenarios where requests are throttled. Note that intermittent test failures might indicate a need for more stability in the test logic.
4. Built Cypress Mocha Awesome Reports:
Created HTML reports in the cypress/reports folder.
Configured the reports to generate screenshots and videos only when a test fails.
5. Implemented ESLint:
Integrated ESLint to enforce code style and maintain code quality.Aiming to reduce time spent on code review through automated code quality checks.
6. Implemented API calls using Cypress API plugin:
Leveraged the Cypress API plugin to facilitate API testing within the Cypress test runner and Allows displaying request and response details during test execution.
7. Implemented reporter log for debugging:
Integrated a reporter log to assist in debugging test failures.The log is accessible through the HTML report, aiding in identifying and resolving issues.