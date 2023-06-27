
class Ship{
    constructor(length){
        this.hits = 0;
        this.length = length;
    }

    hit(){
        this.hits += 1;
    }

    isSunk(){
        return this.hits >= this.length;
    }
}

export { Ship };