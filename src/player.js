
class Player {
    constructor(name){
        this.name = name;
        this.bestTargets = [];
    }

    // Returns one random possible move
    getRandomMove(board){

        if(this.bestTargets.length > 0) return this.getRandomTarget();

        const moves = this.possibleMoves(board);
        const randomIndex = Math.floor(Math.random() * moves.length);
        return moves[randomIndex];
    }

    // Returns one random target
    getRandomTarget(){
        const randomIndex = Math.floor(Math.random() * this.bestTargets.length);
        const move = this.bestTargets[randomIndex];

        // Remove target from list
        this.bestTargets = this.bestTargets.filter(pos => (pos.x != move.x) || (pos.y != move.y));

        return move;
    }

    // Add a list of new targets to current target list
    addTargets(posList){
        this.bestTargets = [...new Set([...this.bestTargets, ...posList])];
    }

    // Clear target list
    resetTargets(){
        this.bestTargets = [];
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