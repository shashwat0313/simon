const colorlist = ["green", "red", "blue", "yellow"];
const gamePattern = [];
const userPattern = [];
let level = 0;

function reset() {
    userPattern.length = gamePattern.length = level = 0;
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    const x = new Audio("sounds/wrong.mp3");
    x.play();
    $("h1").html("You Lost! Press any key to start over.");
}

$(document).on("keydown", (Key) => {
    if (level == 0) {
        level++;
        $("h1").html("Level 1");
        setTimeout(() => {
            nextSequence();
        }, 500);
    }
    else return;
});

function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userPattern.length == gamePattern.length) {
            setTimeout(() => {
                userPattern.length = 0;
                nextSequence();
            }, 1000);
        }
    }
    else {
        reset();
    }
}

function press(color) {
    $("." + color).addClass("pressed");
    setTimeout(() => {
        $("." + color).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    let r = Math.floor(Math.random() * 4);
    let randomColor = colorlist[r];
    gamePattern.push(randomColor);
    playSound(randomColor);
    press(randomColor);
    $("h1").html("Level " + level);
}

$(".btn").click((e) => {
    if(level==0){
        return;
    }
    let userChosenColor = e.target.id;
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    press(userChosenColor);
    checkAnswer(userPattern.length - 1);
})

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}