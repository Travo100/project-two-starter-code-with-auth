process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const db = require("../models");
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);
chai.use(require("chai-as-promised"));

let dummyUser;
let request;

describe("POST /api/signup", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    db.sequelize.sync({ force: true }).then(() => {
      request = chai.request(server);
      done();
    });
  });

  it("should sign up a new user", function(done) {
    // Create an object to send to the endpoint
    dummyUser = {
      email: "testuser@test.com",
      password: "myPassword"
    };

    // POST the request body to the server
    request
      .post("/api/signup")
      .send(dummyUser)
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody).to.equal("/profile");

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});
