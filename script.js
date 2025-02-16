class GameState {
    constructor() {
        this.score = 0;
        this.year = 1;
        this.co2 = 0;
        this.economy = 50;
        this.environment = 50;
        this.achievements = new Set();
        this.questions = [
            {
                question: "What's the ideal water temperature for Eucheuma?",
                options: ["10-15°C", "20-25°C", "27-30°C", "35-40°C"],
                answer: "27-30°C"
            },
            {
                question: "How long does seaweed take to harvest?",
                options: ["1 week", "45 days", "6 months", "1 year"],
                answer: "45 days"
            },
            {
                question: "What percentage of Malaysian seaweed is exported?",
                options: ["20%", "50%", "75%", "90%"],
                answer: "90%"
            }
        ];
    }

    updateEconomy(value) {
        this.economy = Math.max(0, Math.min(100, this.economy + value));
        this.updateProgressBars();
    }

    updateEnvironment(value) {
        this.environment = Math.max(0, Math.min(100, this.environment + value));
        this.updateProgressBars();
    }

    updateProgressBars() {
        document.querySelector('#eco-progress .progress-fill').style.width = `${this.economy}%`;
        document.querySelector('#enviro-progress .progress-fill').style.width = `${this.environment}%`;
    }

    addAchievement(title) {
        if (!this.achievements.has(title)) {
            this.achievements.add(title);
            const achievement = document.createElement('div');
            achievement.className = 'achievement';
            achievement.textContent = title;
            document.getElementById('achievements').appendChild(achievement);
            setTimeout(() => achievement.remove(), 3000);
        }
    }
}

const game = new GameState();
let gameInterval;

// Game Mechanics
function growSeaweed() {
    const bed = document.getElementById('seaweed-bed');
    const seaweed = document.createElement('div');
    seaweed.className = 'seaweed';
    bed.appendChild(seaweed);
    
    game.co2 += 5;
    game.score += 10;
    game.updateEnvironment(2);
    game.updateEconomy(1);
    
    updateDisplay();
    checkAchievements();
}

function handleRandomEvent() {
    const events = [
        {
            message: "Red tide alert! Some seaweed damaged!",
            effect: () => {
                const bed = document.getElementById('seaweed-bed');
                if (bed.children.length > 0) bed.removeChild(bed.lastChild);
                game.updateEnvironment(-10);
            }
        },
        {
            message: "New farming technique learned!",
            effect: () => game.updateEconomy(15)
        }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    showEventMessage(event.message);
    event.effect();
}

function showEventMessage(message) {
    const display = document.getElementById('event-display');
    display.textContent = message;
    setTimeout(() => display.textContent = '', 2000);
}

// Quiz System
function triggerQuiz() {
    const question = game.questions[Math.floor(Math.random() * game.questions.length)];
    const popup = document.getElementById('quiz-popup');
    
    popup.querySelector('#question').textContent = question.question;
    const optionsDiv = popup.querySelector('#options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => handleAnswer(option === question.answer);
        optionsDiv.appendChild(btn);
    });
    
    popup.classList.remove('hidden');
}

function handleAnswer(correct) {
    document.getElementById('quiz-popup').classList.add('hidden');
    if (correct) {
        game.score += 50;
        game.updateEconomy(10);
        game.updateEnvironment(10);
        showEventMessage("Correct! Bonus rewards!");
    } else {
        showEventMessage("Wrong answer! Research continues...");
    }
    updateDisplay();
}

// Game Loop
function gameTick() {
    game.year++;
    growSeaweed();
    if (Math.random() < 0.3) handleRandomEvent();
    if (Math.random() < 0.2) triggerQuiz();
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('score').textContent = game.score;
    document.getElementById('year').textContent = game.year;
    document.getElementById('co2').textContent = game.co2;
}

function checkAchievements() {
    if (game.co2 >= 100 && !game.achievements.has('Carbon Hero')) {
        game.addAchievement('Carbon Hero!');
    }
    if (game.year >= 5 && !game.achievements.has('Veteran Farmer')) {
        game.addAchievement('Veteran Farmer!');
    }
}

// Start Game
document.addEventListener('DOMContentLoaded', () => {
    gameInterval = setInterval(gameTick, 5000);
    document.getElementById('seaweed-bed').onclick = growSeaweed;
});

// Enable smooth animations
requestAnimationFrame(() => {
    document.querySelectorAll('.seaweed').forEach(seaweed => {
        seaweed.style.animation = 'sway 2s infinite alternate';
    });
});
