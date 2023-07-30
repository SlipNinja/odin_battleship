import { Gameboard } from './gameboard';
import { addBoxesEvents, buildPage } from './pageBuilder';
import { drawHits, drawShips } from "./drawBoard";
import { Ship } from './ship';

class GameManager{
    constructor(player, bot){
        this.gameOver = false;
        this.winner = null;
        this.player = player;
        this.bot = bot;
        this.pBoard = new Gameboard(this.sizeX, this.sizeY);
        this.bBoard = new Gameboard(this.sizeX, this.sizeY);
        this.sizeX = 10;
        this.sizeY = 10;
        this.actualPlayerBoard = null;
        this.actualEnemyBoard = null;
        this.logs = null;
        this.botFinished = true;
        this.sizeList = [5, 4, 3, 3, 2, 2, 1];
        //this.sizeList = [ 5, 5, 5 ];
    }

    // Bot tries to play a move
    botPlays = () => {
        const shipsAliveBeforeHit = this.pBoard.shipsAlive().length;
        const randomMove = this.bot.getRandomMove(this.pBoard);

        // Actual move
        this.bot.makeMove(this.pBoard, randomMove);

        // If a ship was touched, get nearby positions
        const hitResult = this.pBoard.hits[randomMove.x][randomMove.y];
        if(hitResult == 1){
            this.bot.addTargets(this.pBoard.getValidTargets(randomMove));
        }

        const shipSunk = shipsAliveBeforeHit > this.pBoard.shipsAlive().length;
        if(shipSunk){
            console.log("Player ship down");
            const shipHit = this.pBoard.getShip(randomMove);
            this.sunkShip(shipHit, this.pBoard, this.actualPlayerBoard);
        }
        this.logFromHit(this.bot, this.pBoard, randomMove.x, randomMove.y, shipSunk);

        this.drawGame();
        return true;
    }

    // Called when the player plays
    playerPlayed = (e) => {

        if(this.gameOver) return;

        // Player's turn
        const box = e.target;
        if(box.dataset.hit === "true") return;

        const shipsAliveBeforeHit = this.bBoard.shipsAlive().length;
        const positionClicked = { x: +box.dataset.x, y: +box.dataset.y };
        box.dataset.hit = true;
        this.bBoard.receiveAttack(positionClicked);

        const shipSunk = shipsAliveBeforeHit > this.bBoard.shipsAlive().length;
        this.logFromHit(this.player, this.bBoard, box.dataset.x, box.dataset.y, shipSunk);

        if(shipSunk){
            const shipHit = this.bBoard.getShip(positionClicked);
            this.sunkShip(shipHit, this.bBoard, this.actualEnemyBoard);
        }

        this.drawGame();
    
        // If player wins
        if(this.bBoard.shipsAlive().length <= 0){
            this.gameOver = true;
            this.winner = this.player;

        // If not then it's bot's turn
        } else {
            // Bot plays with a short delay
            this.botFinished = false;
            this.botFinished = setTimeout(this.botPlays, 400);
            while(!this.botFinished){};// Wait for the bot move

            // Test if bot wins
            if(this.pBoard.shipsAlive().length <= 0){
                this.gameOver = true;
                this.winner = this.bot;
            }
        }
        
        // Check if game is over
        if(this.gameOver){
            this.log(`The winner is ${this.winner.name} !`, true);
            return;
        }
    };

    sunkShip(ship, board, actualBoard) {
        for (const pos of ship.pos) {
            const curBox = actualBoard.children[pos.y*board.width + pos.x];
            curBox.classList.add("dead");
        }
    }

    logFromHit(player, board, posX, posY, sunk){
        const hitResult = board.hits[posX][posY];
        let resultText = "";
        let gold = false;

        if(sunk){
            resultText = "and sunk an opposite ship !";
            gold = true;
        } else {
            if(hitResult == "2"){// 2 is miss, 1 is hit
                resultText = "and misses..";
            } else {
                resultText = "and hit a ship !"
                gold = true;
            }
        }

        const text = `${player.name} fires at position [${posX+1};${posY+1}] ${resultText}`;
        this.log(text, gold);
    }

    log(text, gold = false){
        if(this.logs == null) this.logs = document.getElementById("logs");

        const newLog = document.createElement("p");
        newLog.innerHTML = text;
        newLog.classList.add("logLine");
        if(gold) newLog.classList.add("gold");
        this.logs.appendChild(newLog);
        this.logs.scrollTop = this.logs.scrollHeight;
    }

    restartGame(){
        const mainElement = document.getElementById("mainElement");
        
        this.pBoard.reset();
        this.bBoard.reset();
        this.bot.resetTargets();
        mainElement.remove();

        buildPage(this);

        
    }

    newGame() {
        this.setupGame();
        this.drawGame();
    }

    setupGame() {
        // Initialize game variables
        this.gameOver = false;
        this.winner = null;
        this.actualPlayerBoard = document.getElementById("playerBoard");
        this.actualEnemyBoard = document.getElementById("enemyBoard");

        // Initialize boards with random ship placement
        const shipArray = [];
        for (const size of this.sizeList) {
            shipArray.push(new Ship(size));
        }

        this.bBoard.randomlyPlaceShips(shipArray);

        // Add boxes events for taking turn
        for (const newBox of this.actualEnemyBoard.children) {
            newBox.addEventListener('click', this.playerPlayed);
        }
    }

    drawGame() {
        drawShips(this.pBoard, this.actualPlayerBoard);
        drawShips(this.bBoard, this.actualEnemyBoard, true);
    
        drawHits(this.pBoard, this.actualPlayerBoard);
        drawHits(this.bBoard, this.actualEnemyBoard);
    }
}

export { GameManager };