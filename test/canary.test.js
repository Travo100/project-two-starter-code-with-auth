var expect = require("chai").expect;

function multiply(x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("x or y is not a number.");
  } else {
    return x * y;
  }
}

describe("canary test", function() {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it("should pass this canary test", function() {
    expect(true).to.be.true;
  });
});

describe("Multiply", function() {
  it("should multiply properly two numbers", function() {
    expect(multiply(2, 4)).to.equal(8);
  });

  it("should throw an error is not passed a number", function() {
    expect(function() {
      multiply(2, "8");
    }).to.throw(Error);
  });
});
