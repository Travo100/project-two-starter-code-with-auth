process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const db = require("../models");
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);
chai.use(require("chai-as-promised"));

let request;

describe("GET /api/examples", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    db.sequelize.sync({ force: true }).then(() => {
      request = chai.request(server);
      done();
    });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.User.create({
      email: "testuser@test.com",
      password: "myPassword"
    }).then(dbUser => {
      db.Example.create({
        text: "First Example",
        description: "First Description",
        UserId: dbUser.id
      }).then(function() {
        // Request the route that returns all examples
        request.get("/api/examples").end(function(err, response) {
          var responseStatus = response.status;
          var responseBody = response.body;

          console.log(responseStatus);
          console.log(responseBody);
          // Run assertions on the response

          expect(err).to.be.null;

          expect(responseStatus).to.equal(200);

          expect(responseBody)
            .to.be.an("array")
            .that.has.lengthOf(1);

          expect(responseBody[0])
            .to.be.an("object")
            .that.includes({
              text: "First Example",
              description: "First Description"
            });

          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
    });
  });
});
