gameParser = require("../src/gameParser/gameParser");

test("The killer must be batatinha22", () => {
  expect(
    gameParser.identifyKiller(
      "13:08 Kill: 2 7 6: batatinha22 killed aaaaaa by MOD_ROCKET"
    )
  ).toBe("batatinha22");
});

test("the player who died must be arnold", () => {
  expect(
    gameParser.identifykilled(
      "11:23 Kill: 2 5 6: Isgalamido killed arnold by MOD_ROCKET"
    )
  ).toBe("arnold");
});
