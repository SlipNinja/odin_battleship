import './style.css';

import { buildPage } from './pageBuilder';
import { Player } from './player';
import { GameManager } from './gameManager';

const BOARD_SIZE_X = 10; 
const BOARD_SIZE_Y = 10;

const player = new Player("Bobby");
const bot = new Player("Evil bot");

const manager = new GameManager(player, bot, BOARD_SIZE_X, BOARD_SIZE_Y);

buildPage(BOARD_SIZE_X, BOARD_SIZE_Y, manager);
