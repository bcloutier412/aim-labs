let targetDiameter = 50;

const menu = document.querySelector('menu');
const startBtn = document.querySelector('#start-btn');
const targetSizeBtn = document.querySelector('#target-size-btn');
const main = document.querySelector('main');

//Sets display to None
function setDisplayToNone(element) {
    element.classList.add('display-off')
}
function getRandomNum(highestNumber) {
    return Math.floor(Math.random() * (highestNumber - 0)) + 0
}
function startGame() {
    const numOfCols = Math.floor(window.innerWidth / targetDiameter)
    const numOfRows = Math.floor(window.innerHeight / targetDiameter)
    for (let i = 0; i < 7; i++) {
        const newTarget = document.createElement('div')
        newTarget.classList.add('target')
        main.appendChild(newTarget)
        console.dir(newTarget)
        //Set the targets top and left
        newTarget.style.top(`${getRandomNum(numOfRows) * targetDiameter}px`)
        newTarget.style.left(`${getRandomNum(numOfCols) * targetDiameter}px`)
    }
}
startBtn.addEventListener('click', () => {
    setDisplayToNone(menu)
    startGame()
})


