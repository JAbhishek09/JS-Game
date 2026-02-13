const board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start');
const restartButton = document.querySelector('.btn-restart')
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector(".start-game")
const gameOverModal = document.querySelector(".game-over")
const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");
const blockHeight = 50
const blockWidth = 50

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
//in javascript we cannot create 2d array directly like in other languages
const blocks = []; //this will be our 2d array at run time
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;
highScoreElement.textContent = highScore;
let score = 0;
let time = '00-00'
let snake = [{
    x: 1, y: 3
}
    // {
    //     x: 1, y:4
    // }, {
    //     x:1, y:5
    // }
]
let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols)
}
let direction = 'left'
var intervalId = null;
var timerIntervalid=null;
//by using below loop we are creating blocks dynamically div elements so that by css we can style them as per our need
// for(let i=0;i<rows*cols;i++){
//     const block=document.createElement('div'); 
//     block.classList.add('block');
//     board.appendChild(block);
// }
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        const block = document.createElement('div');
        block.classList.add('block');
        // block.innerText=`${r},${c}`;
        blocks[`${r},${c}`] = block;
        board.appendChild(block);
    }
}
function render() {
    blocks[`${food.x},${food.y}`].classList.add("food");
    let head = null
    if (direction === 'left') {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    }
    else if (direction === 'right') {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    }
    else if (direction === 'up') {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }
    else if (direction === 'down') {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols|| blocks[`${head.x},${head.y}`].classList.contains("fill")) {
        clearInterval(intervalId);
        // alert("GAME OVER");
        modal.style.display = "flex"
        startGameModal.style.display = "none"
        gameOverModal.style.display = "flex"
        return;
    }
    //food consumed logic
    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x},${food.y}`].classList.remove("food");
        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        }
        blocks[`${food.x},${food.y}`].classList.add("food");
        snake.push({
            x: food.x,
            y: food.y
        })
        score+=10
        scoreElement.textContent=score;
        if(score>highScore){
            highScore=score;
            localStorage.setItem("highScore",highScore.toString());
        }
    }
    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.remove("fill");
    })
    snake.unshift(head);
    snake.pop();
    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.add("fill")//we are adding class to the block


    })
}

startButton.addEventListener("click", () => {
    modal.style.display = "none"
    clearInterval(intervalId)
    timerIntervalid=setInterval(()=>{
        let [mins,sec]=time.split("-").map(Number);
        if(sec===59){
            mins+=1;
            sec=0;
        }
        else{
            sec+=1;
        }
        time=`${mins}-${sec}`;
        timeElement.textContent=time;

    }, 1000)

    intervalId = setInterval(() => {

        render();
    }, 500);
})
restartButton.addEventListener("click", restartGame)
function restartGame() {
    score=0;
    scoreElement.textContent=score;
    time='00-00'
    timeElement.textContent=time;
    highScoreElement.textContent=highScore;
    blocks[`${food.x},${food.y}`].classList.remove("food");
    snake.forEach(segment => {
        blocks[`${segment.x},${segment.y}`].classList.remove("fill");
    })
    direction = "down";
    modal.style.display = "none"
    snake = [{
        x: 1, y: 3
    }]
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    }
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        render();
    }, 500)

}
addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft'&& direction!=='right') {
        direction = 'left'
    }
    else if (e.key === 'ArrowRight'&& direction!=='left') {
        direction = 'right'
    }
    else if (e.key === 'ArrowUp'&& direction!=='down') {
        direction = 'up'
    }
    else if (e.key === 'ArrowDown'&& direction!=='up') {
        direction = 'down'
    }
}
)