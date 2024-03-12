const gameData = {
    // "Chrome: Arclight": "audio/Arclight BA.mp3",
    // "Watanabe: Astral": "audio/Astral BA.mp3",
    // "Kamui: Bastion": "audio/Bastion BA.mp3",
    // "Karenina: Blast": "audio/Blast BA.mp3",
    // "Ayla: Brilliance": "audio/Brilliance BA.mp3",
    // "Alpha: Crimson Abyss": "audio/Crimson Abyss BA.mp3",
    // "Camu: Crocotta": "audio/Crocotta BA.mp3",
    // "Lucia: Dawn": "audio/Dawn BA.mp3",
    // "Liv: Eclipse": "audio/Eclipse BA.mp3",
    // "Karenina: Ember": "audio/Ember BA.mp3",
    // "Lee: Entropy": "audio/Entropy BA.mp3",
    // "Lucia: Lotus": "audio/Lotus BA.mp3",
    // "Liv: Luminance": "audio/Luminance BA.mp3",
    // "Liv: Lux": "audio/Lux BA.mp3",
    // "Watanabe: Nightblade": "audio/Nightblade BA.mp3",
    // "Lee: Palefire": "audio/Palefire BA.mp3",
    // "Lucia: Plume": "audio/Plume BA.mp3",
    // "Nanami: Pulse": "audio/Pulse BA.mp3",
    // "Rosetta: Rigor": "audio/Rigor BA.mp3",
    // "Vera: Rozen": "audio/Rozen BA.mp3",
    // "Sophia: Silverfang": "audio/Silverfang BA.mp3",
    "Nanami: Storm": "audio/Storm BA.mp3",
    "Kamui: Tenebrion": "audio/Tenebrion BA.mp3",
    "Bianca: Veritas": "audio/Veritas BA.mp3",
    "Bianca: Zero": "audio/Zero BA.mp3"
}
const charKeys = Object.keys(gameData);
const numOptions = charKeys.length;

let currentAudio = 0;
let currentChar = 0;

const choice0 = document.getElementById("choice0");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const choicesArr = [choice0, choice1, choice2, choice3];
const numChoices = choicesArr.length;

let timed = false;
let startTime = 0;
let timerRunning = false;
let penalty = 0;
const timePenalty = 5000;

let seen = [];
let attempts = 0;
let correct = 0;
let questions = 0;

const debug = document.getElementById("debug");

function startGame() {
    let button = document.getElementById("start");
    button.style.visibility = "hidden";
    let button1 = document.getElementById("startTimed");
    button1.style.visibility = "hidden";

    choice0.style.display = "block";
    choice1.style.display = "block";
    choice2.style.display = "block";
    choice3.style.display = "block";

    nextQuestion();
}

function startGameTimed() {
    timed = true;
    startTimer();
    startGame();
}

function updateTimer() {
    let timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = getElapsedTime();
}

function startTimer() {
    if (!timerRunning) {
        startTime = new Date().getTime();
        setInterval(updateTimer, 10);
        timerRunning = true;
    }
}

function stopTimer() {
    if (timerRunning) {
        timerRunning = false;
    }
}

function getElapsedTime() {
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime + penalty;

    let min = Math.floor(elapsedTime / (1000 * 60));
    let sec = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let ms = elapsedTime % 1000;

    let timeOnDisplay = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    return timeOnDisplay;
}

function nextQuestion() {
    const options = getNRandomNumbers(numChoices);
    currentChar = charKeys[options[0]];
    currentAudio = gameData[currentChar];

    let option1 = charKeys[options[1]];
    let option2 = charKeys[options[2]];
    let option3 = charKeys[options[3]];

    optionsArray = [currentChar, option1, option2, option3];
    displayOptions(optionsArray);
    playAudio();
}

function displayOptions(optionsArray) {
    let optionsArr = scrambleArray(optionsArray);
    for (let i = 0; i < numChoices; i++) {
        choicesArr[i].innerText = optionsArr[i];
    }
}

function playAudio() {
    let audio = document.getElementById("audio");
    let source = document.getElementById("audioSource");
    source.src = currentAudio;
    audio.load();
    audio.play();
}

function checkCorrect(input) {
    let guess = choicesArr[input].innerText;
    let result = document.getElementById("guessResult");
    if (guess === currentChar) {
        result.innerText = "Correct!";
        let next = document.getElementById("next");
        next.style.visibility = "visible";
        next.style.display = "block";
        if (attempts == 0) {
            correct++;
        }
        attempts = 0;
        if (questions + 1 == numOptions) {
            next.innerText = "Done";
        }
    } else {
        attempts++;
        result.innerText = "Incorrect!";
        if (timed) {
            penalty += timePenalty;
        }
    }
}

function next() {
    questions++;
    document.getElementById("next").style.visibility = "hidden";
    document.getElementById("guessResult").innerText = "";

    if (questions == numOptions) {
        endGame();
        return;
    }
    
    nextQuestion();
}

function endGame() {
    if (timed) {
        stopTimer();

        document.getElementById("timer").style.visibility = "hidden";
    }
    for (let i = 0; i < numChoices; i++) {
        choicesArr[i].style.visibility = "hidden";
    }

    let button = document.getElementById("start");
    button.style.visibility = "visible";
    button.style.display = "block";
    let button1 = document.getElementById("startTimed");
    button1.style.visibility = "visible";
    button1.style.display = "block";

    displayScore();
    // TODO: bug where not able to play again
}

function displayScore() {
    let scoreLabel = document.getElementById("score");
    scoreLabel.innerText = "Score: " + correct + "/" + questions;

    if (timed) {
        scoreLabel.innerText += "\nTime: " + getElapsedTime();
    }
}

function getNRandomNumbers(n) {
    let numbers = [];
    while (numbers.length == 0) {
        let randomNum = Math.floor(Math.random() * numOptions);
        if (!seen.includes(randomNum)) {
            numbers.push(randomNum);
            seen.push(randomNum);
            continue;
        }
    }
    while (numbers.length < n) {
        let randomNum = Math.floor(Math.random() * numOptions);
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        }
    }
    return numbers;
}

function scrambleArray(array) {
    const i = Math.floor(Math.random() * array.length);
    [array[i], array[0]] = [array[0], array[i]];
    return array;
}
