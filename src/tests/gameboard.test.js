import { Gameboard } from "../gameboard";
import { Ship } from "../ship";

const board = new Gameboard(5, 5);
const ship = new Ship(2);
const ship2 = new Ship(2);
const ship3 = new Ship(2);

test("is a gameboard", () => {
    expect(board).toBeInstanceOf(Gameboard);
});

test("can place, move and rotate ships", () => {

    // Place ship
    board.addShip(ship, {x: 1, y: 1});
    expect(board.ships.length).toBe(1);
    expect(board.ships[0].object).toBeInstanceOf(Ship);
    expect(JSON.stringify(board.ships[0].pos)).toBe(JSON.stringify([{x: 1, y: 1}, {x: 2, y: 1}]));
    
    // Rotate ship
    board.rotateShip(board.ships[0]);
    expect(board.ships[0].rotated).toBe(true);
    expect(JSON.stringify(board.ships[0].pos)).toBe(JSON.stringify([{x: 1, y: 1}, {x: 1, y: 2}]));
    
    // Move ship
    board.moveShip(board.ships[0], {x: 4, y: 3});
    expect(JSON.stringify(board.ships[0].pos)).toBe(JSON.stringify([{x: 4, y: 3}, {x: 4, y: 4}]));
});

test("doesn't move or rotate ships out of the grid", () => {

    // Doesn't rotate oob
    board.rotateShip(board.ships[0]);
    expect(board.ships[0].rotated).toBe(true);
    expect(JSON.stringify(board.ships[0].pos)).toBe(JSON.stringify([{x: 4, y: 3}, {x: 4, y: 4}]));
    
    // // Doesn't move oob
    board.moveShip(board.ships[0], {x: 4, y: 4});
    expect(JSON.stringify(board.ships[0].pos)).toBe(JSON.stringify([{x: 4, y: 3}, {x: 4, y: 4}]));
});

test("doesn't place, move or rotate ships onto other ships", () => {

    // Doesn't place on other ships
    board.addShip(ship2, {x: 4, y: 3}, true);
    expect(board.ships.length).toBe(1);

    // Add another ship
    board.addShip(ship3, {x: 2, y: 3});
    expect(board.ships.length).toBe(2);
    expect(JSON.stringify(board.ships[1].pos)).toBe(JSON.stringify([{x: 2, y: 3}, {x: 3, y: 3}]));
    
    // Doesn't move on other ships
    board.moveShip(board.ships[1], {x: 3, y: 3});
    expect(JSON.stringify(board.ships[1].pos)).toBe(JSON.stringify([{x: 2, y: 3}, {x: 3, y: 3}]));

    board.rotateShip(board.ships[1]);
    board.moveShip(board.ships[1], {x: 3, y: 3});

    // Doesn't rotate on other ships
    board.rotateShip(board.ships[1]);
    expect(board.ships[0].rotated).toBe(true);
    expect(JSON.stringify(board.ships[1].pos)).toBe(JSON.stringify([{x: 3, y: 3}, {x: 3, y: 4}]));
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
    expect(board.shipsAlive().length).toBe(2);
    board.receiveAttack({x: 4, y: 4});
    expect(board.shipsAlive().length).toBe(1);
    board.receiveAttack({x: 3, y: 4});
    board.receiveAttack({x: 3, y: 3});
    expect(board.shipsAlive().length).toBe(0);
});