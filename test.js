const chai = require('chai');
const expect = chai.expect;
const parser = require('./parser')


describe('Parse Response', function() {
  it('should return the html to be displayed', function() {
    const response = {
      statusCode: 200
    };
    const body = '{"ImageName":"34529-4093687.jpg","PredictedClass":"Fours","PredictedProb":65.57341}';
    const html = {
      statusCode: 200,
      html: "Type: Fours (65.57%)"
    };
    const resp = parser.parseFunction(response, body);
    expect(resp).to.deep.equal(html);
  });

  it('should return the status code and error to be displayed', function() {
    const response = {
      statusCode: 422
    };
    const body = '{"detail": "Image attached is not allowed"}';
    const html = {
      statusCode: 422,
      html: "Error (422): Image attached is not allowed"
    };
    const resp = parser.parseFunction(response, body);
    expect(resp).to.deep.equal(html);
  });
});