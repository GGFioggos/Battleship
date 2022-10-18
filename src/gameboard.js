import { Ship } from './ship';

const Gameboard = () => {
    let board = [];
    let missed = [];
    let dimensions = 10;

    for (let i = 0; i < dimensions; i++) {
        board[i] = [];
        missed[i] = [];
        for (let j = 0; j < dimensions; j++) {
            board[i].push(0);
            missed[i].push(0);
        }
    }

    const placeShip = (row, col, length, dir) => {
        let ship = Ship(length);

        if (dir === 'h') {
            for (let i = col; i < col + length; i++) {
                board[row][i] = ship;
            }
        } else {
            for (let i = row; i < row + ship.length; i++) {
                board[i][col] = ship;
            }
        }
    };

    const isValidPlacement = (row, col, length, dir) => {
        if (
            row < 0 ||
            row > dimensions - 1 ||
            col < 0 ||
            col > dimensions - 1
        ) {
            return false;
        }

        if (dir === 'h') {
            if (col + length - 1 > dimensions) {
                return false;
            }

            for (let i = 0; i < length; i++) {
                if (board[row][col + i] != 0) {
                    return false;
                }
            }
            return true;
        } else if (dir === 'v') {
            if (row + length - 1 > dimensions) {
                return false;
            }

            for (let i = 0; i < length; i++) {
                if (row + i < 10) {
                    if (board[row + i][col] != 0) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        }
    };

    const receiveAttack = (row, col) => {
        if (board[row][col] == 0) {
            missed[row][col] = 1;
        } else {
            board[row][col].hit();
        }
    };

    const hasLost = () => {
        for (let i = 0; i < dimensions; i++) {
            for (let j = 0; j < dimensions; j++) {
                if (board[i][j] != 0) {
                    if (!board[i][j].isSunk()) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    return {
        placeShip,
        receiveAttack,
        hasLost,
        missed,
        isValidPlacement,
    };
};

export { Gameboard };
