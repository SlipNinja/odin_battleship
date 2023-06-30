function buildPage() {

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

    // Adds events
    
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

    content.appendChild(leftPanel);
    content.appendChild(boardsPanel);

    return content;
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

export { buildPage };