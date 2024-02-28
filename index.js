const gameData = {
    "Kamui: Bastion": "Bastion BA.mp3",
    "Ayla: Brilliance": "Brilliance BA.mp3",
    "Liv: Eclipse": "Eclipse BA.mp3",
    "Lucia: Lotus": "Lotus BA.mp3",
    "Watanabe: Nightblade": "Nightblade BA.mp3",
    "Nanami: Storm": "Storm BA.mp3",
    "Bianca: Zero": "Zero BA.mp3"
}

let currentAudio = 0;
let currentChar = 0;

function reset() {
    const charKeys = Object.keys(gameData);
    const randomIndex = Math.floor(Math.random() * charKeys.length);
    currentChar = charKeys[randomIndex];
    currentAudio = gameData[currentChar];
}

function playAudio() {
    // TODO: extract out into a "Start Game button"
    if (!currentAudio) {
        reset();
    }
    var audio = document.getElementById("myAudio");
    audio.play();
}

function guess() {
    let input = document.getElementById("guess").value;
    const value = parseInt(input);

    let message = document.getElementById("guessResult");
    if (isNaN(value)) {
        message.textContent = "Not a Number";
    } else if (value < target) {
        message.textContent = "Guess too low";
    } else if (value > target) {
        message.textContent = "Guess too high";
    } else {
        message.textContent = "You got it!";
        reset();
    }
}