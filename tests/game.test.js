const assert = require("node:assert/strict");
const { QUESTIONS, createGameState, scoreAnswer } = require("../game.js");

assert.equal(QUESTIONS.length, 10, "The game should contain 10 questions.");
assert.deepEqual(
  QUESTIONS.map((question) => question.answer),
  ["deny", "defend", "deny", "defend", "deny", "defend", "deny", "defend", "deny", "defend"],
  "Answers should match the approved order."
);

for (let index = 0; index < QUESTIONS.length; index += 1) {
  const state = createGameState();
  state.currentQuestion = index;
  assert.equal(scoreAnswer(state, QUESTIONS[index].answer), true);
  assert.equal(state.score, 1);
  assert.equal(scoreAnswer(state, QUESTIONS[index].answer), false, "A second answer must not change the score.");
  assert.equal(state.score, 1);
}

const wrongState = createGameState();
assert.equal(scoreAnswer(wrongState, "defend"), false);
assert.equal(wrongState.score, 0);

console.log("All game data and scoring tests passed.");
