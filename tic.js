function createGameboard() {
    let board = []

    const addMove = function(index, symbol) {
        board[index] = symbol;
    }

    const resetBoard = () => board = [];

    return { board, addMove, resetBoard };
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
        if (gameboard.board[index] === undefined && isValidIndex(index)) {
            gameboard.addMove(index, player.symbol);
            player.setMoves(index);
        }
        else {
            return "Invalid Move! That spot is already taken!"
        }
        return gameboard;
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

    return { player1, player2, gameboard, setPlayerSymbol, makeMove, isWinner,
        getTurnNum, turnIncrememnt }
}

function startGame(game) {
    const MAX_TURNS = 9;
    game.gameboard.resetBoard();
    game.player1.resetMoves();
    game.player2.resetMoves();
    game.setPlayerSymbol(game.player1);
    game.setPlayerSymbol(game.player2);

    while (!game.isWinner(game.player1) && !game.isWinner(game.player2) && 
        game.getTurnNum() < MAX_TURNS) {

        if (game.getTurnNum() % 2 == 0) {
            game.makeMove(game.player1, prompt("Give me the index!"), game.gameboard);
        }
        else {
            game.makeMove(game.player2, prompt("Give me the index!"), game.gameboard);
        }
        game.turnIncrememnt();
    }
    
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
    return message
}