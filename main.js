/*
GRID-SHOT
@desc: 
*/

// @desc All of the game variables
const targetGap = 3
let targetDiameter = 48 + targetGap;
let targetColor = '#24B7C2';
let totalShots = 0;
let targetsHit = 0;
let scoreInt = 0;
let accuracy = 0;
let minutes = 1;
let seconds = '00';
let inPlay = false;



// @desc: All of the DOM Selectors
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
const continueBtn = document.querySelector('#continue-btn');

/*
@desc: array that holds 5 audio objects. Will be iterated through to play the shooting sound
*/
const audioArray = []
// @desc: Counter to keep track of the idex of the current audioArray iteration
let audioNum = 0;
createAudioArray()

/*
@desc: Due to the nature of the Audio object... 
you must wait for the audio to end before playing again.
This function will create 5 Audio objects to use the .play method on.
This will eliminate the delay caused by the previous stated problem.
*/
function createAudioArray() {
    for (let i = 0; i < 5; i++) {
        const newAudioObj = {
            audio: new Audio('audio/firecracker.mp3'),
            isPlaying: false
        }
        newAudioObj.audio.volume = .2;
        audioArray.push(newAudioObj)
    }
}

/*
@desc: This function iterates through the "audioArray" and 
will execute the .play() method on the audioArray[Num] Audio object.
With every execution of this function, audioNum will increase by 1.
Once the index has reached the end of the array, audioNum will reset to 0
*/
var playTargetAudio = function() {
    audioArray[audioNum].audio.play();
    audioNum === 4 ? (audioNum = 0) : (audioNum += 1)
}

/*
@desc: clears the classList for the inputed element
@param: element = node object
*/
var setDisplayToDefault = function(element) {
    element.className = ''
}
/*
@desc: adds the 'display-off' class to the inputed element
@param: element = node object
*/
var setDisplayToNone = function(element) {
    element.classList.add('display-off')
}
/*
@desc: returns a random number between 0 and the 
inputed integer (highest number of rows or columns 
compatible with the screensize)

@param: num = highest integer of rows or columns compatible with the screensize... number)
*/
var getRandomNum = function(num) {
    return Math.floor(Math.random() * (num - 0)) + 0
}

/*
@desc: Calculates and changes the on-screen accuracy text based on targetsHit/totalShots
*/
var setAccuracy = function() {
    accuracy = (targetsHit / totalShots) * 100;
    accuracy = (accuracy.toString()).slice(0, 4)
    accuracyPercent.textContent = accuracy
}

/*
@desc: Calculates and changes the on-screen score text based on targetsHit/totalShots
*/
var setScore = function() {
    scoreInt += 1000 * (accuracy / 100);
    score.textContent = scoreInt
}

/*
@desc: Changes the on-screen minutes and seconds text to the variables initialized in the JS
*/
var setMinutesAndSeconds = function() {
    minutesObj.textContent = minutes
    secondsObj.textContent = seconds
}

/*
@desc: Matches the on-screen endgame stats text to JS variables
*/
var setEndGameStats = function() {
    totalShotsStat.textContent = totalShots;
    totalMissesStat.textContent = totalShots - targetsHit;
    accuracyStat.textContent = accuracy;
    totalPointsStat.textContent = scoreInt
}

/*
@desc: Recursive function to countdown from the initialized start time. 
If the timer gets to 0:00 the game is stopped and the endGameStats is displayed
Else if the seconds gets to 0... minutes decreases by 1 and seconds is set to 5
Else decrease seconds by 1 and if seconds is less than 10, concatenate '0' to the front to preserve the timer aesthetic
*/
var startTimer = function() {
    if (seconds === 0 && minutes === 0) {
        inPlay = false; 
        let audioObjStop = new Audio('audio/go.mp3')
        audioObjStop.play()
        countdown.textContent = 'STOP!'
        setDisplayToDefault(countdown)
        setEndGameStats()
        setTimeout(() => {
            setDisplayToNone(countdown)
            main.classList.add('blur-effect')
            setTimeout(() => {
                setDisplayToDefault(endGameStatsContainer)
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
/*
@desc: Countdown function (3...2...1...GO!) -> start game timer
once the count down function is done it starts the game timer and sets the inPlay variable to true
*/
var startCountdownAndTimer = function() {
    setDisplayToDefault(countdown)
    let audioObj = new Audio('audio/countdown.mp3')
    let audioObjGo = new Audio('audio/go.mp3')
    audioObj.volume = .2;
    audioObjGo.volume = .4;
    audioObj.play()
    setTimeout(() => {
        countdown.textContent = '2'
        audioObj.play()
        setTimeout(() => {
            countdown.textContent = '1'
            audioObj.play()
            setTimeout(() => {
                countdown.textContent = 'GO!';
                audioObjGo.play()
                setTimeout(() => {
                    inPlay = true;
                    setDisplayToNone(countdown)
                    seconds = 0;
                    minutesObj.textContent = minutes;
                    secondsObj.textContent = '00';
                    startTimer();
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}

/*
@desc: gives the inputed element an arbitrary location on the 
screen based on the total number of Cols and Rows
@param: element = The newly created target 
        numOfCols/numOfRows = the highest number of columns/rows 
        compatible with the screensize
*/
var resetLocation = function(element, numOfCols, numOfRows) {
    element.style.top = (`${getRandomNum(numOfRows) * targetDiameter}px`)
    element.style.left = (`${getRandomNum(numOfCols) * targetDiameter}px`)
}

/*
@desc: Creates 7 new targets and gives each of them an arbitrary 
location on the screen. Each of the target receives a click event
listener. When the target is clicked it will in order:
    play target hit audio
 -> increase totalShots/targetsHit
 -> calculate and reset the new Accuracy and Score
 -> gives the target a new arbitrary location on the screen

 Finally the new target is appended to the main container

*/
var startGame = function() {
    const numOfCols = Math.floor((window.innerWidth * .8) / targetDiameter)
    const numOfRows = Math.floor((window.innerHeight * .9) / targetDiameter)
    setDisplayToDefault(main)
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

/*
@desc: Removes all targets from the main container/DOM
*/
var removeAllTargets = function() {
    for (let i = main.childNodes.length - 1; i >= 0; i--) {
        main.removeChild(main.childNodes[i]);
    }
}

/*
@desc: Resets all the game variables so it is ready for another game to be played
*/
var resetGameVariables = function() {
    totalShots = 0;
    targetsHit = 0;
    scoreInt = 0;
    accuracy = 0;
    minutes = 1;
    seconds = '00';
    inPlay = false;
    audioNum = 0;
    countdown.textContent = '3'
    accuracyPercent.textContent = '0'
    score.textContent = '0'
}
/*
@desc: Turns off the end game stats and resets the entire page to the menu
*/
var resetToGameMenu = function() {
    removeAllTargets()
    setDisplayToDefault(endGameStatsContainer)
    setDisplayToNone(endGameStatsContainer)
    setDisplayToDefault(menu)
    setDisplayToNone(gameStats)
    setDisplayToDefault(main)
    resetGameVariables()
    setDisplayToNone(main)
}

startBtn.addEventListener('click', () => {
    setDisplayToNone(menu)
    startGame()
    setMinutesAndSeconds()
    startCountdownAndTimer()
    setDisplayToDefault(gameStats)
})

main.addEventListener('click', function (e) {
    if (inPlay) {
        totalShots += 1;
        playTargetAudio()
        setAccuracy()
    }
})

targetSizeSelect.addEventListener("change", function () {
    let difficulity = this.value
    if (difficulity === 'hard') {
        targetDiameter = 28 + targetGap;
    }
    else if (difficulity === 'medium') {
        targetDiameter = 48 + targetGap;
    }
    else if (difficulity === 'easy') {
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

continueBtn.addEventListener('click', resetToGameMenu)