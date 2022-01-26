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

//initialize the game, calling the other functions to initialize
function initGame(){

    snake = {
        name: 'Snek',
        size: 3,
        direction: 'r',
        body: [],

    }
    arr = [12 , 12];
    snake.body.push(arr);
    arr = [11 , 12];
    snake.body.push(arr);
    arr = [10 , 12];
    snake.body.push(arr);

    

    initControls();
    initGameBoard();
    initBoardDOM(boardSize);

    cleanBoard();
    putSnakeOnBoard();
    showSnakeOnBoard();

}

//Cleans the board on JS (fills with 0)
function cleanBoard(){
    
    for(let i=0; i<25; i++){
        for(let j=0; j<25; j++){
            gameBoard[i][j] = 0;
        }
    }
    
}

function putSnakeOnBoard(){
    k=0;
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
    console.log(snake.body);
    for(i=snake.size-1; i>0; i--){
        snake.body[i] = snake.body[i-1].slice();
    }

}

//function called to update the game every couple of seconds (still to be determined)
function update(){

    slither();
    cleanBoard();
    putSnakeOnBoard();
    showSnakeOnBoard();
    console.log(gameBoard);

}




initGame();
update();
setTimeout(update, 500);
setTimeout(update, 1000);
setTimeout(update, 1500);
// setInterval(update, 500);