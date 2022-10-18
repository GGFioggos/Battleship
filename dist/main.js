/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domstuff.js":
/*!*************************!*\
  !*** ./src/domstuff.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initShipsPlacement\": () => (/* binding */ initShipsPlacement),\n/* harmony export */   \"renderGameBoards\": () => (/* binding */ renderGameBoards)\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\r\n\r\nlet shipsPlaced = 0;\r\n\r\nconst renderGameBoards = () => {\r\n    const playercontainer = document.querySelector('.left .gameboard');\r\n    const botcontainer = document.querySelector('.right .gameboard');\r\n\r\n    createGrid(playercontainer);\r\n    createGrid(botcontainer);\r\n};\r\n\r\nconst initShipsPlacement = (player) => {\r\n    const gameboard = document.querySelector('.left .gameboard');\r\n\r\n    gameboard.addEventListener('mouseover', (event) => gbhover(event, player));\r\n    gameboard.addEventListener('click', (event) => gbclick(event, player));\r\n};\r\n\r\nfunction gbhover(event, player) {\r\n    const gameboard = document.querySelector('.left .gameboard');\r\n    const currShip = (0,_game__WEBPACK_IMPORTED_MODULE_0__.getShip)(shipsPlaced);\r\n\r\n    previewPlacement(currShip, event, player);\r\n\r\n    if (shipsPlaced >= 4) {\r\n        gameboard.removeEventListener('mouseover', gbhover);\r\n        gameboard.removeEventListener('click', gbclick);\r\n    }\r\n}\r\n\r\nfunction gbclick(event, player) {\r\n    const currShip = (0,_game__WEBPACK_IMPORTED_MODULE_0__.getShip)(shipsPlaced);\r\n\r\n    let length = currShip.length;\r\n    let row = Array.from(event.target.style.gridRow).slice(0, 2).join('') - 1;\r\n    let col =\r\n        Array.from(event.target.style.gridColumn).slice(0, 2).join('') - 1;\r\n    let dir = 'v';\r\n\r\n    if (\r\n        shipsPlaced < 5 &&\r\n        player.gameBoard.isValidPlacement(row, col, length, dir)\r\n    ) {\r\n        player.gameBoard.placeShip(row, col, length, dir);\r\n        paintBoxes(row, col, length, dir, 'placed');\r\n        shipsPlaced++;\r\n    }\r\n}\r\n\r\nfunction previewPlacement(currShip, event, player) {\r\n    let length = currShip.length;\r\n    let hoverrow = parseInt(\r\n        Array.from(event.target.style.gridRow).slice(0, 2).join('') - 1\r\n    );\r\n    let hovercol = parseInt(\r\n        Array.from(event.target.style.gridColumn).slice(0, 2).join('') - 1\r\n    );\r\n    let dir = 'v';\r\n    if (player.gameBoard.isValidPlacement(hoverrow, hovercol, length, dir)) {\r\n        paintBoxes(hoverrow, hovercol, length, dir, 'hover');\r\n    } else {\r\n        preventPlacement(hoverrow, hovercol, length, dir);\r\n    }\r\n}\r\n\r\nfunction preventPlacement(hoverrow, hovercol, length, dir) {\r\n    const gridCells = document.querySelectorAll(\r\n        '.left .gameboard .gameboard-cell'\r\n    );\r\n    gridCells.forEach((gridCell) => {\r\n        gridCell.classList.remove('hover');\r\n        gridCell.classList.remove('error');\r\n    });\r\n    if (dir === 'h') {\r\n        // SHIP REACHES END OF BORDER\r\n        if (hovercol + length > 10) {\r\n            let i = hovercol;\r\n            while (i % 10 != 0) {\r\n                gridCells[hoverrow * 10 + i].classList.add('error');\r\n                i++;\r\n            }\r\n        } else {\r\n            // SHIP SPACE IS OCCUPIED BY OTHER SHIP\r\n            let i = hovercol;\r\n            while (!gridCells[hoverrow * 10 + i].classList.contains('placed')) {\r\n                gridCells[hoverrow * 10 + i].classList.add('error');\r\n                i++;\r\n            }\r\n        }\r\n    } else {\r\n        // SHIP REACHES END OF BORDER\r\n        if (hoverrow + length > 10) {\r\n            let i = hoverrow;\r\n            while (i < 10) {\r\n                gridCells[i * 10 + hovercol].classList.add('error');\r\n                i++;\r\n            }\r\n        } else {\r\n            // SHIP SPACE IS OCCUPIED BY OTHER SHIP\r\n            let i = hoverrow;\r\n            while (!gridCells[i * 10 + hovercol].classList.contains('placed')) {\r\n                gridCells[i * 10 + hovercol].classList.add('error');\r\n                i++;\r\n            }\r\n        }\r\n    }\r\n\r\n    // SHIP POSITION IS OCCIPIED BY OTHER SHIP\r\n}\r\n\r\nfunction paintBoxes(hoverrow, hovercol, length, dir, type) {\r\n    const gridCells = document.querySelectorAll(\r\n        '.left .gameboard .gameboard-cell'\r\n    );\r\n\r\n    gridCells.forEach((gridCell) => {\r\n        gridCell.classList.remove('hover');\r\n        gridCell.classList.remove('error');\r\n    });\r\n    if (dir === 'h') {\r\n        for (let i = hovercol; i < hovercol + length; i++) {\r\n            gridCells[hoverrow * 10 + i].classList.add(type);\r\n        }\r\n    } else {\r\n        for (let i = hoverrow; i < hoverrow + length; i++) {\r\n            gridCells[i * 10 + hovercol].classList.add(type);\r\n        }\r\n    }\r\n}\r\n\r\nfunction createGrid(container) {\r\n    for (let i = 1; i <= 10; i++) {\r\n        for (let j = 1; j <= 10; j++) {\r\n            const div = document.createElement('div');\r\n            div.className = 'gameboard-cell';\r\n\r\n            div.style.gridRow = i;\r\n            div.style.gridColumn = j;\r\n\r\n            container.appendChild(div);\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/domstuff.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getShip\": () => (/* binding */ getShip),\n/* harmony export */   \"startGame\": () => (/* binding */ startGame)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/helpers */ \"./src/helpers/helpers.js\");\n/* harmony import */ var _domstuff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domstuff */ \"./src/domstuff.js\");\n\r\n\r\n\r\n\r\nconst startGame = () => {\r\n    const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)('Human');\r\n    const player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)('Bot');\r\n\r\n    (0,_domstuff__WEBPACK_IMPORTED_MODULE_2__.initShipsPlacement)(player1);\r\n};\r\n\r\nconst getShip = (i) => {\r\n    return { type: _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.SHIP_TYPES[i], length: _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.SHIP_LENGTHS[_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.SHIP_TYPES[i]] };\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Gameboard\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\r\n\r\nconst Gameboard = () => {\r\n    let board = [];\r\n    let missed = [];\r\n    let dimensions = 10;\r\n\r\n    for (let i = 0; i < dimensions; i++) {\r\n        board[i] = [];\r\n        missed[i] = [];\r\n        for (let j = 0; j < dimensions; j++) {\r\n            board[i].push(0);\r\n            missed[i].push(0);\r\n        }\r\n    }\r\n\r\n    const placeShip = (row, col, length, dir) => {\r\n        let ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(length);\r\n\r\n        if (dir === 'h') {\r\n            for (let i = col; i < col + length; i++) {\r\n                board[row][i] = ship;\r\n            }\r\n        } else {\r\n            for (let i = row; i < row + ship.length; i++) {\r\n                board[i][col] = ship;\r\n            }\r\n        }\r\n    };\r\n\r\n    const isValidPlacement = (row, col, length, dir) => {\r\n        if (\r\n            row < 0 ||\r\n            row > dimensions - 1 ||\r\n            col < 0 ||\r\n            col > dimensions - 1\r\n        ) {\r\n            return false;\r\n        }\r\n\r\n        if (dir === 'h') {\r\n            if (col + length - 1 > dimensions) {\r\n                return false;\r\n            }\r\n\r\n            for (let i = 0; i < length; i++) {\r\n                if (board[row][col + i] != 0) {\r\n                    return false;\r\n                }\r\n            }\r\n            return true;\r\n        } else if (dir === 'v') {\r\n            if (row + length - 1 > dimensions) {\r\n                return false;\r\n            }\r\n\r\n            for (let i = 0; i < length; i++) {\r\n                if (row + i < 10) {\r\n                    if (board[row + i][col] != 0) {\r\n                        return false;\r\n                    }\r\n                } else {\r\n                    return false;\r\n                }\r\n            }\r\n            return true;\r\n        }\r\n    };\r\n\r\n    const receiveAttack = (row, col) => {\r\n        if (board[row][col] == 0) {\r\n            missed[row][col] = 1;\r\n        } else {\r\n            board[row][col].hit();\r\n        }\r\n    };\r\n\r\n    const hasLost = () => {\r\n        for (let i = 0; i < dimensions; i++) {\r\n            for (let j = 0; j < dimensions; j++) {\r\n                if (board[i][j] != 0) {\r\n                    if (!board[i][j].isSunk()) {\r\n                        return false;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        return true;\r\n    };\r\n\r\n    return { placeShip, receiveAttack, hasLost, missed, isValidPlacement };\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/helpers/helpers.js":
/*!********************************!*\
  !*** ./src/helpers/helpers.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SHIP_LENGTHS\": () => (/* binding */ SHIP_LENGTHS),\n/* harmony export */   \"SHIP_TYPES\": () => (/* binding */ SHIP_TYPES)\n/* harmony export */ });\nconst SHIP_TYPES = [\r\n    'carrier',\r\n    'battleship',\r\n    'cruiser',\r\n    'submarine',\r\n    'destroyer',\r\n];\r\n\r\nconst SHIP_LENGTHS = {\r\n    carrier: 5,\r\n    battleship: 4,\r\n    cruiser: 3,\r\n    submarine: 3,\r\n    destroyer: 2,\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/helpers/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _domstuff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domstuff */ \"./src/domstuff.js\");\n\r\n\r\n\r\n(0,_game__WEBPACK_IMPORTED_MODULE_0__.startGame)();\r\n(0,_domstuff__WEBPACK_IMPORTED_MODULE_1__.renderGameBoards)();\r\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\r\n\r\nconst Player = (name) => {\r\n    const gameBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();\r\n\r\n    const attack = (enemygameboard, row, col) => {\r\n        enemygameboard.receiveAttack(row, col);\r\n    };\r\n\r\n    return { attack, gameBoard, name };\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Ship\": () => (/* binding */ Ship)\n/* harmony export */ });\nconst Ship = (length) => {\r\n    let timesHit = 0;\r\n\r\n    const hit = () => {\r\n        timesHit++;\r\n    };\r\n\r\n    const isSunk = () => {\r\n        return timesHit === length;\r\n    };\r\n\r\n    const TimesHit = () => {\r\n        return timesHit;\r\n    };\r\n\r\n    return { length, hit, isSunk, TimesHit };\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
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
/******/ 			// no module.id needed
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
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;