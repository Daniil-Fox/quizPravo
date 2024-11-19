const questions = [
    {
        question: "Какой орган рассматривает большинство дел об административных правонарушениях?",
        options: [
            "Суды общей юрисдикции",
            "Органы внутренних дел (полиция)",
            "Прокуратура",
            "Мировые судьи"
        ],
        correct: 1
    },
    {
        question: "В течение какого срока лицо может быть привлечено к административной ответственности?",
        options: ["3 месяца", "1 месяц", "6 месяцев", "1 год"],
        correct: 2
    },
    {
        question: "Что не может быть применено в качестве административного наказания?",
        options: [
            "Штраф",
            "Арест",
            "Предупреждение",
            "Лишение права на трудовую деятельность"
        ],
        correct: 3
    },
    {
        question: "Какое минимальное административное наказание предусмотрено за правонарушения?",
        options: ["Предупреждение", "Штраф", "Арест", "Общественные работы"],
        correct: 0
    },
    {
        question: "Кто может освободить от административной ответственности?",
        options: [
            "Прокурор",
            "Судья",
            "Должностное лицо, составившее протокол",
            "Любое из вышеперечисленных"
        ],
        correct: 1
    },
    {
        question: "Какой срок давности привлечения за нарушение правил благоустройства территории?",
        options: ["1 месяц", "6 месяцев", "1 год", "3 года"],
        correct: 1
    },
    {
        question: "Может ли быть наложен штраф на юридическое лицо?",
        options: ["Нет", "Да, но не выше 1 миллиона рублей", "Да", "Да, если сумма не превышает 500 тысяч рублей"],
        correct: 2
    },
    {
        question: "Какой орган осуществляет контроль за соблюдением правил дорожного движения?",
        options: ["ГИБДД", "МВД", "Прокуратура", "Росгвардия"],
        correct: 0
    },
    {
        question: "Какое наказание может быть назначено за нарушение общественного порядка?",
        options: ["Штраф", "Лишение свободы", "Общественные работы", "Все вышеперечисленные"],
        correct: 0
    },
    {
        question: "Каков максимальный срок административного ареста?",
        options: ["15 суток", "30 суток", "45 суток", "60 суток"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const correctAnswersElement = document.getElementById("correct-answers");
const totalQuestionsElement = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");
const answerFeedback = document.getElementById("answer-feedback");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    nextButton.disabled = true;
    answerFeedback.textContent = ""; // Скрываем сообщение о правильном ответе

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => {
            document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
            if (index === currentQuestion.correct) {
                button.classList.add("correct");
                correctAnswers++;
            } else {
                button.classList.add("incorrect");
                const correctButton = optionsElement.children[currentQuestion.correct];
                correctButton.classList.add("correct");
                answerFeedback.textContent = `Правильный ответ: ${currentQuestion.options[currentQuestion.correct]}`;
            }
            nextButton.disabled = false;
        });
        optionsElement.appendChild(button);
    });
}

function showResults() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    correctAnswersElement.textContent = correctAnswers;
    totalQuestionsElement.textContent = questions.length;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", restartQuiz);

loadQuestion();
