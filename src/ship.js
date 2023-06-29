
class Ship{
    constructor(length){
        this.hits = 0;
        this.length = length;
    }

    // Handles incoming hit
    hit(){
        this.hits += 1;
    }

    // Returns true if every tiles of the ship has been hit
    isSunk(){
        return this.hits >= this.length;
    }
}

export { Ship };