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
const menubtns = document.querySelector('#menu-btns')
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
const minutesSelect = document.querySelector('#minutes-select');
const countdown = document.querySelector('#countdown');
const endGameStatsContainer = document.querySelector('#endgame-stats-container');
const totalShotsStat = document.querySelector('#total-shots');
const totalMissesStat = document.querySelector('#total-misses');
const accuracyStat = document.querySelector('#accuracy-stat')
const totalPointsStat = document.querySelector('#total-points')


// const audio = new Audio('audio/firecracker.mp3')
const audioArray = []
createAudioArray()
function createAudioArray() {
    for (let i = 0; i < 5; i++) {
        const newAudioObj = {
            audio: new Audio('audio/firecracker.mp3'),
            isPlaying: false
        }
        audioArray.push(newAudioObj)
    }
}

var playTargetAudio = function() {
    audioArray[audioNum].audio.play();
    audioNum === 4 ? (audioNum = 0) : (audioNum += 1)
}

var setDisplayToDefualt = function(element) {
    element.classList.remove('display-off')
}
//Sets display to None
var setDisplayToNone = function(element) {
    element.classList.add('display-off')
}
//generates random number from 0 - highest number of targets that can fit in the screensize
var getRandomNum = function(highestNumber) {
    return Math.floor(Math.random() * (highestNumber - 0)) + 0
}
//calculate accuracy
var setAccuracy = function() {
    accuracy = (targetsHit / totalShots) * 100;
    accuracy = (accuracy.toString()).slice(0, 4)
    accuracyPercent.textContent = accuracy
}
var setScore = function() {
    scoreInt += 1000 * (accuracy / 100);
    score.textContent = scoreInt
}
//Sets the minutes and seconds
var setMinNSec = function() {
    minutesObj.textContent = minutes
    secondsObj.textContent = seconds
}
var setEndGameStats = function() {
    totalShotsStat.textContent = totalShots;
    totalMissesStat.textContent = totalShots - targetsHit;
    accuracyStat.textContent = accuracy;
    totalPointsStat.textContent = scoreInt
}
//Recursive Timer Function
var startTimer = function() {
    if (seconds === 0 && minutes === 0) {
        inPlay = false; 
        let audioObjStop = new Audio('audio/go.mp3')
        audioObjStop.play()
        countdown.textContent = 'STOP!'
        setDisplayToDefualt(countdown)
        setEndGameStats()
        setTimeout(() => {
            setDisplayToNone(countdown)
            main.classList.add('blur-effect')
            setTimeout(() => {
                setDisplayToDefualt(endGameStatsContainer)
                endGameStatsContainer.classList.add('display-flex')
            }, 1000);
        },1000);
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
var startCountdownandTimer = function() {
    setDisplayToDefualt(countdown)
    let audioObj = new Audio('audio/countdown.mp3')
    let audioObjGo = new Audio('audio/go.mp3')
    audioObj.volume = .2;
    audioObjGo.volume = .4;
    audioObj.play()
    setTimeout(() => {
        let currentTime = parseInt(countdown.textContent);
        countdown.textContent = currentTime - 1;
        audioObj.play()
        setTimeout(() => {
            let currentTime = parseInt(countdown.textContent);
            countdown.textContent = currentTime - 1;
            audioObj.play()
            setTimeout(() => {
                countdown.textContent = 'GO!';
                audioObjGo.play()
                setTimeout(() => {
                    inPlay = true;
                    setDisplayToNone(countdown)
                    minutes = 0;
                    seconds = 1;
                    minutesObj.textContent = minutes;
                    secondsObj.textContent = '00';
                    startTimer();
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}
//Set the targets top and left
var resetLocation = function(element, numOfCols, numOfRows) {
    element.style.top = (`${getRandomNum(numOfRows) * targetDiameter}px`)
    element.style.left = (`${getRandomNum(numOfCols) * targetDiameter}px`)
}
//creates/appends game targets and generates event listeners for game mechanics
var startGame = function() {
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
                playTargetAudio()
                totalShots += 1;
                targetsHit += 1;
                setAccuracy()
                setScore()
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
        setAccuracy()
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

for (let element of menubtns.children) {
    element.firstElementChild.addEventListener('mouseenter', () => {
        let audioObj = new Audio('audio/menubtn.mp3')
        audioObj.volume = .05;
        audioObj.play()
    })
}
