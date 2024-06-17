const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
// run befor test case run
beforeEach(async () => {
  await User.deleteMany();
});
test("Should a sign up user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "vb",
      email: "vb@example.com",
      password: "vb21343",
    })
    .expect(200);
});
