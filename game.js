const QUESTIONS = [
  {
    plaintiff: "The defendant borrowed $1,000 from me.",
    defendant: "I never borrowed any money.",
    answer: "deny",
    feedback: "The defendant disagrees with the plaintiff's allegation. That's a denial."
  },
  {
    plaintiff: "The defendant owes me $1,000.",
    defendant: "I owed the money, but I already paid it back.",
    answer: "defend",
    feedback: "The defendant is raising payment as an affirmative defense. The defendant says the debt was already paid."
  },
  {
    plaintiff: "The defendant broke my window.",
    defendant: "I didn't break the window.",
    answer: "deny",
    feedback: "The defendant denies doing what the plaintiff claims."
  },
  {
    plaintiff: "The defendant owes me money under our agreement.",
    defendant: "We later signed an agreement releasing me from that debt.",
    answer: "defend",
    feedback: "Release is an affirmative defense. The defendant says the plaintiff agreed to give up the claim."
  },
  {
    plaintiff: "The defendant never delivered my furniture.",
    defendant: "I delivered the furniture on time.",
    answer: "deny",
    feedback: "The defendant disputes what the plaintiff says happened."
  },
  {
    plaintiff: "The defendant owes me money.",
    defendant: "The legal deadline for filing this lawsuit has already passed.",
    answer: "defend",
    feedback: "The statute of limitations is an affirmative defense. It concerns the time limit for filing a lawsuit."
  },
  {
    plaintiff: "The defendant damaged my car.",
    defendant: "My car never touched your car.",
    answer: "deny",
    feedback: "The defendant denies the conduct described in the complaint."
  },
  {
    plaintiff: "The defendant failed to meet a requirement in our contract.",
    defendant: "The plaintiff previously agreed that I no longer had to meet that requirement.",
    answer: "defend",
    feedback: "The defendant may be raising waiver, an affirmative defense. The defendant says the plaintiff agreed to give up a contractual requirement."
  },
  {
    plaintiff: "The defendant never finished painting my house.",
    defendant: "I completed the entire painting job.",
    answer: "deny",
    feedback: "The defendant disagrees with the allegation that the work was not completed."
  },
  {
    plaintiff: "The defendant owes me money under our contract.",
    defendant: "I already paid the amount owed, and I have the payment records.",
    answer: "defend",
    feedback: "Payment is an affirmative defense. The defendant says the obligation was already satisfied."
  }
];

function createGameState() {
  return { currentQuestion: 0, score: 0, answered: false };
}

function scoreAnswer(state, choice) {
  if (state.answered) return false;
  state.answered = true;
  if (choice === QUESTIONS[state.currentQuestion].answer) {
    state.score += 1;
    return true;
  }
  return false;
}

function initGame() {
  const introScreen = document.querySelector("#intro-screen");
  const playScreen = document.querySelector("#play-screen");
  const endScreen = document.querySelector("#end-screen");
  const gameMeta = document.querySelector("#game-meta");
  const startButton = document.querySelector("#start-button");
  const nextButton = document.querySelector("#next-button");
  const playAgainButton = document.querySelector("#play-again-button");
  const answerButtons = [...document.querySelectorAll(".answer-button")];
  const scenarioCard = document.querySelector("#scenario-card");
  const plaintiffText = document.querySelector("#plaintiff-text");
  const defendantText = document.querySelector("#defendant-text");
  const progress = document.querySelector("#progress");
  const score = document.querySelector("#score");
  const progressMarks = document.querySelector("#progress-marks");
  const feedback = document.querySelector("#feedback");
  const feedbackTitle = document.querySelector("#feedback-title");
  const feedbackText = document.querySelector("#feedback-text");
  const finalScore = document.querySelector("#final-score");

  let state = createGameState();

  function buildProgressMarks() {
    progressMarks.replaceChildren();
    QUESTIONS.forEach((_, index) => {
      const mark = document.createElement("span");
      mark.className = "progress-mark";
      if (index < state.currentQuestion) mark.classList.add("is-complete");
      if (index === state.currentQuestion) mark.classList.add("is-current");
      progressMarks.append(mark);
    });
  }

  function renderQuestion() {
    const question = QUESTIONS[state.currentQuestion];
    state.answered = false;
    plaintiffText.textContent = `“${question.plaintiff}”`;
    defendantText.textContent = `“${question.defendant}”`;
    progress.textContent = `Question ${state.currentQuestion + 1} of ${QUESTIONS.length}`;
    score.textContent = `${state.score} right`;
    feedback.hidden = true;
    feedback.className = "feedback";
    answerButtons.forEach((button) => {
      button.disabled = false;
      button.classList.remove("is-correct", "is-wrong");
    });
    buildProgressMarks();
    scenarioCard.classList.remove("card-enter");
    void scenarioCard.offsetWidth;
    scenarioCard.classList.add("card-enter");
    scenarioCard.focus();
  }

  function chooseAnswer(choice) {
    if (state.answered) return;
    const question = QUESTIONS[state.currentQuestion];
    const correct = scoreAnswer(state, choice);

    answerButtons.forEach((button) => {
      button.disabled = true;
      const buttonChoice = button.dataset.answer;
      if (buttonChoice === question.answer) button.classList.add("is-correct");
      if (buttonChoice === choice && !correct) button.classList.add("is-wrong");
    });

    feedback.classList.add(correct ? "is-correct" : "is-wrong");
    feedbackTitle.textContent = correct ? "Correct!" : `Not quite. This is ${question.answer === "deny" ? "a denial" : "an affirmative defense"}.`;
    feedbackText.textContent = question.feedback;
    feedback.hidden = false;
    score.textContent = `${state.score} right`;
    nextButton.textContent = state.currentQuestion === QUESTIONS.length - 1 ? "SEE MY SCORE" : "NEXT QUESTION";
    nextButton.focus();
  }

  function startGame() {
    state = createGameState();
    introScreen.hidden = true;
    endScreen.hidden = true;
    playScreen.hidden = false;
    gameMeta.hidden = false;
    renderQuestion();
  }

  function goNext() {
    if (!state.answered) return;
    if (state.currentQuestion < QUESTIONS.length - 1) {
      state.currentQuestion += 1;
      renderQuestion();
      return;
    }
    playScreen.hidden = true;
    gameMeta.hidden = true;
    endScreen.hidden = false;
    finalScore.textContent = `${state.score} / ${QUESTIONS.length}`;
    document.querySelector("#end-title").focus?.();
    playAgainButton.focus();
  }

  startButton.addEventListener("click", startGame);
  playAgainButton.addEventListener("click", startGame);
  nextButton.addEventListener("click", goNext);
  answerButtons.forEach((button) => button.addEventListener("click", () => chooseAnswer(button.dataset.answer)));

  document.addEventListener("keydown", (event) => {
    if (playScreen.hidden) return;
    if (!state.answered && (event.key === "1" || event.key === "2")) {
      event.preventDefault();
      chooseAnswer(event.key === "1" ? "deny" : "defend");
    } else if (state.answered && event.key === "Enter") {
      event.preventDefault();
      goNext();
    }
  });
}

if (typeof document !== "undefined") initGame();
if (typeof module !== "undefined") module.exports = { QUESTIONS, createGameState, scoreAnswer };
