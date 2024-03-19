function createGameboard() {
    let board = []

    const getBoard = () => board;
    const addMove = (index, symbol) => board[index] = symbol;

    const resetBoard = () => board = [];

    return { getBoard, addMove, resetBoard };
}

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
            if (condition.every((arrayVal) => player.getMoves().includes(String(arrayVal)))) {
                return true;
            }
        }
        return false;
    }

    let turn = 0;
    const getTurnNum = () => turn;
    const turnIncrememnt = () => turn++;

    const startGame = function() {
        const MAX_TURNS = 9;
        gameboard.resetBoard();
        player1.resetMoves();
        player2.resetMoves();
        setPlayerSymbol(player1);
        setPlayerSymbol(player2);
    
        while (!isWinner(player1) && !isWinner(player2) && 
            getTurnNum() < MAX_TURNS) {
    
            if (getTurnNum() % 2 == 0) {
                makeMove(player1, prompt("Give me the index!"));
            }
            else {
                makeMove(player2, prompt("Give me the index!"));
            }
            turnIncrememnt();
        }
        
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
        return message
    }
    

    return { player1, player2, gameboard, startGame }
}

