
// Gameboard.ships
/*
[
    {
        ship: <Ship>,
        pos: [{x: 0, y: 0}, ...],
        rotated: <bool>
    }
]
*/

class Gameboard{
    constructor(width = 10, height = 10){
        this.width = width;
        this.height = height;
        this.ships = [];
        this.hits = Array.from({length: height}, e => Array(width).fill(0));
    }

    // Adds ship at pos, rotated means vertically instead of horizontally
    addShip(ship, pos, rotated = false){
        const newShipData = {
            object: ship,
            pos: this.computePos(pos, ship.length, rotated),
            rotated: rotated
        };

        if(this.validPos(newShipData.pos, null)) this.ships.push(newShipData);
    }

    // Returns true if the future pos is inbound and does not overlap other ships
    validPos(pos, ship){
        const inBound = pos.every(this.inGrid);
        const overlap = this.overlapShip(pos, ship);
        return inBound && !(overlap);
    }

    // Returns true if pos is inbound
    // Arrow function notation to bind the Gameboard to this
    inGrid = (pos) => {
        return (pos.x >= 0 && pos.x < this.width) && (pos.y >= 0 && pos.y < this.height);
    };

    // Returns true if the posList don't overlap other ships's positions
    overlapShip(posList, curShipData){

        // Filter current ship out, if already placed
        const otherShips = this.ships.filter(shipData => {
            if(curShipData !== null){
                return curShipData.object !== shipData.object;
            }
            return true;
        });

        // Get every ship pos
        const otherPositions = otherShips.reduce((newPoslist, shipData) => {
            return [...newPoslist, ...shipData.pos];
        }, []);

        // Find if there's any other ship in the way
        return otherPositions.some(pos => {
            for (let i = 0; i < posList.length; i++) {
                const newpos = JSON.stringify(posList[i]);
                const oldpos = JSON.stringify(pos);
                if(newpos === oldpos) return true;
            }
            return false;
        });
    }

    // Move ship to new pos
    moveShip(shipData, newPos){
        const posList = this.computePos(newPos, shipData.object.length, shipData.rotated);
        if(this.validPos(posList, shipData)) shipData.pos = posList;
    }

    // Rotate ship vertically if horizontal and vice versa
    rotateShip(shipData){
        const invertedRotation = !shipData.rotated;
        const posList = this.computePos(shipData.pos[0], shipData.object.length, invertedRotation);
        if(this.validPos(posList, shipData)){
            shipData.pos = posList;
            shipData.rotated = invertedRotation;
        }
    }

    // Compute all position for future ship
    computePos(initialPos, length, rotated){
        const allPos = [];
        for (let i = 0; i < length; i++) {
            let newpos = null;

            if(rotated){
                newpos = {x: initialPos.x, y: initialPos.y + i};
            } else {
                newpos = {x: initialPos.x + i, y: initialPos.y};
            }
            allPos.push(newpos);
        }
        return allPos;
    }

    // Handles attacks on the board
    receiveAttack(pos){
        let shipHit = false;
        this.ships.forEach(shipData => {
            if(this.isShipHit(shipData, pos)){
                shipData.object.hit();
                shipHit = true;
            }
        });

        // 1 is ship touched, 2 is missed shot
        this.hits[pos.x][pos.y] = shipHit ? 1 : 2;
    }

    // Returns true if ship is hit
    isShipHit = (ship, pos) => {
        let shipHit = false;
        ship.pos.forEach(p => {
            if((p.x == pos.x) && (p.y == pos.y)) {
                shipHit = true;
            }
        });
        return shipHit;
    }

    // Returns all ships alive
    shipsAlive(){
        const alive = [];
        this.ships.forEach(shipData => {
            if(!shipData.object.isSunk()) alive.push(shipData);
        });
        return alive;
    }

    getHitAt(pos){
        return this.hits[pos.x][pos.y];
    }

    // Returns ship at given pos or false
    getShip(pos){
        for (let i = 0; i < this.ships.length; i++) {
            for (let j = 0; j < this.ships[i].pos.length; j++) {
                const curpos = this.ships[i].pos[j];
                if(JSON.stringify(pos) === JSON.stringify(curpos)) return this.ships[i];
            }
        }
        return false;
    }
}

export { Gameboard };