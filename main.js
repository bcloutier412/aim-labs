const targetGap = 3
let targetDiameter = 48 + targetGap;
let targetColor = '#ff4d6d';
let totalShots = 0;
let targetsHit = 0;
let scoreInt = 0;
let accuracy = 0;
let minutes = 1;
let seconds = '00';
let inPlay = false;
let audioNum = 0;

const menu = document.querySelector('menu');
const startBtn = document.querySelector('#start-btn');
const targetSizeBtn = document.querySelector('#target-size-btn');
const main = document.querySelector('main');
const gameStats = document.querySelector('#game-stats');
const targetSizeSelect = document.querySelector('#target-size-select');
const colorPicker = document.querySelector('#color');
const accuracyPercent = document.querySelector('#accuracy');
const score = document.querySelector('#score');
const minutesObj = document.querySelector('#minutes');
const secondsObj = document.querySelector('#seconds');
const minutesSelect = document.querySelector('#minutes-select')
const countdown = document.querySelector('#countdown');
// const audio = new Audio('audio/firecracker.mp3')
const audioArray = []
createAudioArray()
function createAudioArray() {
    for (let i = 0; i < 7; i++) {
        const newAudioObj = {
            audio: new Audio('audio/firecracker.mp3'),
            isPlaying: false
        }
        audioArray.push(newAudioObj)
    }
}

function playAudio() {
    audioArray[audioNum].audio.play();
    if (audioNum === 6) {
        audioNum = 0;
    } else {
        audioNum += 1;
    }
}

function setDisplayToDefualt(element) {
    element.classList.remove('display-off')
}
//Sets display to None
function setDisplayToNone(element) {
    element.classList.add('display-off')
}
//generates random number from 0 - highest number of targets that can fit in the screensize
function getRandomNum(highestNumber) {
    return Math.floor(Math.random() * (highestNumber - 0)) + 0
}
//calculate accuracy
function calcAccuracy() {
    accuracy = (targetsHit / totalShots) * 100;
    accuracy = (accuracy.toString()).slice(0, 4)
    accuracyPercent.textContent = `${accuracy}`
}
function calcScore() {
    scoreInt += 1000 * (accuracy / 100);
    score.textContent = scoreInt
}
//Sets the minutes and seconds
function setMinNSec() {
    minutesObj.textContent = minutes
    secondsObj.textContent = seconds
}
//Recursive Timer Function
function startTimer() {
    if (seconds === 0 && minutes === 0) {
        inPlay = false;
        countdown.style.left = '36%';
        countdown.textContent = 'STOP!'
        countdown.classList.remove('display-off');
        setTimeout(() => {
            countdown.classList.add('display-off');
        },1000)
        return
    } else if (seconds === 0) {
        setTimeout(() => {
            minutes -= 1;
            minutesObj.textContent = minutes;
            seconds = 59;
            secondsObj.textContent = seconds;
            startTimer()
        }, 1000)
    } else {
        setTimeout(() => {
            seconds -= 1;
            if (seconds < 10) {
                secondsObj.textContent = '0' + seconds;
            } else {
                secondsObj.textContent = seconds;
            }
            startTimer()
        }, 1000)
    }
}
//Countdown function (1....2....3....GO!)
function startCountdownandTimer() {
    countdown.classList.remove('display-off');
    setTimeout(() => {
        countdown.style.left = '47%';
        let currentTime = parseInt(countdown.textContent);
        countdown.textContent = currentTime - 1;
        setTimeout(() => {
            let currentTime = parseInt(countdown.textContent);
            countdown.textContent = currentTime - 1;
            setTimeout(() => {
                countdown.style.left = '42.1%';
                countdown.textContent = 'GO!';
                setTimeout(() => {
                    inPlay = true;
                    countdown.classList.add('display-off');
                    seconds = 0;
                    minutesObj.textContent = minutes;
                    secondsObj.textContent = '00';
                    startTimer();
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}
//Set the targets top and left
function resetLocation(element, numOfCols, numOfRows) {
    element.style.top = (`${getRandomNum(numOfRows) * targetDiameter}px`)
    element.style.left = (`${getRandomNum(numOfCols) * targetDiameter}px`)
}
//creates/appends game targets and generates event listeners for game mechanics
function startGame() {
    const numOfCols = Math.floor((window.innerWidth * .8) / targetDiameter)
    const numOfRows = Math.floor((window.innerHeight * .9) / targetDiameter)

    //create 7 initial targets
    for (let i = 0; i < 7; i++) {
        const newTarget = document.createElement('div')
        newTarget.classList.add('target')
        newTarget.style.height = `${targetDiameter - 2}px`
        newTarget.style.width = `${targetDiameter - 2}px`
        newTarget.style.background = targetColor;
        resetLocation(newTarget, numOfCols, numOfRows)
        //adding click event listener. Resets location of target and increases clicks.
        newTarget.addEventListener('click', function (e) {
            if (inPlay) {
                playAudio()
                totalShots += 1;
                targetsHit += 1;
                calcAccuracy()
                calcScore()
                resetLocation(this, numOfCols, numOfRows)
                e.stopPropagation();
            }
        })
        main.appendChild(newTarget)
    }
}


startBtn.addEventListener('click', () => {
    setDisplayToNone(menu)
    startGame()
    setMinNSec()
    startCountdownandTimer()
    setDisplayToDefualt(gameStats)
})

main.addEventListener('click', function (e) {
    if (inPlay) {
        totalShots += 1;
        calcAccuracy()
    }
})

targetSizeSelect.addEventListener("change", function () {
    if (this.value === 'hard') {
        targetDiameter = 28 + targetGap;
    }
    else if (this.value === 'medium') {
        targetDiameter = 48 + targetGap;
    }
    else if (this.value === 'easy') {
        targetDiameter = 68 + targetGap;
    }
})

colorPicker.addEventListener('input', () => {
    targetColor = colorPicker.value
})

minutesSelect.addEventListener('change', function () {
    if (this.value === '1') {
        minutes = 1;
    } else if (this.value === '2') {
        minutes = 2;
    } else if (this.value === '3') {
        minutes = 3;
    }
})