/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(12), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
    margin: 0;
    padding: 0;
}

@font-face {
    font-family: 'bebas';
    src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

#header, #leftPanel, #footer, #leftText, #rightText, button{
    font-family: 'bebas';
}

#mainElement {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

/* HEADER */
#header {
    flex: 0 0 6vh;
    background-color: rgb(15, 78, 136);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2mm ridge rgba(27, 40, 76, 0.6);
}

#logo, #logoText {
    min-width: fit-content;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#logo {
    margin-left: 20px;
    padding-left: 10px;
    font-size: 2rem;
}

#logoText {
    width: 200px;
    font-size: 2.4rem;
}

/* CONTENT */
#content {
    flex: 1 1 auto;
    background-color: green;
    display: flex;
}

#leftPanel {
    background-color: rgb(23, 117, 204);
    flex: 4;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding-top: 2.3vh;
}

#logsText, #logs, #newGameButton {
    width: 90%;
}

#logsText {
    text-align: center;
    font-size: 1.5rem;
}

#logs {
    padding-left: 5px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    background-color: rgb(41, 60, 107);
    height: 60vh;
    max-height: 60vh;
    border: 2mm ridge rgba(27, 40, 76, 0.6);
    color: white;
    font-size: 1.1rem;
    gap: 10px;
}

#logs > .gold {
    color: gold;
}

.logLine {
    margin-left: 10px;
}

button {
    height: 5%;
    background-color: rgb(42, 97, 66);
    border: none;
    border-radius: 10px;
    font-size: 1.5rem;
}

button:not(.disabled){
    background-color: rgb(57, 176, 136);
    box-shadow: 0px 0px 5px rgb(16, 3, 109);
}

button:hover:not(.disabled) {
    box-shadow: 0px 0px 12px rgb(16, 3, 109);
}

button:active:not(.disabled) {
    box-shadow: none;
    background-color: rgb(36, 107, 83);
}

#boardsPanel {
    background-color: rgb(23, 117, 204);
    flex: 13;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

#leftBoard, #rightBoard {
    flex: 1;
    display: grid;
    grid-template-rows: 4vh 1fr;
    align-items: center;
    height: 100%;
}

#leftText, #rightText {
    justify-self: center;
    padding-top: 3vh;
    font-size: 2rem;
}

#playerBoard, #enemyBoard {
    display: grid;
    margin: 5px;
    border: 2px solid rgb(0, 50, 50);
}

.box, .enemyBox {
    background-color: rgb(50, 100, 250);
    border: 1px solid rgb(0, 50, 50);
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.1vw;
}

.ship.dead {
    background-color: rgb(111, 13, 39);
}

.displaybox {
    background-color: rgb(34, 168, 136);
    border: 1px solid rgb(0, 50, 50);
    aspect-ratio: 1 / 1;
}

.boat {
    display: flex;
}

.boat:hover {
    box-shadow: 0px 0px 20px rgb(102, 227, 102);
}

#dragText {
    font-size: 1.3rem;
    padding-top: 20px;
    justify-self: flex-end;
}

.enemyBox:hover[data-hit="false"]:not(.disabled) {
    box-shadow: 0px 0px 20px red;
    z-index: 1;
    background-color: rgb(40, 80, 200);
    cursor: default;
}

.enemyBox:active:not(.ship)[data-hit="false"]:not(.disabled) {
    background-color: rgb(30, 60, 150);
}

.highlightbox:not(.ship) {
    box-shadow: 0px 0px 15px rgb(28, 188, 132);
    z-index: 1;
    background-color: rgb(28, 188, 44);
}



.highlightbox.ship {
    box-shadow: 0px 0px 20px red;
    z-index: 1;
    background-color: red;
}

.ship {
    background-color: rgb(40, 50, 60);
}



/* FOOTER */
#footer {
    flex: 0 0 8vh;
    background-color: rgb(23, 117, 204);
    display: flex;
    justify-content: center;
    align-items: center;
}

#mainButton {
    min-width: fit-content;
    width: 175px;
    height: 40px;
    max-height: 90%;

}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),
/* 11 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c501e16fa3f0781f9d73.ttf";

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildBoards: () => (/* binding */ buildBoards),
/* harmony export */   buildPage: () => (/* binding */ buildPage)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _drawBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);



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
    (0,_drawBoard__WEBPACK_IMPORTED_MODULE_1__.clearOldShip)(GAME_MANAGER.pBoard, board, shipData.pos);
    GAME_MANAGER.pBoard.rotateShip(shipData);
    (0,_drawBoard__WEBPACK_IMPORTED_MODULE_1__.drawShips)(GAME_MANAGER.pBoard, board);
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
    const newShip = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(shipSize);
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

    (0,_drawBoard__WEBPACK_IMPORTED_MODULE_1__.drawShips)(playerBoard, gameboard);
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



/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });

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



/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearOldShip: () => (/* binding */ clearOldShip),
/* harmony export */   drawHits: () => (/* binding */ drawHits),
/* harmony export */   drawShips: () => (/* binding */ drawShips)
/* harmony export */ });

// Add classes to boxes to display ships
function drawShips(board, actualBoard, hidden = false){
    for (let i = 0; i < board.ships.length; i++) {
        const shipData = board.ships[i];

        for (let j = 0; j < shipData.pos.length; j++) {
            const pos = shipData.pos[j];
            const box = actualBoard.children[pos.y*board.width + pos.x];

            if(!hidden || (box.dataset.hit == "true")){
                box.classList.add("ship");
            } else {
                box.classList.remove("ship");
            }
        }
    }
}

// Clear board from old ship after rotation
function clearOldShip(board, actualBoard, posData) {
    for (const pos of posData) {
        const box = actualBoard.children[pos.y*board.width + pos.x];
        box.classList.remove("ship");
    }
}

// Display hit results on board
function drawHits(board, actualBoard) {
    for (let x = 0; x < board.hits.length; x++) {
        for (let y = 0; y < board.hits[x].length; y++) {
            const box = actualBoard.children[y*board.width + x];
            const pos = {x: x, y: y};
            const hit = board.getHitAt(pos);

            if(hit === 1){
                box.innerHTML = "&#128165";
            } else if(hit === 2){
                box.innerHTML = "&#127754";
            }
        }   
    }
}



/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });

class Player {
    constructor(name){
        this.name = name;
        this.bestTargets = [];
    }

    // Returns one random possible move
    getRandomMove(board){

        if(this.bestTargets.length > 0) return this.getRandomTarget();

        const moves = this.possibleMoves(board);
        const randomIndex = Math.floor(Math.random() * moves.length);
        return moves[randomIndex];
    }

    // Returns one random target
    getRandomTarget(){
        const randomIndex = Math.floor(Math.random() * this.bestTargets.length);
        const move = this.bestTargets[randomIndex];

        // Remove target from list
        this.bestTargets = this.bestTargets.filter(pos => (pos.x != move.x) || (pos.y != move.y));

        return move;
    }

    // Add a list of new targets to current target list
    addTargets(posList){
        this.bestTargets = [...new Set([...this.bestTargets, ...posList])];
    }

    // Clear target list
    resetTargets(){
        this.bestTargets = [];
    }

    // Returns all possible moves
    possibleMoves(board){
        const moves = [];
        for (let x = 0; x < board.hits.length; x++) {
            for (let y = 0; y < board.hits[0].length; y++) {
                if(board.hits[x][y] === 0) moves.push({x: x, y: y});
            }
        }
        return moves;
    }

    // Make a move
    makeMove(board, pos){
        board.receiveAttack(pos);
    }
}



/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameManager: () => (/* binding */ GameManager)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _pageBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _drawBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);





class GameManager{
    constructor(player, bot){
        this.gameOver = false;
        this.winner = null;
        this.player = player;
        this.bot = bot;
        this.pBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard(this.sizeX, this.sizeY);
        this.bBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard(this.sizeX, this.sizeY);
        this.sizeX = 10;
        this.sizeY = 10;
        this.actualPlayerBoard = null;
        this.actualEnemyBoard = null;
        this.logs = null;
        this.botFinished = true;
        this.sizeList = [5, 4, 3, 3, 2, 2, 1];
        //this.sizeList = [ 5, 5, 5 ];
    }

    // Bot tries to play a move
    botPlays = () => {
        const shipsAliveBeforeHit = this.pBoard.shipsAlive().length;
        const randomMove = this.bot.getRandomMove(this.pBoard);

        // Actual move
        this.bot.makeMove(this.pBoard, randomMove);

        // If a ship was touched, get nearby positions
        const hitResult = this.pBoard.hits[randomMove.x][randomMove.y];
        if(hitResult == 1){
            this.bot.addTargets(this.pBoard.getValidTargets(randomMove));
        }

        // Handle ship sunk display
        const shipSunk = shipsAliveBeforeHit > this.pBoard.shipsAlive().length;
        if(shipSunk){
            const shipHit = this.pBoard.getShip(randomMove);
            this.sunkShip(shipHit, this.pBoard, this.actualPlayerBoard);
        }

        this.logFromHit(this.bot, this.pBoard, randomMove.x, randomMove.y, shipSunk);
        this.drawGame();
        return true;
    }

    // Called when the player plays
    playerPlayed = (e) => {

        if(this.gameOver) return;

        // Player's turn
        const box = e.target;
        if(box.dataset.hit === "true") return;

        // Handle ship hit
        const shipsAliveBeforeHit = this.bBoard.shipsAlive().length;
        const positionClicked = { x: +box.dataset.x, y: +box.dataset.y };
        box.dataset.hit = true;
        this.bBoard.receiveAttack(positionClicked);

        const shipSunk = shipsAliveBeforeHit > this.bBoard.shipsAlive().length;
        this.logFromHit(this.player, this.bBoard, box.dataset.x, box.dataset.y, shipSunk);

        if(shipSunk){
            const shipHit = this.bBoard.getShip(positionClicked);
            this.sunkShip(shipHit, this.bBoard, this.actualEnemyBoard);
        }

        this.drawGame();
    
        // If player wins
        if(this.bBoard.shipsAlive().length <= 0){
            this.gameOver = true;
            this.winner = this.player;

        // If not then it's bot's turn
        } else {
            // Bot plays with a short delay
            this.botFinished = false;
            this.botFinished = setTimeout(this.botPlays, 400);
            while(!this.botFinished){};// Wait for the bot move

            // Test if bot wins
            if(this.pBoard.shipsAlive().length <= 0){
                this.gameOver = true;
                this.winner = this.bot;
            }
        }
        
        // Check if game is over
        if(this.gameOver){
            this.log(`The winner is ${this.winner.name} !`, true);
            return;
        }
    };

    // Display sunk ships
    sunkShip(ship, board, actualBoard) {
        for (const pos of ship.pos) {
            const curBox = actualBoard.children[pos.y*board.width + pos.x];
            curBox.classList.add("dead");
        }
    }

    // Log hits
    logFromHit(player, board, posX, posY, sunk){
        const hitResult = board.hits[posX][posY];
        let resultText = "";
        let gold = false;

        if(sunk){
            resultText = "and sunk an opposite ship !";
            gold = true;
        } else {
            if(hitResult == "2"){// 2 is miss, 1 is hit
                resultText = "and misses..";
            } else {
                resultText = "and hit a ship !"
                gold = true;
            }
        }

        const text = `${player.name} fires at position [${posX+1};${posY+1}] ${resultText}`;
        this.log(text, gold);
    }

    // Log
    log(text, gold = false){
        this.logs = document.getElementById("logs");
        const newLog = document.createElement("p");
        newLog.innerHTML = text;
        newLog.classList.add("logLine");
        if(gold) newLog.classList.add("gold");
        this.logs.appendChild(newLog);
        this.logs.scrollTop = this.logs.scrollHeight;
    }

    // Restart a game
    restartGame(){

        // Reset everything
        this.pBoard.reset();
        this.bBoard.reset();
        this.bot.resetTargets();

        // Remove every elements
        const mainElement = document.getElementById("mainElement");
        mainElement.remove();

        // Build again
        (0,_pageBuilder__WEBPACK_IMPORTED_MODULE_1__.buildPage)(this);
    }

    // Setup game
    setupGame() {
        // Initialize game variables
        this.gameOver = false;
        this.winner = null;
        this.actualPlayerBoard = document.getElementById("playerBoard");
        this.actualEnemyBoard = document.getElementById("enemyBoard");

        // Initialize enemy board with random ship placement
        const shipArray = [];
        for (const size of this.sizeList) {
            shipArray.push(new _ship__WEBPACK_IMPORTED_MODULE_3__.Ship(size));
        }
        this.bBoard.randomlyPlaceShips(shipArray);

        // Add boxes events for taking turn
        for (const newBox of this.actualEnemyBoard.children) {
            newBox.addEventListener('click', this.playerPlayed);
        }
    }

    // Draw boards
    drawGame() {
        (0,_drawBoard__WEBPACK_IMPORTED_MODULE_2__.drawShips)(this.pBoard, this.actualPlayerBoard);
        (0,_drawBoard__WEBPACK_IMPORTED_MODULE_2__.drawShips)(this.bBoard, this.actualEnemyBoard, true);
    
        (0,_drawBoard__WEBPACK_IMPORTED_MODULE_2__.drawHits)(this.pBoard, this.actualPlayerBoard);
        (0,_drawBoard__WEBPACK_IMPORTED_MODULE_2__.drawHits)(this.bBoard, this.actualEnemyBoard);
    }
}



/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard)
/* harmony export */ });

// Gameboard.ships
/*
[
    {
        object: <Ship>,
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

    reset(){
        this.ships = [];
        this.hits = Array.from({length: this.height}, e => Array(this.width).fill(0));
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

    // Get valid targets from position
    getValidTargets(move){
        const targets = this.getTargets(move);
        const inBoundTargets = targets.filter(this.inGrid);
        const validTargets = inBoundTargets.filter(this.validTarget.bind(this));

        return validTargets;
    }

    // Get adjacent positions
    getTargets(move){
        const targets = [];

        targets.push({x: move.x + 1, y: move.y});
        targets.push({x: move.x - 1, y: move.y});
        targets.push({x: move.x, y: move.y + 1});
        targets.push({x: move.x, y: move.y - 1});

        return targets;
    }

    // If pos isn't already hit
    validTarget(pos){
        return this.getHitAt(pos) == "0";
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
        console.log("Rotated : ", shipData.rotated);
        const invertedRotation = !shipData.rotated;

        const posList = this.computePos(shipData.pos[0], shipData.object.length, invertedRotation);
        console.log(posList);
        
        if(this.validPos(posList, shipData)){
            console.log("It's valid");
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


    // Return hit data at pos
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

    // Randomly place ships
    randomlyPlaceShips(ships){
        for (let i = 0; i < ships.length; i++) {

            const ship = ships[i];
            const currentShips = this.ships.length;

            while (currentShips !== (this.ships.length-1)) {
                const randX = this.getRandomInt(this.width);
                const randY = this.getRandomInt(this.height);
                const position = {x: randX, y: randY};
                const rotated = (Math.random() < 0.5);
                this.addShip(ship, position, rotated);
            }
        }
    }

    // Get random int between 0 and max
    getRandomInt(max){
        return Math.floor(Math.random()*max);
    }
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			0: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _pageBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _gameManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);






const player = new _player__WEBPACK_IMPORTED_MODULE_2__.Player("Player");
const bot = new _player__WEBPACK_IMPORTED_MODULE_2__.Player("Evil bot");
const manager = new _gameManager__WEBPACK_IMPORTED_MODULE_3__.GameManager(player, bot);

(0,_pageBuilder__WEBPACK_IMPORTED_MODULE_1__.buildPage)( manager);

})();

/******/ })()
;