import { Player } from './player';
import { SHIP_LENGTHS, SHIP_TYPES } from './helpers/helpers';
import {
    initShipsPlacement,
    paintHorizontally,
    paintVertically,
} from './domstuff';

import {
    attackingPrompt,
    addListeners,
    hit,
    miss,
    endingPrompt,
    removeListeners,
} from './domattacking';

let player1, bot;
let botattacks = [];

const startGame = () => {
    player1 = Player('Human');
    bot = Player('Bot');

    initShipsPlacement(player1);
    botShipsPlacement(bot);
};

const startAttackingPhase = () => {
    addListeners();
    attackingPrompt('');
};

function playerAttack(cell) {
    let row = Array.from(cell.style.gridRow).slice(0, 2).join('') - 1;
    let col = Array.from(cell.style.gridColumn).slice(0, 2).join('') - 1;
    if (bot.gameBoard.receiveAttack(row, col)) {
        hit(cell);
    } else {
        miss(cell);
    }

    if (gameEnded()) {
        removeListeners();
        if (player1.gameBoard.hasLost()) {
            endingPrompt('AI');
        } else {
            endingPrompt('player');
        }
    } else {
        attackingPrompt("oppononent's");

        removeListeners();
        setTimeout(() => {
            botattack();
            addListeners();
        }, 200);
    }
}

function gameEnded() {
    return player1.gameBoard.hasLost() || bot.gameBoard.hasLost();
}

function botattack() {
    const cells = document.querySelectorAll('.left .gameboard .gameboard-cell');

    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    while (
        botattacks.find((move) => move[0] == row && move[1] == col) != undefined
    ) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
    }

    player1.gameBoard.receiveAttack(row, col);
    if (player1.gameBoard.receiveAttack(row, col)) {
        hit(cells[row * 10 + col]);
    } else {
        miss(cells[row * 10 + col]);
    }
    botattacks.push([row, col]);

    attackingPrompt('');
}

const getShip = (i) => {
    return { type: SHIP_TYPES[i], length: SHIP_LENGTHS[SHIP_TYPES[i]] };
};

function botShipsPlacement(bot) {
    const gridCells = document.querySelectorAll(
        '.right .gameboard .gameboard-cell'
    );
    let dir = randomDirection();
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);

    for (let ship in SHIP_TYPES) {
        let length = SHIP_LENGTHS[SHIP_TYPES[ship]];
        while (!bot.gameBoard.isValidPlacement(row, col, length, dir)) {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
            dir = randomDirection();
        }
        bot.gameBoard.placeShip(row, col, length, dir);
        if (dir === 'h') {
            paintHorizontally(row, col, length, gridCells, 'placed');
        } else {
            paintVertically(row, col, length, gridCells, 'placed');
        }
    }
}

function randomDirection() {
    let rand = Math.round(Math.random());
    if (rand === 0) {
        return 'h';
    }
    return 'v';
}

export { startGame, getShip, startAttackingPhase, playerAttack };
