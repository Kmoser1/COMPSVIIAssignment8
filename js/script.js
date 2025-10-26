console.log("script.js connected!");

// Initialize object to store user's answers.
const userAnswers = {};

// Function to handle answer button clicks.
function handleAnswerClick(event) {
    const button = event.currentTarget;

    // had to do a lot of troubleshooting to get this.
    // For a long time I was trying to get the id from the question-blocks and that was messing everything up.
    // In reality the id is in the layer above the question-blocks.
    const questionBlock = button.closest('div[id^="question-"]');
    const questionId = questionBlock.id; // 'question-1' etc
    
    // Remove 'selected' class from all answers in this question
    const answerButtons = questionBlock.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Add 'selected' class to the clicked button
    button.classList.add('selected');

    // Store answer.
    userAnswers[questionId] = button.getAttribute('data-answer');

    // Debug
    console.log(`Stored answer for ${questionId}: ${userAnswers[questionId]}`);
    console.log('Current answers:', userAnswers);
}

// Function to calculate total score based on answers.
// Yes, this is terribly unoptimized. No, I will not fix it now.
function calculateScore() {

    let totalScore = 0;
    
    let q2 = Math.floor(Math.random() * 10);

    for (const questionId in userAnswers) {
        const answer = userAnswers[questionId];

        // map answer IDs to points
        switch (answer) {
            case '1A': totalScore += 1; break;
            case '1B': totalScore += 2; break;
            case '1C': totalScore += 2; break;
            case '1D': totalScore += 8; break;
            case '1E': totalScore += 2; break;
            case '1F': totalScore += 2; break;
            
            case '2A': 
                if (q2 == 0) {totalScore += 60}
                else totalScore -= 20;
                break;
            case '2B':
                if (q2 == 1) {totalScore += 60}
                else totalScore -= 20;
                break;
            case '2C':
                if (q2 == 2) {totalScore += 60}
                else totalScore -= 20;
                break;
            case '2D':
                if (q2 == 3) {totalScore += 60}
                else totalScore -= 20;
                break;
            case '2E':
                if (q2 == 4) {totalScore += 60}
                else totalScore -= 20;
                break;
            case '2F':
                if (q2 == 5) {totalScore += 60}
                else totalScore -= 20;
                break;
            case '2G':
                if (q2 == 6) {totalScore += 60}
                else totalScore -= 20;
                break;
            case '2H':
                if (q2 == 7) {totalScore += 60}
                else totalScore -= 20;
                break;
            case '2I':
                if (q2 == 8) {totalScore += 60}
                else totalScore -= 20;
                break;
            case '2J':
                if (q2 == 9) {totalScore += 60}
                else totalScore -= 20;
                break;

            case '3A': totalScore += 2; break;
            case '3B': totalScore += 4; break;
            case '3C': totalScore += 6; break;
            
            case '4A': totalScore += 6; break;
            case '4B': totalScore += 4; break;
            case '4C': totalScore += 2; break;
            
            case '5A': totalScore += 4; break;
            case '5B': totalScore += 6; break;
            case '5C': totalScore += 8; break;
            case '5D': totalScore += 10; break;
            
            case '6A': totalScore += 10; break;
            case '6B': totalScore += 8; break;
            case '6C': totalScore += 6; break;
            case '6D': totalScore += 4; break;
            default: break;
        }
    }
    return totalScore;
}

// Function to determine car model
function determineCarModel(score) {
    console.log(score)
    if (score == 100) {
        return "You are a Mitsubishi Starion.";
    } else if (score <= 10) {
        return "You are a Mitsubishi Cordia.";
    } else if (score <= 15) {
        return "You are a Mitsubishi Tredia.";
    } else {
        return "You are a Mitsubishi Pajero.";
    }
}

// display result
function displayResult() {
    const totalScore = calculateScore();
    const resultText = determineCarModel(totalScore);
    const resultContainer = document.getElementById('result-container');
    const resultParagraph = document.getElementById('result-text');

    resultParagraph.textContent = resultText;
    resultContainer.style.display = 'block';
}

// Set up event listeners after DOM content is loaded
// (had to refer to the documentation for this one)
document.addEventListener('DOMContentLoaded', () => {
    
    // Select all question blocks
    const questionBlocks = document.querySelectorAll('.question-block');

    questionBlocks.forEach(block => {
        const answerButtons = block.querySelectorAll('.answer-btn');
        answerButtons.forEach(btn => {
            btn.addEventListener('click', handleAnswerClick);
        });
    });

    // Set up "Show Results" button
    const showResultsBtn = document.getElementById('show-result');
    showResultsBtn.addEventListener('click', displayResult);
    
});