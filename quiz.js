let currentIndex = 0;
let score = 0;
let questions = [];

// GET USER
let user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
  alert("No user found!");
  window.location.href = "index.html";
}

// LOAD LEVEL 1 QUESTIONS
fetch("data/level1.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  });

function loadQuestion() {
  let q = questions[currentIndex];

  document.getElementById("question").innerText = q.question;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  // A B C D buttons
  ["A", "B", "C", "D"].forEach(letter => {
    let btn = document.createElement("button");
    btn.innerText = letter + ": " + q[letter];

    btn.onclick = function () {
      checkAnswer(letter);
    };

    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  let correct = questions[currentIndex].answer;

  if (selected === correct) {
    score += 10;
  }

  document.getElementById("score").innerText = "Score: " + score;

  nextQuestion();
}

function nextQuestion() {
  currentIndex++;

  if (currentIndex >= questions.length) {
    finishQuiz();
  } else {
    loadQuestion();
  }
}

function finishQuiz() {
  alert("Quiz finished! You scored: " + score);

  // LOAD USERS
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // UPDATE POINTS
  users = users.map(u => {
    if (u.phone === user.phone) {
      u.points = (u.points || 0) + score;

      // update current user too
      localStorage.setItem("currentUser", JSON.stringify(u));
    }
    return u;
  });

  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "app.html";
  }
