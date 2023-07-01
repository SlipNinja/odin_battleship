import { drawHits, drawShips } from "./drawBoard";

function buildPage(boardSizeX, boardSizeY) {
    // Build
    buildMainElement();
    buildBoards(boardSizeX, boardSizeY);
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

    const playerBoard = buildBoard(sizeX, sizeY);
    playerBoard.id = "playerBoard";

    const enemyBoard = buildBoard(sizeX, sizeY);
    enemyBoard.id = "enemyBoard";

    leftBoard.appendChild(playerBoard);
    rightBoard.appendChild(enemyBoard);
}

function buildBoard(sizeX, sizeY) {
    const newBoard = document.createElement("div");
    newBoard.style.gridTemplateColumns = `repeat(${sizeX}, 1fr)`;
    newBoard.style.gridTemplateRows = `repeat(${sizeY}, 1fr)`;

    for (let y = 0; y < sizeY; y++) {
        for (let x = 0; x < sizeX; x++) {
            const newBox = document.createElement("div");
            newBox.dataset.x = x;
            newBox.dataset.y = y;
            newBox.dataset.hit = false;
            newBox.classList.add("box");
            newBoard.append(newBox);
        }
    }
    return newBoard;
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