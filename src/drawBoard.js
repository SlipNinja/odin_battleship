
function drawShips(board, actualBoard, hidden = false){
    for (let i = 0; i < board.ships.length; i++) {
        const shipData = board.ships[i];

        for (let j = 0; j < shipData.pos.length; j++) {
            const pos = shipData.pos[j];
            const box = actualBoard.children[pos.y*board.width + pos.x];

            if(!hidden || (box.dataset.hit == "true")){
                console.log(box);
                box.classList = "box ship";
            } else {
                box.classList = "box";
            }
        }
    }
}

function drawHits(board, actualBoard) {
    for (let x = 0; x < board.hits.length; x++) {
        for (let y = 0; y < board.hits[x].length; y++) {
            const box = actualBoard.children[y*board.width + x];
            const pos = {x: x, y: y};
            const hit = board.getHitAt(pos);

            if(hit === 1){
                box.innerHTML = "&#128165";
            } else if(hit === 2){
                box.innerHTML = "&#128166";
            }
        }   
    }
}

export { drawShips, drawHits };