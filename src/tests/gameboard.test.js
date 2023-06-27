import { Gameboard } from "../gameboard";
import { Ship } from "../ship";

const board = new Gameboard(5, 5);
const ship = new Ship(2);

test("is a gameboard", () => {
    expect(board).toBeInstanceOf(Gameboard);
});

test("can place, move and rotate ships", () => {
    board.addShip(ship, {x: 1, y: 1});
    expect(board.ships[0].object).toBeInstanceOf(Ship);
    expect(JSON.stringify(board.ships[0].pos)).toBe(JSON.stringify([{x: 1, y: 1}, {x: 2, y: 1}]));
    board.rotateShip(board.ships[0]);
    expect(board.ships[0].rotated).toBe(true);
    expect(JSON.stringify(board.ships[0].pos)).toBe(JSON.stringify([{x: 1, y: 1}, {x: 1, y: 2}]));
    board.moveShip(board.ships[0], {x: 4, y: 3});
    expect(JSON.stringify(board.ships[0].pos)).toBe(JSON.stringify([{x: 4, y: 3}, {x: 4, y: 4}]));
});

test("doesn't move or rotate ships out of the grid", () => {
    board.rotateShip(board.ships[0]);
    expect(board.ships[0].rotated).toBe(true);
    expect(JSON.stringify(board.ships[0].pos)).toBe(JSON.stringify([{x: 4, y: 3}, {x: 4, y: 4}]));
    board.moveShip(board.ships[0], {x: 4, y: 4});
    expect(JSON.stringify(board.ships[0].pos)).toBe(JSON.stringify([{x: 4, y: 3}, {x: 4, y: 4}]));
});

test("receive attacks", () => {
    board.receiveAttack({x: 4, y: 3});
    expect(board.ships[0].object.hits).toBe(1);
    expect(board.hits[4][3]).toBe(1);
});

test("records missed attacks", () => {
    board.receiveAttack({x: 0, y: 2});
    expect(board.ships[0].object.hits).toBe(1);
    expect(board.hits[0][2]).toBe(2);
});

test("knows when all ships have been sunk", () => {
    console.log(board.shipsAlive());
    expect(board.shipsAlive().length).toBe(1);
    board.receiveAttack({x: 4, y: 3});
    expect(board.shipsAlive().length).toBe(0);
});