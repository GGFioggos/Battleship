import { Gameboard } from './gameboard';

const Player = (name) => {
    const gameBoard = Gameboard();

    const attack = (enemygameboard, row, col) => {
        enemygameboard.receiveAttack(row, col);
    };

    return { attack, gameBoard, name };
};

export { Player };
