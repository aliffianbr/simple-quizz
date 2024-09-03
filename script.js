const questions = [
  {
    questions: "Siapa Presiden pertama di indonesia?",
    answers : [
      {text: "Ganjar", correct: false},
      {text: "Moh Hatta", correct: false},
      {text: "Jokowi Dodo", correct: false},
      {text: "Soekarno", correct: true},
    ]
  },
  {
    questions: "Berapakah hasil dari 20 X 10?",
    answers : [
      {text: "201", correct: false},
      {text: "200", correct: true},
      {text: "190", correct: false},
      {text: "45", correct: false},
    ]
  },
  {
    questions: "Apa teknologi terbaik pada web pada tahun 2024?",
    answers : [
      {text: "Python", correct: false},
      {text: "Java", correct: false},
      {text: "Javascript", correct: true},
      {text: "HTML", correct: false},
    ]
  },
  {
    questions: "Tahun kapan krisis moneter terjadi di indonesia?",
    answers : [
      {text: "1997", correct: false},
      {text: "1998", correct: true},
      {text: "1999", correct: false},
      {text: "2000", correct: false},
    ]
  },
  {
    questions: "Apa mata uang di indonesia?",
    answers : [
      {text: "Rupiah", correct: true},
      {text: "Dollar", correct: false},
      {text: "Rupe", correct: false},
      {text: "Ringgit", correct: false},
    ]
  }
];

const questionsElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Selanjutnya";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionsElement.innerHTML = questionNo + ". " + currentQuestion.questions;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer (e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionsElement.innerHTML = `Terjawab dengan benar ${score} salah ${questions.length} !`;
  nextButton.innerHTML = "Main lagi";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  }else{
    startQuiz();
  }
})

startQuiz();