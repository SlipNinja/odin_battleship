import { Ship } from "../ship";

let ship = new Ship(2);

test("The ship is a Ship with a length, happy", () => {
    expect(ship).toBeInstanceOf(Ship);
    expect(ship.length).toBe(2);
});

test("The ship can sink", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});