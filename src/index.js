import './style.css';
import { Gameboard } from './gameboard';
import { buildPage, addBoxesEvents } from './pageBuilder';
import { drawHits, drawShips } from "./drawBoard";
import { Ship } from './ship';

const BOARD_SIZE_X = 10; 
const BOARD_SIZE_Y = 10;

const playerBoard = new Gameboard(BOARD_SIZE_X, BOARD_SIZE_Y);
const enemyBoard = new Gameboard(BOARD_SIZE_X, BOARD_SIZE_Y);

buildPage(BOARD_SIZE_X, BOARD_SIZE_Y);
addBoxesEvents(enemyBoard);

startGame();

function startGame() {

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

    enemyBoard.randomlyPlaceShips(shipArray);
    playerBoard.randomlyPlaceShips(shipArray2);

    const actualPlayerBoard = document.getElementById("playerBoard");
    const actualEnemyBoard = document.getElementById("enemyBoard");

    drawShips(playerBoard, actualPlayerBoard);
    drawShips(enemyBoard, actualEnemyBoard, true);

    drawHits(playerBoard, actualPlayerBoard);
    drawHits(enemyBoard, actualEnemyBoard);    
}
