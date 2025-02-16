const questions = [
    {
        question: "Which Malaysian state is the largest producer of seaweed?",
        options: ["Sabah", "Sarawak", "Penang", "Johor"],
        answer: "Sabah"
    },
    {
        question: "What is the primary use of Malaysian seaweed?",
        options: ["Medicine", "Carrageenan production", "Animal feed", "Fertilizer"],
        answer: "Carrageenan production"
    },
    {
        question: "How does seaweed farming benefit the environment?",
        options: ["Increases CO₂ emissions", "Absorbs CO₂", "Pollutes oceans", "Destroys coral reefs"],
        answer: "Absorbs CO₂"
    },
    {
        question: "Which challenge does Malaysian seaweed farming face?",
        options: ["Excessive funding", "Climate change", "Low demand", "Overproduction"],
        answer: "Climate change"
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    q.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
    document.getElementById("score").textContent = `Score: ${score}`;
}

function checkAnswer(selected) {
    const correct = questions[currentQuestion].answer;
    if (selected === correct) {
        score += 10;
        alert("Correct! 🎉");
    } else {
        alert(`Wrong! The correct answer is: ${correct}`);
    }
    document.getElementById("score").textContent = `Score: ${score}`;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        alert(`Game Over! Final Score: ${score}`);
        currentQuestion = 0;
        score = 0;
        loadQuestion();
    }
}

// Initialize the game
loadQuestion();
