
class Player {
    constructor(name, isBot = false){
        this.name = name;
        this.isBot = true;
    }

    // Returns one random possible move
    getRandomMove(board){
        const moves = this.possibleMoves(board);
        const randomIndex = Math.floor(Math.random() * moves.length);
        return moves[randomIndex];
    }

    // Returns all possible moves
    possibleMoves(board){
        const moves = [];
        for (let x = 0; x < board.hits.length; x++) {
            for (let y = 0; y < board.hits[0].length; y++) {
                if(board.hits[x][y] === 0) moves.push({x: x, y: y});
            }
        }
        return moves;
    }

    // Make a move
    makeMove(board, pos){
        board.receiveAttack(pos);
    }
}

export { Player };