import { Gameboard } from './gameboard';
import { addBoxesEvents } from './pageBuilder';
import { drawHits, drawShips } from "./drawBoard";
import { Ship } from './ship';

class GameManager{
    constructor(player, bot, sizeX, sizeY){
        this.gameOver = false;
        this.winner = null;
        this.player = player;
        this.bot = bot;
        this.pBoard = null;
        this.bBoard = null;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.actualPlayerBoard = document.getElementById("playerBoard");
        this.actualEnemyBoard = document.getElementById("enemyBoard");
    }

    botPlays = () => {
        const randomMove = this.bot.getRandomMove(this.pBoard);
        this.bot.makeMove(this.pBoard, randomMove);
        this.drawGame();
        return true;
    }

    playerPlayed = (e) => {
        const box = e.target;
        if(box.dataset.hit === "true") return;

        const positionClicked = { x: box.dataset.x, y: box.dataset.y };
        box.dataset.hit = true;
        this.bBoard.receiveAttack(positionClicked);

        this.drawGame();

        if(this.gameOver){
            console.log(`The winner is ${this.winner.name} !`);
            return;
        }
    
        // Test if player wins
        if(this.bBoard.shipsAlive().length <= 0){
            this.gameOver = true;
            this.winner = this.player;
        }

        this.drawGame();
    
        // Bot plays
        let botFinished = false;
        botFinished = setTimeout(this.botPlays, 400);
        while(!botFinished){};

        // Test if bot wins
        if(this.pBoard.shipsAlive().length <= 0){
            this.gameOver = true;
            this.winner = this.bot;
        }
    };

    newGame() {
        this.setupGame();
        this.drawGame();
    }

    setupGame() {
        this.gameOver = false;
        this.winner = null;
        this.pBoard = new Gameboard(this.sizeX, this.sizeY);
        this.bBoard = new Gameboard(this.sizeX, this.sizeY);

        const shipArray = [
            new Ship(5),
            new Ship(4),
            new Ship(3),
            new Ship(3),
            new Ship(2),
            new Ship(2),
            new Ship(1)
        ];

        const shipArray2 = [
            new Ship(5),
            new Ship(4),
            new Ship(3),
            new Ship(3),
            new Ship(2),
            new Ship(2),
            new Ship(1)
        ];

        this.bBoard.randomlyPlaceShips(shipArray);
        this.pBoard.randomlyPlaceShips(shipArray2);
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