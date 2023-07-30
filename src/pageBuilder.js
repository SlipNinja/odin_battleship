import { Ship } from "./ship";
import { clearOldShip, drawShips } from "./drawBoard";

let GAME_MANAGER = null;

// Build the whole page
function buildPage(manager = null) {

    if(GAME_MANAGER == null) GAME_MANAGER = manager;

    // Build
    buildMainElement();
    buildBoards(GAME_MANAGER.sizeX, GAME_MANAGER.sizeY);
    fillLeftPanelWithBoats(GAME_MANAGER.sizeList);
    enableBoard(document.getElementById("enemyBoard"), false);
    enableButton(false);
}

// Build the main element
function buildMainElement() {
    // Creates DOM elements
    const mainElement = document.createElement("div");
    mainElement.id = "mainElement";

    // Build main sub-elements
    const header = buildHeader();
    const content = buildContent();
    const footer = buildFooter();

    // Links DOM elements
    mainElement.appendChild(header);
    mainElement.appendChild(content);
    mainElement.appendChild(footer);
    document.body.appendChild(mainElement);
}

// Build header
function buildHeader() {
    const header = document.createElement("div");
    header.id = "header";

    const logo = document.createElement("div");
    logo.id = "logo";
    logo.innerHTML = "&#9875";

    const logoText = document.createElement("div");
    logoText.id = "logoText";
    logoText.innerHTML = "BATTLESHIP HEROES";

    header.appendChild(logo);
    header.appendChild(logoText);

    return header;
}

// Build content
function buildContent() {
    const content = document.createElement("div");
    content.id = "content";

    const leftPanel = document.createElement("div");
    leftPanel.id = "leftPanel";

    const boardsPanel = document.createElement("div");
    boardsPanel.id = "boardsPanel";

    const leftBoard = document.createElement("div");
    leftBoard.id = "leftBoard";

    const rightBoard = document.createElement("div");
    rightBoard.id = "rightBoard";

    const leftText = document.createElement("div");
    leftText.id = "leftText";
    leftText.innerHTML = "Your board";

    const rightText = document.createElement("div");
    rightText.id = "rightText";
    rightText.innerHTML = "Enemy board";

    leftBoard.appendChild(leftText);
    rightBoard.appendChild(rightText);

    boardsPanel.appendChild(leftBoard);
    boardsPanel.appendChild(rightBoard);

    content.appendChild(leftPanel);
    content.appendChild(boardsPanel);

    return content;
}

// Build both boards from dimensions
function buildBoards(sizeX, sizeY) {
    const leftBoard = document.getElementById("leftBoard");
    const rightBoard = document.getElementById("rightBoard");

    const playerBoard = buildBoard(sizeX, sizeY, true);
    playerBoard.id = "playerBoard";

    const enemyBoard = buildBoard(sizeX, sizeY);
    enemyBoard.id = "enemyBoard";

    leftBoard.appendChild(playerBoard);
    rightBoard.appendChild(enemyBoard);
}

// Build a board from dimension
function buildBoard(sizeX, sizeY, player = false) {
    const newBoard = document.createElement("div");
    newBoard.style.gridTemplateColumns = `repeat(${sizeX}, 1fr)`;
    newBoard.style.gridTemplateRows = `repeat(${sizeY}, 1fr)`;

    // Build boxes
    for (let y = 0; y < sizeY; y++) {
        for (let x = 0; x < sizeX; x++) {
            const newBox = document.createElement("div");
            newBox.dataset.x = x;
            newBox.dataset.y = y;
            newBox.dataset.hit = false;
            
            // Setup player board's boxes listeners
            if(player){
                newBox.classList.add("box");
                newBox.ondrop = tryPlacingBoat;
                newBox.ondragover = allowDrop;
                newBox.ondragenter = highlightDropPoint;
                newBox.ondragleave = unHighlightDropPoint;

                newBox.addEventListener('contextmenu', newBox.rightClicked = function rightClicked(e) {
                    e.preventDefault();
                    rightClickRotate({x: x, y: y});
                    return false;
                }, false);
            } else {
                newBox.classList.add("enemyBox");
            }

            newBoard.append(newBox);
        }
    }
    return newBoard;
}

// Rotate ship by rightclick during placement phase
function rightClickRotate(pos) {
    const shipData = GAME_MANAGER.pBoard.getShip(pos);
    if(!shipData) return;

    const board = document.getElementById("playerBoard");
    clearOldShip(GAME_MANAGER.pBoard, board, shipData.pos);
    GAME_MANAGER.pBoard.rotateShip(shipData);
    drawShips(GAME_MANAGER.pBoard, board);
}

// Highlight/unhighlight current box
function hightlight(gameboard, data, reverse = false) {

    const curIndex = +data.x + ( data.y * 10 );
    const curBox = gameboard.children[curIndex];

    if(reverse) {
        curBox.classList.remove("highlightbox");
    } else {
        curBox.classList.add("highlightbox");
    }
}

// Highlight current box during placement phase
function highlightDropPoint(e) {
    e.preventDefault();
    const data = e.target.dataset;
    const gameboard = document.getElementById("playerBoard");
    
    hightlight(gameboard, data);
}

// Unhighlight current box during placement phase
function unHighlightDropPoint(e) {
    e.preventDefault();
    const data = e.target.dataset;
    const gameboard = document.getElementById("playerBoard");
    
    hightlight(gameboard, data, true);
}

// Try to add ship from drop
function tryPlacingBoat(e) {
    e.preventDefault();
    const data = e.target.dataset;
    const gameboard = document.getElementById("playerBoard");
    
    hightlight(gameboard, data, true);

    const playerBoard = GAME_MANAGER.pBoard;
    const currentShipNumber = playerBoard.ships.length;
    const shipSize = +e.dataTransfer.getData("text/plain");
    
    // Actual add
    const newShip = new Ship(shipSize);
    playerBoard.addShip(newShip, {x: +data.x, y: +data.y});

    // If addition was successfull
    if(currentShipNumber < playerBoard.ships.length){
        //Remove boat from boat list
        const boatPanel = document.getElementById("leftPanel");
        for (const child of boatPanel.children) {
            if( child.children.length == shipSize ){
                child.remove();
                break;
            }
        }

        // If only the text element is remaining
        if(boatPanel.children.length <= 1){
            // Allow game start
            enableButton();
            enableBoard(document.getElementById("enemyBoard"));
        }
    }

    drawShips(playerBoard, gameboard);
}

// Setup drag and drop
function allowDrop(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

// Clear all children for DOM element
function clearElementChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

// Build boat list
function fillLeftPanelWithBoats(sizeList) {
    const leftPanel = document.getElementById("leftPanel");
    clearElementChildren(leftPanel);

    for (const size of sizeList) {
        const boat = document.createElement("div");
        boat.classList.add("boat");
        for (let i = 0; i < size; i++) {
            const newBox = document.createElement("div");
            newBox.classList.add("displaybox");
            boat.appendChild(newBox);
        }
        boat.draggable = true;
        boat.style.width = `${size*8}vh`;
        boat.style.height = "8vh";
        boat.addEventListener("dragstart", boatDragged);
        leftPanel.appendChild(boat);
    }

    const dragText = document.createElement("div");
    dragText.id = "dragText";
    dragText.innerHTML = "Please drag your ships to legal positions<br/>Use right click to rotate a ship<br/><br/>Press Start when you're ready !";
    leftPanel.appendChild(dragText);
}

// Change start button disabled state
function enableButton(enable = true) {
    const startbtn = document.getElementById("mainButton");
    startbtn.disabled = !enable;

    if(enable){
        startbtn.classList.remove("disabled");
    } else {
        startbtn.classList.add("disabled");
    }
    
}

// Change board's boxes disabled state
function enableBoard(board, enable = true) {
    for (const box of board.children) {
        box.disabled = !enable;

        if(enable){
            box.classList.remove("disabled");
        } else {
            box.classList.add("disabled");
        }
    }
}

// Store boat length at drag
function boatDragged(e) {
    e.dataTransfer.setData("text/plain", e.target.children.length);
}

// Build footer
function buildFooter() {
    const footer = document.createElement("div");
    footer.id = "footer";

    const mainButton = document.createElement("button");
    mainButton.id = "mainButton";
    mainButton.innerHTML = "Start game";
    mainButton.onclick = startButtonClicked;

    footer.appendChild(mainButton);

    return footer;
}

function startButtonClicked(e){
    // Setup new game and start it
    GAME_MANAGER.setupGame();

    // Disable start button
    enableButton(false);

    // Clear rotate listeners
    clearRotateListeners();
    
    // Creates logs panel
    showLogs();
}

// Remove rightclick listeners from boxes
function clearRotateListeners(){
    const playerBoard = document.getElementById("playerBoard");
    for (const box of playerBoard.children) {
        box.removeEventListener('contextmenu', box.rightClicked, false);
    }
}

// Create a logs panel
function showLogs() {
    const leftPanel = document.getElementById("leftPanel");
    clearElementChildren(leftPanel);

    const logsText = document.createElement("div");
    logsText.id = "logsText";
    logsText.innerHTML = "Battle logs"

    const logs = document.createElement("div");
    logs.id = "logs";

    const newGameButton = document.createElement("button");
    newGameButton.id = "newGameButton";
    newGameButton.innerHTML = "New game";
    newGameButton.onclick = GAME_MANAGER.restartGame.bind(GAME_MANAGER);

    leftPanel.appendChild(logsText);
    leftPanel.appendChild(logs);
    leftPanel.appendChild(newGameButton);
}

export { buildPage, buildBoards };