const { calculateTip } = require("../src/math");
test("calculate tip test", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});
