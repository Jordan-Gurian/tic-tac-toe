const gameboard = (function() {
    let board = []

    const getBoard = () => board;
    const addMove = (index, symbol) => board[index] = symbol;

    const resetBoard = () => board = [];

    return { getBoard, addMove, resetBoard };
})();

function createPlayer(name) {   
    const symbol = ''

    let moves = [];
    const getMoves = () => moves;
    const setMoves = (index) => moves.push(index)
    const resetMoves = () => moves = [];
    
    let wins = 0;
    const getWins = () => wins;
    const addWins = () => wins++;

    let draws = 0;
    const getDraws = () => draws;
    const addDraws = () => draws++;

    let losses = 0;
    const getLosses = () => losses;
    const addLosses = () => losses++;
    return { name, symbol, getMoves, setMoves, resetMoves, getWins, addWins, 
        getDraws, addDraws, getLosses, addLosses };
}


function createGame(player1, player2, gameboard) {

    const setPlayerSymbol = function(player) {
        if (player === player1) {
            player.symbol = 'O';
        }
        else if (player === player2) {
            player.symbol = 'X';
        }
        else {
            return `${player} is not in this game!`;
        }
        return
    } 

    const isWinner = function(player) {
        const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];        
        
        for (condition of winConditions) {
            if (condition.every((arrayVal) => player.getMoves().includes(arrayVal))) {
                return true;
            }
        }
        return false;
    }

    let turn = 0;
    const getTurnNum = () => turn;
    const turnIncrememnt = () => turn++;
    const turnReset = () => turn = 0;

    const isOver = function() {
        MAX_TURNS = 9;
        if (isWinner(player1) || isWinner(player2) || getTurnNum() >= MAX_TURNS) {
            return true
        }
        return false
    }

    const gameResets = function () {
        gameboard.resetBoard();
        player1.resetMoves();
        player2.resetMoves();
        setPlayerSymbol(player1);
        setPlayerSymbol(player2);
        turnReset();
    }
        
    

    return { player1, player2, gameboard, isWinner, isOver, gameResets, getTurnNum,
        turnIncrememnt, turnReset }
}

function display(game, gameboard) {
    const boxes = Array.from(document.querySelectorAll(".box"));
    const NUM_BOXES = 9;

    const renderContents = function() {
        const board = gameboard.getBoard();
        for (let i = 0; i < NUM_BOXES; i++) {
            boxes[i].textContent = board[i];

        }
    }

    for (let boxNum = 0; boxNum < boxes.length; boxNum++) {
        boxes[boxNum].addEventListener('click', function() {       
            if (game.isOver()) {
                return
            }
            addMarks(boxNum);
            renderContents();
        })
    }

    badMove = document.querySelector(".bad-move");
    errorMessage = "BAD MOVE";
    const makeMove = function(player, index) {
        if(boxes[index].textContent === '') {
            gameboard.addMove(index, player.symbol);
            player.setMoves(index);
            badMove.textContent = "";
        }
        else {
            badMove.textContent = errorMessage;
        }

        return
    }  

    const addMarks = function(boxNum) {
        if (game.getTurnNum() % 2 == 0) {
            makeMove(game.player1, boxNum);
        }
        else {
            makeMove(game.player2, boxNum);
        }
        
        if (badMove.textContent === errorMessage){
            return
        }
        else {
            game.turnIncrememnt();
            if (game.isOver()) {
                declareWinner()
            }
        }
        return
    }

    const winner = document.querySelector(".winner-declaration");
    const declareWinner = function() {
        let message;
        if (game.isWinner(game.player1)) {
            game.player1.addWins();
            game.player2.addLosses();
            message = `${game.player1.name} wins!`;
        }
        else if (game.isWinner(game.player2)) {
            game.player1.addLosses();
            game.player2.addWins();
            message = `${game.player2.name} wins!`;
        }
        else {
            game.player1.addDraws();
            game.player2.addDraws();
            message = `It's a draw!`;
        }  
        winner.textContent = message;
    }

    const resetWinner = () => winner.textContent = '';


    return { boxes, resetWinner, renderContents, addMarks, makeMove, declareWinner}
}

player1Name = document.querySelector("#player1");
player2Name = document.querySelector("#player2");
startButton = document.querySelector(".start-button");
startButton.addEventListener("click", function() {
    const playerFirst = createPlayer(player1Name.value)
    const playerSecond = createPlayer(player2Name.value);
    const newGame = createGame(playerFirst, playerSecond, gameboard);
    const newDisplay = display(newGame, gameboard)
    newGame.gameResets();
    newDisplay.renderContents();
    newDisplay.resetWinner();
    
})

