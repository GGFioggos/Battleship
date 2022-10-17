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

        //CHECK IF SHIP STARTING POINT IS INSIDE BOUNDARIES
        if (
            row < 0 ||
            row > dimensions - 1 ||
            col < 0 ||
            col > dimensions - 1
        ) {
            return false;
        }

        //CHECK IF SHIP IS INSIDE BOUNDARIES
        if (dir === 'h') {
            if (col + ship.length - 1 > dimensions) {
                return false;
            }

            for (let i = 0; i < ship.length; i++) {
                if (board[row][col + i] != 0) {
                    return false;
                }
            }

            for (let i = col; i < col + ship.length; i++) {
                board[row][i] = ship;
            }
            return true;
        } else if (dir === 'v') {
            if (row + ship.length - 1 > dimensions) {
                return false;
            }

            for (let i = 0; i < ship.length; i++) {
                if (board[row + i][col] != 0) {
                    return false;
                }
            }

            for (let i = row; i < row + ship.length; i++) {
                board[i][col] = ship;
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

    return { placeShip, receiveAttack, hasLost, missed };
};

export { Gameboard };
