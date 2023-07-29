import './style.css';

import { buildPage } from './pageBuilder';
import { Player } from './player';
import { GameManager } from './gameManager';

const player = new Player("Player");
const bot = new Player("Evil bot");
const manager = new GameManager(player, bot);

buildPage( manager);
