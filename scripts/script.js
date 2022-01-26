var boardSize = 625

//initialize the graphical part of the board, on the HTML document
function initBoardDOM(boardSize){
    board = document.querySelector('#board');

    for( i=0 ; i<boardSize ; i++){
        stringI = i.toString();
        cell = document.createElement('div');
        cell.setAttribute('id', stringI);
        cell.setAttribute('class', 'cell');
        board.appendChild(cell);
    }

}

//Initialize the controls to move the snake
function initControls(){

    document.addEventListener('keydown', function(event) {

        if(event.key == 'ArrowLeft') {
            if(snake.direction !== 'r'){
                snake.direction = 'l';
            }
        }

        else if(event.key == 'ArrowRight') {
            if(snake.direction !== 'l'){
                snake.direction = 'r';
            }
        }

        else if(event.key == 'ArrowUp') {
            if(snake.direction !== 'd'){
                snake.direction = 'u';
            }
        }

        else if(event.key == 'ArrowDown') {
            if(snake.direction !== 'u'){
                snake.direction = 'd';
            }
        }

    });

}

//Initialize the game board inside JS as a matrix 25x25 full of 0's
function initGameBoard(){

    gameBoard = new Array(25).fill(0);

    for( i=0 ; i<25 ; i++){
        gameBoard[i] = new Array(25).fill(0);
    }

}

function getRandNumBetween(max, min){
    return Math.random() * (max - min) + min;
}

//initialize the game, calling the other functions to initialize
function initGame(){

    snake = {
        name: 'Snek',
        size: 3,
        direction: 'r',
        body: [],
        eatFruit : function(){
            increaseX = snake.body[snake.size-1][1] - snake.body[snake.size-2][1];
            increaseY = snake.body[snake.size-1][0] - snake.body[snake.size-2][0];
            newX = snake.body[snake.size-1][1] + increaseX;
            newY = snake.body[snake.size-1][0] + increaseY;
            arr = [newY, newX];
            snake.body.push(arr);
            snake.size += 1;
            fruit.pos = [ getRandNumBetween(25, 0), getRandNumBetween(25, 0) ];

        }
    }
    arr = [12 , 12];
    snake.body.push(arr);
    arr = [11 , 12];
    snake.body.push(arr);
    arr = [10 , 12];
    snake.body.push(arr);

    fruit = {
        pos: [],
        increaseSizeBy: 1,
    }

    initControls();
    initGameBoard();
    initBoardDOM(boardSize);

    putSnakeOnBoard();
    showSnakeOnBoard();

}

//Cleans the board on JS (fills with 0)
function cleanBoard(){
    
    for(let i=0; i<25; i++){
        for(let j=0; j<25; j++){
            if(gameBoard[i][j] !== 2)
                gameBoard[i][j] = 0;
        }
    }
    
}

function putSnakeOnBoard(){

    for( k in snake.body){
        y = snake.body[k][0];
        x = snake.body[k][1];
        gameBoard[x][y] = 1;
    }
}

function showSnakeOnBoard(){
    for(let i=0 ; i<25 ; i++){
        for(let j=0; j<25; j++){

            let index = j + 25 * i;
            
            if(gameBoard[i][j] === 0){
                cell = document.getElementById(index);
                cell.classList.remove('cellsnake');
                cell.classList.add('cell');
            }
            else{
                cell = document.getElementById(index);
                cell.classList.remove('cell');
                cell.classList.add('cellsnake');
            }
                

        }
    }
}

function slither(){

    switch (snake.direction) {
        case 'r':
            (snake.body[0][0])++;
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
    // console.log(snake.body);
    for(i=snake.size; i>0; i--){
        snake.body[i] = snake.body[i-1].slice();
    }

}

function collide(){

    snake.body.map( (arr)=>{
        if( arr[0] < 0 ){
            arr[0] = 24;
        }

        if( arr[0] > 24 ){
            arr[0] = 0;
        }

        if( arr[1] < 0 ){
            arr[1] = 24;
        }

        if( arr[1] > 24 ){
            arr[1] = 0;
        }

    });

    snake.body.forEach( (arr) => {

        if( arr[1] === fruit.pos[1] && arr[0] === fruit.pos[0] ){
            snake.eatFruit();
        }

    });

}

// function eatFruit(){}

//function called to update the game every couple of seconds (still to be determined)
function update(){

    slither();
    collide();
    cleanBoard();
    putSnakeOnBoard();
    showSnakeOnBoard();

    // console.log(gameBoard);

}




initGame();
// setTimeout( teste, 1000);


// function teste(){

//     update();
//     setTimeout(update, 500);
//     setTimeout(update, 1000);
//     setTimeout(update, 1500);
    

// }
setInterval(update, 500);