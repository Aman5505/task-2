 // Define questions and prize levels
const questions = [
    {
        question: "Which of the following is the correct name of React.js?",
        options: ["React", "React.js", "ReactJS", "All of the above"],
        answer: 4 // All of the above (index 3)
    },
    {
        question: "  What of the following is used in React.js to increase performance?",
        options: ["Original DOM", "Virtual DOM", "Both A and B.", "None of the above."],
        answer: 2 // JavaScript is the correct answer (index 3)
    },
    {
        question: "Which of the following acts as the input of a class-based component?",
        options: ["Class", "Factory", "Render", "Props"],
        answer: 4  // All of the above (index 3)
    },
    {
        question: " Which of the following keyword is used to create a class inheritance?",
        options: ["Create", "Inherits", "Extends", "This"],
        answer: 3  // All of the above (index 3)
    },
    {
        question: "What is the default port where webpack-server runs?",
        options: ["3000", "8080", "3030", "6060"],
        answer: 2  // All of the above (index 3)
    },
    {
        question: " What is a state in React?",
        options: ["A permanent storage.", "Internal storage of the component.", "External storage of the component", "None of the above"],
        answer: 2 // All of the above (index 3)
    },
    {
        question: "   What are the two ways to handle data in React?",
        options: ["State & Props", "Services & Components", "State & Services", "State & Component"],
        answer: 1 // All of the above (index 3)
    },
    {
        question: "Does React.js create a VIRTUAL DOM in the memory",
        options: ["TRUE ", "FALSE ", " Can be true or false", "Cannot say "],
        answer: 1// All of the above (index 3)
    },
    {
        question: "  What does ES6 stand for?",
        options: ["ECMAScript 6", "ECMA 6 ", "ECMAJavaScript 6 ", "EJavaScript 6 "],
        answer: 1 // All of the above (index 3)
    },
    {
        question: " What is true for the keys given to a list of elements in React ?",
        options: ["Unique in the DOM ", "Unique among the siblings only. ", "Do not require to be unique ", "None of the above "],
        answer: 2 // All of the above (index 3)
    },
];

const prizeLevels = [
    "₹1,000", "₹2,000", "₹3,000", "₹5,000", "₹10,000",
    "₹20,000", "₹40,000", "₹80,000", "₹1,60,000", "₹3,20,000",
    "₹6,40,000", "₹12,50,000", "₹25,00,000", "₹50,00,000", "₹1,00,00,000"
];

// Game state variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let backgroundAudioPlayed = false; // To ensure audio plays only once

// Get audio elements
const backgroundAudio = document.getElementById('background-audio');
const optionSound = document.getElementById('option-sound');

// Function to initialize the game
function initGame() {
    updatePrizeLevel();
    showQuestion();
}

// Add an event listener to the "Start Game" button
document.getElementById('start-game').addEventListener('click', () => {
    playBackgroundAudioOnce(); // Play background audio on user interaction
    initGame();
});

// Function to play background audio only once
function playBackgroundAudioOnce() {
    if (!backgroundAudioPlayed) { // Check if the audio has already played
        backgroundAudio.play().then(() => {
            backgroundAudioPlayed = true; // Mark as played
        }).catch(error => {
            console.log('Audio play failed:', error);
        });
    }
}

// Start the timer for each question
function startTimer() {
    clearInterval(timer); // Clear any existing timer
    if (currentQuestionIndex < 5) {
        timeLeft = 30; // First 5 questions: 30 seconds
    } else if (currentQuestionIndex >= questions.length - 5) {
        timeLeft = 45; // Last 5 questions: 45 seconds
    } else {
        timeLeft = 30; // Default for all other questions
    }
     
    document.getElementById('timer').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! You've lost.");
            // Handle end game or reset here
        }
    }, 1000);
}

// Function to show the current question
function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElements = document.querySelectorAll('.option');
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElements.forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
        button.onmouseover = () => {
            optionSound.currentTime = 0;
            optionSound.play();
        };
        button.onclick = () => handleAnswer(index);
    });

    startTimer(); // Restart the timer for the new question
}

// Handle the user's answer selection
function handleAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctOption = currentQuestion.answer - 1; // Adjusted to zero-based index
    const optionsElements = document.querySelectorAll('.option');

    clearInterval(timer); // Stop the timer when an answer is selected

    if (selectedOption === correctOption) {
        optionsElements[selectedOption].classList.add('correct');
        score += 1000; // Increase score
        updatePrizeLevel();
    } else {
        optionsElements[selectedOption].classList.add('wrong');
        alert("Game Over! You've lost.");
        return; // Stop the game on a wrong answer
    }

    // Move to the next question after a delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            resetOptions();
            showQuestion();
        } else {
            alert("Congratulations! You've won the game.");
            clearInterval(timer); // Clear the timer if the game is won
        }
    }, 1000);
}

// Reset option buttons for the next question
function resetOptions() {
    document.querySelectorAll('.option').forEach(button => {
        button.classList.remove('correct', 'wrong');
    });
}

// Update the sidebar with the current prize level
function updatePrizeLevel() {
    const prizeList = document.querySelectorAll('#prize-list li');
    prizeList.forEach((li, index) => {
        li.classList.remove('active');
        if (index === prizeLevels.length - currentQuestionIndex - 1) {
            li.classList.add('active');
        }
    });
}
