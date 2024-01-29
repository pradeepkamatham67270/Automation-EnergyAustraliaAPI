import { StatusCodes } from "http-status-codes";

export class FestivalEndpoints {
/**
 * Method is used to vget the Festivals list and validate the status codes 200 and 404
 * If the status code is 200, it validate the response body
 * If the status code is 404, it validate the response status and doesn't goes inside the for loop
 * @param {string} statusCode by default StatusCode.Ok
 * @param {string} appVersion by default v1 getting from the preprod.json file
 */
  getFestivalsList(statusCode = StatusCodes.OK, appVersion = Cypress.env('festivalAPIversion')) {
    return cy.request({
      url:              `${Cypress.config('baseUrl')}/api/${appVersion}/festivals`,
      failOnStatusCode: false
    }).then((response) => {
      //validate the wrong URL status code
      expect(response.status).to.be.eq(statusCode);
      if (statusCode === StatusCodes.OK) {
        for ( let i = 0 ; i < response.body.length; i++ ) {
          //validate the bands must be in array
          expect(response.body[i].bands).to.be.an('array');
          //validate the name some times it can be null it validate it as empty
          expect(response.body[i].name).not.to.be.a('null');
          for (let j = 0; j < response.body[i].bands.length; j++) {
            //validate the name inside the bands not to be empty
            expect(response.body[i].bands[j].name).not.to.be.empty;
            //validate the recordLabel not to be null, "recordLabel": "" some times it can be null
            expect(response.body[i].bands[j].recordLabel).not.to.be.a('null');
          }
        }
      }
    });
  }
  /**
   *  Method is uses to validate the Throttled status code if the API call reaches to maximum it throws 429
   * @param {string} statusCode Throttled code
   */
  validateThrottledCode (statusCode) {
    for ( let i = 0 ; i <= 10 ; i++) {
      this.getFestivalsList();
    }
    this.getFestivalsList(statusCode);
  }
}
