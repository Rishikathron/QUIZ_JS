const startBtn = document.querySelector(".start_btn");
const card = document.querySelector(".card");
const timer = document.querySelector(".time");

const leaderBoardBtn = document.querySelector("#leaderboard");

let index = 0;
let remainingTime = 50;

let timeInterval;

const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

function showQuestionSummary(text) {
  const summary = document.createElement("div");
  summary.classList.add("summary");

  const line = document.createElement("div");
  line.classList.add("line");

  const p = document.createElement("p");
  p.textContent = text;

  summary.appendChild(line);
  summary.appendChild(p);

  card.appendChild(summary);
}

function gameEnd() {
  card.innerHTML = "";
  //   Creating Heading
  const doneHeading = document.createElement("h1");
  const scoreParagraph = document.createElement("p");
  const scoreSpan = document.createElement("span");

  //   Creating Score Paragraph
  scoreSpan.classList.add("score");
  scoreSpan.textContent = 50 - remainingTime;
  scoreParagraph.textContent = "Your final score is ";

  scoreParagraph.appendChild(scoreSpan);

  //   Creating Span for final score
  const inputSpan = document.createElement("span");
  inputSpan.textContent = "Enter intials: ";
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("input");

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", () => {
    const inputName = input.value.trim(); // Trim whitespace from input value

    if (inputName !== "") {
      // Check if the input is not empty
      const highScoresJSON = localStorage.getItem("score");
      const highScores = highScoresJSON ? JSON.parse(highScoresJSON) : [];

      const newScore = {
        name: inputName,
        score: 50 - remainingTime,
      };

      highScores.push(newScore);

      localStorage.setItem("score", JSON.stringify(highScores));

      location.reload();
    }
  });

  submitButton.classList.add("btn");

  inputSpan.appendChild(input);
  inputSpan.appendChild(submitButton);

  card.appendChild(doneHeading);
  card.appendChild(scoreParagraph);
  card.appendChild(inputSpan);
}

function penalty() {
  remainingTime = remainingTime - 10;
}

function showQuestion() {
  if (index + 1 > questions.length) {
    gameEnd();
    clearInterval(timeInterval);
    return;
  }

  const question = questions[index];

  index++;

  const questionHeading = document.createElement("h1");
  questionHeading.classList.add("question");
  questionHeading.textContent = question.questionText;

  const ul = document.createElement("ul");
  ul.addEventListener("click", (e) => {
    if (e.target.nodeName === "LI") {
      const summary =
        e.target.textContent === question.answer ? "Correct" : "Incorrect";
      showQuestionSummary(summary);

      if (summary === "Incorrect") {
        penalty();
      }

      setTimeout(() => {
        showQuestion();
      }, 1000);
    }
  });

  question.options.forEach((op) => {
    const li = document.createElement("li");
    li.textContent = op;
    ul.appendChild(li);
  });

  card.innerHTML = "";
  card.appendChild(questionHeading);
  card.appendChild(ul);
}

function startTimer() {
  timeInterval = setInterval(() => {
    timer.textContent = `Time: ${remainingTime}`;

    if (remainingTime <= 0) {
      clearInterval(timeInterval); // Stop the timer
      gameEnd(); // Call the gameEnd function
    }

    remainingTime--;
  }, 1000);
}

function startQuiz() {
  showQuestion();
  startTimer();
}

function showLeaderBoard() {
  card.innerHTML = "";
  const highscoresHeading = document.createElement("h1");
  highscoresHeading.textContent = "Highscores";

  const highscoreList = document.createElement("ul");
  highscoreList.classList.add("highscore");

  // Retrieve highscores from localStorage
  const highScoresJSON = localStorage.getItem("score");
  const highScores = highScoresJSON ? JSON.parse(highScoresJSON) : [];

  // Populate the highscore list
  highScores.forEach((score, index) => {
    const highscoreItem = document.createElement("li");
    const highscoreParagraph = document.createElement("p");
    highscoreParagraph.textContent = `${index + 1}. ${score.name} - ${
      score.score
    }`;
    highscoreItem.appendChild(highscoreParagraph);
    highscoreList.appendChild(highscoreItem);
  });

  const backButton = document.createElement("button");
  backButton.id = "backbtn";
  backButton.classList.add("btn");
  backButton.textContent = "Go Back";

  backButton.addEventListener("click", () => {
    location.reload(); // Reload the page to restart the app
  });

  const clearButton = document.createElement("button");
  clearButton.id = "clearnBtn";
  clearButton.classList.add("btn");
  clearButton.textContent = "Clear Scores";

  clearButton.addEventListener("click", () => {
    localStorage.removeItem("score"); // Clear scores from local storage

    // Clear the highscore list content
    highscoreList.innerHTML = "";

    // Show a message if no scores are available
    if (highScores.length === 0) {
      const noScoreMessage = document.createElement("p");
      noScoreMessage.textContent = "No score data found.";
      highscoreList.appendChild(noScoreMessage);
    }
  });

  card.appendChild(highscoresHeading);
  card.appendChild(highscoreList);
  card.appendChild(backButton);
  card.appendChild(clearButton);
}

startBtn.addEventListener("click", startQuiz);
leaderBoardBtn.addEventListener("click", () => {
  showLeaderBoard();
});
