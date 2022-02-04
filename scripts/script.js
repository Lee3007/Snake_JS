var boardSize = 625
var keyBuffer = [];
var previousHighScore = localStorage.getItem('previousHighScore');

previousHighScoreDOM = document.querySelector("#previousHighScore");
currentScoreDOM = document.querySelector("#currentScore");

//initialize the graphical part of the board, on the HTML document (creates all the cells)
function initBoardDOM(boardSize) {

    board = document.querySelector('#board');

    for (let i = 0; i < boardSize; i++) {
        stringI = i.toString();
        cell = document.createElement('div');
        cell.setAttribute('id', stringI);
        cell.setAttribute('class', 'cell');
        board.appendChild(cell);
    }

}

//Initialize the controls to move the snake (to add keystrokes to the buffer)
function initControls() {

    document.addEventListener('keydown', function (event) {

        if (event.key == 'ArrowLeft' && keyBuffer[keyBuffer.length - 1] !== 'l') {
            keyBuffer.push('l');
        }

        else if (event.key == 'ArrowRight' && keyBuffer[keyBuffer.length - 1] !== 'r') {
            keyBuffer.push('r');
        }

        else if (event.key == 'ArrowUp' && keyBuffer[keyBuffer.length - 1] !== 'u') {
            keyBuffer.push('u');
        }

        else if (event.key == 'ArrowDown' && keyBuffer[keyBuffer.length - 1] !== 'd') {
            keyBuffer.push('d');
        }

    });

}

//Processes Keystrokes stored in the buffer (changing snakes direction)
function processKeyFromBuffer() {

    let key = keyBuffer.shift();

    if (key === 'r' && snake.direction !== 'l') {
        snake.direction = 'r';
    }
    else if (key === 'l' && snake.direction !== 'r') {
        snake.direction = 'l';
    }
    else if (key === 'u' && snake.direction !== 'd') {
        snake.direction = 'u';
    }
    else if (key === 'd' && snake.direction !== 'u') {
        snake.direction = 'd';
    }

}

//Initialize the game board inside JS as a matrix 25x25 full of 0's
function initGameBoard() {

    gameBoard = new Array(25).fill(0);

    for (let i = 0; i < 25; i++) {
        gameBoard[i] = new Array(25).fill(0);
    }

}

//Returns a random number <= than max, >= min
function getRandNumBetween(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}

//initializes the game, calling the other functions to initialize. Also creates the snake and the fruit
function initGame() {

    snake = {
        name: 'Snek',
        size: 12,
        direction: 'r',
        body: [],

        eatFruit: function () {
            increaseX = snake.body[snake.size - 1][1] - snake.body[snake.size - 2][1];
            increaseY = snake.body[snake.size - 1][0] - snake.body[snake.size - 2][0];

            newX = snake.body[snake.size - 1][1] + increaseX;
            newY = snake.body[snake.size - 1][0] + increaseY;

            arr = [newY, newX];
            snake.body.push(arr);

            snake.size += 1;
            fruit.pos = [getRandNumBetween(24, 0), getRandNumBetween(24, 0)];
        
            updateCurrentScore();
        }

    }

    //Creates the initial body of the snake
    for (let p = 12; p > 0; p--) {
        arr = [p, 12];
        snake.body.push(arr);
    }

    fruit = {
        pos: [4, 4],
        increaseSizeBy: 1,
    }

    initControls();
    initGameBoard();
    initBoardDOM(boardSize);

    putSnakeOnBoard();
    showEntitiesOnBoard();

    initLocalStorage();
}

//Cleans the board on JS (fills with 0)
function cleanBoard() {

    for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {

            if (gameBoard[i][j] !== 2)
                gameBoard[i][j] = 0;

        }
    }

}

//Inserts the snakes body on the gameBoard (matrix). 
function putSnakeOnBoard() {

    for (let k = 0; k < snake.size; k++) {
        y = snake.body[k][0];
        x = snake.body[k][1];
        gameBoard[x][y] = 1;
    }

}

//Shows graphically the snake, the cells and the fruit
function showEntitiesOnBoard() {

    for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {
            let index = j + 25 * i;

            if (gameBoard[i][j] === 0) {
                cell = document.getElementById(index);
                cell.classList.remove('cellsnake');
                cell.classList.remove('cellfruit');
                cell.classList.add('cell');
            }
            else if (gameBoard[i][j] === 1) {
                cell = document.getElementById(index);
                cell.classList.remove('cell');
                cell.classList.remove('cellfruit');
                cell.classList.add('cellsnake');
            }
            else {
                cell = document.getElementById(index);
                cell.classList.remove('cell');
                cell.classList.add('cellfruit');
            }

        }
    }

}

//Only used initially, to set the first fruit up. Inserts the fruit on the gameBoard (matrix). 
function putFruitOnBoard() {

    y = fruit.pos[0];
    x = fruit.pos[1];
    gameBoard[x][y] = 2;

}

//Makes the snake move (slithers): the head moves, and the body follows.
function slither() {

    for (let i = snake.size - 1; i > 0; i--) {
        snake.body[i] = snake.body[i - 1].slice();
    }

    switch (snake.direction) {
        case 'r':
            snake.body[0][0]++;
            break;

        case 'l':
            (snake.body[0][0])--;
            break;

        case 'u':
            (snake.body[0][1])--;
            break;

        case 'd':
            (snake.body[0][1])++;
            break;
    }

}

//Checks the collision between: the snake and the walls, the snake with its body and the snake with the fruit; respectively.
function collide() {

    snake.body.map((arr) => {
        if (arr[0] < 0) {
            arr[0] = 24;
        }

        if (arr[0] > 24) {
            arr[0] = 0;
        }

        if (arr[1] < 0) {
            arr[1] = 24;
        }

        if (arr[1] > 24) {
            arr[1] = 0;
        }

    });

    for (let i = 1; i < snake.size; i++) {
        for (let j = i + 1; j < snake.size; j++) {
            if (snake.body[i][1] === snake.body[j][1] && snake.body[i][0] === snake.body[j][0]) {
                document.location.reload(true);
            }

        }

    }

    snake.body.forEach((arr) => {

        if (arr[1] === fruit.pos[1] && arr[0] === fruit.pos[0]) {
            snake.eatFruit();
        }

    });

}

//Initializes Local Storage
function initLocalStorage(){

    previousHighScore = previousHighScore === null ? 0 : previousHighScore;
    previousHighScoreDOM.innerText = `Previous High Score: ${previousHighScore}`;

}

//Shows on screen how many fruits the snake has currently eaten
function updateCurrentScore(){

    currentScoreDOM.innerText = `Current Score: ${snake.size-12}`;
    updatePreviousHighScore();

}

function updatePreviousHighScore(){

    previousHighScore = previousHighScore < snake.size-12 ? snake.size-12 : previousHighScore;
    localStorage.setItem('previousHighScore', previousHighScore);

    previousHighScoreDOM.innerText = `Previous High Score: ${previousHighScore}`; 

}

//function called to update the game every 90 miliseconds
function update() {

    processKeyFromBuffer();
    slither();
    collide();
    cleanBoard();
    putSnakeOnBoard();
    showEntitiesOnBoard();
    putFruitOnBoard();
    // console.log(previousHighScore);

}

initGame();
setInterval(update, 90);