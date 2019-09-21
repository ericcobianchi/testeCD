function sum(a, b) {
  return a + b;
}

test("the sum of 5+5 must be 10", () => {
  expect(sum(5, 5)).toBe(10);
});
