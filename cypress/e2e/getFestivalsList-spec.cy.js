import { FestivalEndpoints } from "../endPoints/festivalsEndPoints";
import { StatusCodes } from "http-status-codes";

const festivalEndpoints = new FestivalEndpoints();

describe("(Integration QE role) Create a suite of tests that tests the output of the API", () => {

  it("Get the List of Festivals and Valiate the list in Array", () => {
    cy.reporterLog('Get the list of the Festivals and validate them');
    festivalEndpoints.getFestivalsList();
  });
  it("Validate the Wrong URL Not Found", () => {
    cy.reporterLog('Validate the Invalid URL by passing the Not found status code and v2 version in the URI');
    festivalEndpoints.getFestivalsList(StatusCodes.NOT_FOUND, 'v2');
  });
  it("Trying to reproduce the Throttled 429 error", () => {
    cy.reporterLog('Valiate the Throttled status code 429 by running the API call 15 times');
    festivalEndpoints.validateThrottledCode();
  });
});
