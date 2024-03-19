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

    const makeMove = function(player, index) {
        const MIN_INDEX = 0;
        const MAX_INDEX = 8

        isValidIndex = () => (index >= MIN_INDEX) && (index <= MAX_INDEX);
        while(!(gameboard.getBoard()[index] === undefined && isValidIndex(index))) {
            index = prompt("Not valid! Give an index from 0 to 8 that has not been chosen!")
        }
        gameboard.addMove(index, player.symbol);
        player.setMoves(index);
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
    }

    const declareWinner = function() {
        let message;
        if (isWinner(player1)) {
            player1.addWins();
            player2.addLosses();
            message = `${player1.name} wins!`;
        }
        else if (isWinner(player2)) {
            player1.addLosses();
            player2.addWins();
            message = `${player2.name} wins!`;
        }
        else {
            player1.addDraws();
            player2.addDraws();
            message = `It's a draw!`;
        }  
        const winner = document.querySelector(".winner-declaration");
        winner.textContent = message;
        winner.style.fontSize = "4rem";
        winner.style.color = "green";
    }
    

    return { player1, player2, gameboard, isOver, gameResets, makeMove, getTurnNum, turnIncrememnt, declareWinner }
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
            addMarks(boxNum);
            renderContents();
        })
    }

    const addMarks = function(boxNum) {
        if (game.getTurnNum() % 2 == 0) {
            game.makeMove(game.player1, boxNum);
        }
        else {
            game.makeMove(game.player2, boxNum);
        }
        game.turnIncrememnt();
        if (game.isOver()) {
            game.declareWinner()
        }
        return
    }

    return { boxes, renderContents, addMarks}
}

player1Name = document.querySelector("#player1");
player2Name = document.querySelector("#player2");
startButton = document.querySelector(".start-button");
startButton.addEventListener("click", function() {
    const player1 = createPlayer(player1Name.value)
    const player2 = createPlayer(player2Name.value);
    const newGame = createGame(player1, player2, gameboard);
    const newDisplay = display(newGame, gameboard)
    newDisplay.renderContents();
    newGame.gameResets();
})

