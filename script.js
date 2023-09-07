const questions = [
  {
    question: "What's the best sports club in the world?",
    answers: [
      { text: "AFC Ajax", correct: true },
      { text: "FC Barcelona", correct: false },
      { text: "Manchester United", correct: false },
      { text: "FC Bayern Munchen", correct: false },
    ],
  },
  {
    question: "What's the most used programming language in the world?",
    answers: [
      { text: "Python", correct: false },
      { text: "CSS", correct: false },
      { text: "Javascript", correct: true },
      { text: "C#", correct: false },
    ],
  },
  {
    question:
      "After the GP of Monza 2023, how many times in a row did Max Verstappen that season?",
    answers: [
      { text: "15", correct: false },
      { text: "7", correct: false },
      { text: "3", correct: false },
      { text: "10", correct: true },
    ],
  },
  {
    question:
      "Which UCI championship team is considered the best in the world after the tour the France 2023?",
    answers: [
      { text: "UAE", correct: false },
      { text: "Jumbo-Visma", correct: true },
      { text: "Rabobank", correct: false },
      { text: "FC Bayern Munchen", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
