import { Player } from "../player";
import { Gameboard } from "../gameboard";
import { Ship } from "../ship";

const player = new Player(true);

const board = new Gameboard(5, 5);
const ship = new Ship(2);
board.addShip(ship, {x: 1, y: 1});

test("is a Player", () => {
    expect(player).toBeInstanceOf(Player);
});

test("can make a move", () => {
    expect(board.hits[1][1]).toBe(0);
    expect(board.hits[1][2]).toBe(0);
    player.makeMove(board, {x: 1, y: 1});
    player.makeMove(board, {x: 1, y: 2});
    expect(board.hits[1][1]).toBe(1);
    expect(board.hits[1][2]).toBe(2);
    
});

test("can make a random move", () => {
    const move = player.getRandomMove(board);
    expect(board.hits[move.x][move.y]).toBe(0);
    player.makeMove(board, move);
    expect(board.hits[move.x][move.y]).not.toBe(0);
});