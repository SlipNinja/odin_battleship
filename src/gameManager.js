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
        //this.sizeList = [5, 4, 3, 3, 2, 2, 1];
        this.sizeList = [ 5 ];
    }

    // Bot tries to play a move
    botPlays = () => {
        const randomMove = this.bot.getRandomMove(this.pBoard);
        this.bot.makeMove(this.pBoard, randomMove);
        this.drawGame();
        return true;
    }

    // Called when the player plays
    playerPlayed = (e) => {

        if(this.gameOver) return;

        // Player's turn
        const box = e.target;
        if(box.dataset.hit === "true") return;

        const positionClicked = { x: box.dataset.x, y: box.dataset.y };
        box.dataset.hit = true;
        this.bBoard.receiveAttack(positionClicked);

        this.drawGame();
    
        // If player wins
        if(this.bBoard.shipsAlive().length <= 0){
            this.gameOver = true;
            this.winner = this.player;

        // If not then it's bot's turn
        } else {
            // Bot plays with a short delay
            let botFinished = false;
            botFinished = setTimeout(this.botPlays, 400);
            while(!botFinished){};// Wait for the bot move

            // Test if bot wins
            if(this.pBoard.shipsAlive().length <= 0){
                this.gameOver = true;
                this.winner = this.bot;
            }
        }
        
        // Check if game is over
        if(this.gameOver){
            console.log(`The winner is ${this.winner.name} !`);
            return;
        }
    };

    restartGame(){
        console.log(this);
        const mainElement = document.getElementById("mainElement");
        
        this.pBoard.reset();
        this.bBoard.reset();
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