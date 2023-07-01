import './style.css';
import { Gameboard } from './gameboard';
import { buildPage, addBoxesEvents } from './pageBuilder';
import { drawHits, drawShips } from "./drawBoard";
import { Ship } from './ship';

const BOARD_SIZE_X = 10; 
const BOARD_SIZE_Y = 10;


const playerBoard = new Gameboard(BOARD_SIZE_X, BOARD_SIZE_Y);
const enemyBoard = new Gameboard(BOARD_SIZE_X, BOARD_SIZE_Y);

// Temp ship filling
const ship1 = new Ship(3);
playerBoard.addShip(ship1, {x: 1, y: 1});

const ship2 = new Ship(5);
playerBoard.addShip(ship2, {x: 1, y: 3}, true);

const ship3 = new Ship(3);
enemyBoard.addShip(ship3, {x: 1, y: 1});

const ship4 = new Ship(5);
enemyBoard.addShip(ship4, {x: 1, y: 3}, true);




buildPage(BOARD_SIZE_X, BOARD_SIZE_Y);
addBoxesEvents(enemyBoard);

const actualPlayerBoard = document.getElementById("playerBoard");
const actualEnemyBoard = document.getElementById("enemyBoard");

drawShips(playerBoard, actualPlayerBoard);
drawShips(enemyBoard, actualEnemyBoard, true);

drawHits(playerBoard, actualPlayerBoard);
drawHits(enemyBoard, actualEnemyBoard);