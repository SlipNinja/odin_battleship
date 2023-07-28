import { drawHits, drawShips } from "./drawBoard";

function buildPage(boardSizeX, boardSizeY) {
    // Build
    buildMainElement();
    buildBoards(boardSizeX, boardSizeY);
    fillLeftPanelWithBoats([5, 4, 3, 3, 2, 2, 1]);
}

function buildMainElement() {
    // Creates DOM elements
    const mainElement = document.createElement("div");
    mainElement.id = "mainElement";

    const header = buildHeader();
    const content = buildContent();
    const footer = buildFooter();

    // Links DOM elements

    mainElement.appendChild(header);
    mainElement.appendChild(content);
    mainElement.appendChild(footer);
    document.body.appendChild(mainElement);
}

function buildHeader() {
    const header = document.createElement("div");
    header.id = "header";

    const logo = document.createElement("div");
    logo.id = "logo";
    logo.innerHTML = "&#8618 LOGO HERE";

    header.appendChild(logo);

    return header;
}

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

function buildBoard(sizeX, sizeY, player = false) {
    const newBoard = document.createElement("div");
    newBoard.style.gridTemplateColumns = `repeat(${sizeX}, 1fr)`;
    newBoard.style.gridTemplateRows = `repeat(${sizeY}, 1fr)`;

    for (let y = 0; y < sizeY; y++) {
        for (let x = 0; x < sizeX; x++) {
            const newBox = document.createElement("div");
            newBox.ondrop = tryPlacingBoat;
            newBox.ondragover = allowDrop;
            newBox.dataset.x = x;
            newBox.dataset.y = y;
            newBox.dataset.hit = false;
            newBox.classList.add("box");
            if(player){
                newBox.classList.add("playerside");
            }
            newBoard.append(newBox);
        }
    }
    return newBoard;
}

function tryPlacingBoat(e) {
    e.preventDefault();
    console.log("COUCOU");
    const data = e.target.dataset;
    console.log(data.x, data.y);
}

function allowDrop(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function clearElementChildren(element) {
    while (element.firstChild) {
        element.removeChild(myNode.lastChild);
    }
}

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
    dragText.innerHTML = "Please drag your ships to legal positions";
    leftPanel.appendChild(dragText);
}

function fillLeftPanelWithLogs() {
    const leftPanel = document.getElementById("leftPanel");
    clearElementChildren(leftPanel);

}

function boatDragged(e) {
    e.dataTransfer.setData("text/plain", e.target.children.length);
}

function buildFooter() {
    const footer = document.createElement("div");
    footer.id = "footer";

    const mainButton = document.createElement("button");
    mainButton.id = "mainButton";
    mainButton.innerHTML = "Start game";

    footer.appendChild(mainButton);

    return footer;
}

export { buildPage, buildBoards };