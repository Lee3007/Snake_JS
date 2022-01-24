var boardSize = 625

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

//In Progress
function initControls(){
    //based on this
    document.addEventListener('keydown', function(event) {
        if(event.key == 'ArrowLeft') {
            alert('Left was pressed');
        }
        else if(event.key == 'ArrowRight') {
            alert('Right was pressed');
        }
    });


}

function initGameBoard(){

    gameBoard = new Array(25).fill(0);

    for( i=0 ; i<25 ; i++){
        gameBoard[i] = new Array(25).fill(0);
    }

}


function initGame(){

    snake = {
        name: 'snake',
        size: 2,
        direction: 'r',
        body: [],

    }
    arr = [12 , 12];
    snake.body.push(arr);
    arr = [11 , 12];
    snake.body.push(arr);

    initGameBoard();
    initBoardDOM(boardSize);
    update();


}

function cleanBoard(){
    
    for(let i=0; i<25; i++){
        for(let j=0; j<25; j++){
            gameBoard[i][j] = 0;
        }
    }
    
}

function update(){

    cleanBoard();

    for( k in snake.body){
        coord = snake.body[k];
        y = coord[0];
        x = coord[1];
        gameBoard[x][y] = 1;
    }


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




initGame();

// setInterval(() => {

// }, 1000);

