const targetGap = 3
let targetDiameter = 48 + targetGap;

const menu = document.querySelector('menu');
const startBtn = document.querySelector('#start-btn');
const targetSizeBtn = document.querySelector('#target-size-btn');
const main = document.querySelector('main');
const gameStats = document.querySelector('#game-stats');
const targetSizeSelect = document.querySelector('#target-size-select');

function setDisplayToDefualt(element) {
    console.log('hello')
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
        resetLocation(newTarget, numOfCols, numOfRows)
        //adding click event listener. Resets location of target and increases clicks.
        newTarget.addEventListener('click', function (e) {
            resetLocation(this, numOfCols, numOfRows)
            e.stopPropagation();
        })
        main.appendChild(newTarget)
    }
}


startBtn.addEventListener('click', () => {
    setDisplayToNone(menu)
    startGame()
    setDisplayToDefualt(gameStats)
})

main.addEventListener('click', function(e) {
    console.log('hello')
})

targetSizeSelect.addEventListener("change", function () {
    if (this.value === 'hard') {
        targetDiameter = 28 + targetGap;
        console.log(targetDiameter)
    }
    else if (this.value === 'medium') {
        targetDiameter = 48 + targetGap;
    }
    else if (this.value === 'easy') {
        targetDiameter = 68 + targetGap;
    }
  })