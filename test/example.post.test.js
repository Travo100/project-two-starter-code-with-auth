process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const db = require("../models");
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);
chai.use(require("chai-as-promised"));

//let request;
let agent;
let dummyUser;

describe("POST /api/examples", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function(done) {
    db.sequelize.sync({ force: true }).then(() => {
      request = chai.request(server);
      db.User.create({
        email: "testuser@test.com",
        password: "myPassword"
      }).then(dbUser => {
        dummyUser = dbUser;
        done();
      });
    });
  });

  it("should save an example", function(done) {
    agent = chai.request.agent(server);
    agent
      .post("/api/login")
      .send({ email: "testuser@test.com", password: "myPassword" })
      .then(function(res) {
        expect(res).to.have.cookie("connect.sid");
        // Create an object to send to the endpoint
        var reqBody = {
          text: "Example text",
          description: "Example description",
          UserId: dummyUser.id
        };

        // POST the request body to the server
        agent
          .post("/api/examples")
          .send(reqBody)
          .end(function(err, res) {
            var responseStatus = res.status;
            var responseBody = res.body;

            // Run assertions on the response

            expect(err).to.be.null;

            expect(responseStatus).to.equal(200);

            expect(responseBody)
              .to.be.an("object")
              .that.includes(reqBody);

            // The `done` function is used to end any asynchronous tests
            done();
          });
      });
  });
});
