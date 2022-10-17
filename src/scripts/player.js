import { Gameboard } from './gameboard';

const Player = () => {
    const gameBoard = new Gameboard();

    const attack = (enemygameboard, row, col) => {
        enemygameboard.receiveAttack(row, col);
    };

    return { attack, gameBoard };
};

export { Player };
