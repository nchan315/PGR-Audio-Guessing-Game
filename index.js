const gameData = {
    "Kamui: Bastion": "Bastion BA.mp3",
    "Ayla: Brilliance": "Brilliance BA.mp3",
    "Liv: Eclipse": "Eclipse BA.mp3",
    "Lucia: Lotus": "Lotus BA.mp3",
    "Watanabe: Nightblade": "Nightblade BA.mp3",
    "Nanami: Storm": "Storm BA.mp3",
    "Bianca: Zero": "Zero BA.mp3"
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

function startGame() {
    let button = document.getElementById("start");
    button.style.visibility = "hidden";

    choice0.style.display = "block";
    choice1.style.display = "block";
    choice2.style.display = "block";
    choice3.style.display = "block";

    nextQuestion();
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
    // playAudio();
}

function displayOptions(optionsArray) {
    let optionsArr = scrambleArray(optionsArray);
    for (let i = 0; i < numChoices; i++) {
        console.log(optionsArr);
        choicesArr[i].textContent = optionsArr[i];
    }
}

function playAudio() {
    if (!currentAudio) {
        reset();
    }
    var audio = document.getElementById("myAudio");
    audio.play();
}

function checkCorrect() {
    // let input = document.getElementById("guess").value;
    // const value = parseInt(input);

    // let message = document.getElementById("guessResult");
    // if (isNaN(value)) {
    //     message.textContent = "Not a Number";
    // } else if (value < target) {
    //     message.textContent = "Guess too low";
    // } else if (value > target) {
    //     message.textContent = "Guess too high";
    // } else {
    //     message.textContent = "You got it!";
    //     reset();
    // }
}

function getNRandomNumbers(n) {
    let numbers = [];
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
}
