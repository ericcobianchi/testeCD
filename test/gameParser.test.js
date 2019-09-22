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
    gameParser.identifyKilled(
      "11:23 Kill: 2 5 6: Isgalamido killed arnold by MOD_ROCKET"
    )
  ).toBe("arnold");
});

test("the player death cause", () => {
  expect(
    gameParser.identfyDeathCause(
      " 11:41 Kill: 3 4 7: Oootsimo killed Dono da Bola by MOD_ROCKET_SPLASH"
    )
  ).toBe("MOD_ROCKET_SPLASH");
});

test("the player identification", () => {
  expect(
    gameParser.identifyPlayer(
      `21:53 ClientUserinfoChanged: 3 n\\Mocinha\\t\\0modelsargehmodelsargeg_redteam\\g_blueteam`
    )
  ).toBe("Mocinha");
});
