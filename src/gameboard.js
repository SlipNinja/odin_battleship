
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

    addShip(ship, pos, rotated = false){
        const newShipData = {
            object: ship,
            pos: this.computePos(pos, ship.length, rotated),
            rotated: rotated
        };

        if(this.validPos(newShipData.pos, null)) this.ships.push(newShipData);
    }

    validPos(pos, ship){
        const inBound = pos.every(this.inGrid);
        const overlap = this.overlapShip(pos, ship);
        return inBound && !(overlap);
    }

    // Arrow function notation to bind the Gameboard to this
    inGrid = (pos) => {
        return (pos.x >= 0 && pos.x < this.width) && (pos.y >= 0 && pos.y < this.height);
    };

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

    moveShip(shipData, newPos){
        const posList = this.computePos(newPos, shipData.object.length, shipData.rotated);
        if(this.validPos(posList, shipData)) shipData.pos = posList;
    }

    rotateShip(shipData){
        const invertedRotation = !shipData.rotated;
        const posList = this.computePos(shipData.pos[0], shipData.object.length, invertedRotation);
        if(this.validPos(posList, shipData)){
            shipData.pos = posList;
            shipData.rotated = invertedRotation;
        }
    }

    computePos(initialPos, length, rotated){
        const allPos = [initialPos];
        for (let i = 0; i < length-1; i++) {
            let newpos = null;

            if(rotated){
                newpos = {x: initialPos.x, y: initialPos.y + 1};
            } else {
                newpos = {x: initialPos.x + 1, y: initialPos.y};
            }
            allPos.push(newpos);
        }
        return allPos;
    }

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

    isShipHit = (ship, pos) => {
        let shipHit = false;
        ship.pos.forEach(p => {
            if((p.x === pos.x) && p.y === pos.y) shipHit = true;
        });
        return shipHit;
    }

    getShipByPos(pos){
        return this.ships.find(data => JSON.stringify(data.pos) === JSON.stringify({x: 1, y: 1}));
    }

    shipsAlive(){
        const alive = [];
        this.ships.forEach(shipData => {
            if(!shipData.object.isSunk()) alive.push(shipData);
        });
        return alive;
    }
}

export { Gameboard };