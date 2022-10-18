import { Player } from './player';
import { SHIP_LENGTHS, SHIP_TYPES } from './helpers/helpers';
import {
    initShipsPlacement,
    paintHorizontally,
    paintVertically,
} from './domstuff';

const startGame = () => {
    const player1 = Player('Human');
    const bot = Player('Bot');

    initShipsPlacement(player1);
    botShipsPlacement(bot);
};

const startAttackingPhase = () => {};

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
    }
}

function randomDirection() {
    let rand = Math.round(Math.random());
    if (rand === 0) {
        return 'h';
    }
    return 'v';
}

export { startGame, getShip, startAttackingPhase };
