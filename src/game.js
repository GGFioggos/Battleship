import { Player } from './player';
import { SHIP_LENGTHS, SHIP_TYPES } from './helpers/helpers';
import { initShipsPlacement } from './domstuff';

const startGame = () => {
    const player1 = Player('Human');
    const player2 = Player('Bot');

    initShipsPlacement(player1);
};

const getShip = (i) => {
    return { type: SHIP_TYPES[i], length: SHIP_LENGTHS[SHIP_TYPES[i]] };
};

export { startGame, getShip };
