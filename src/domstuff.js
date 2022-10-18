import { getShip } from './game';

let shipsPlaced = 0;

const renderGameBoards = () => {
    const playercontainer = document.querySelector('.left .gameboard');
    const botcontainer = document.querySelector('.right .gameboard');

    createGrid(playercontainer);
    createGrid(botcontainer);
};

const initShipsPlacement = (player) => {
    const gameboard = document.querySelector('.left .gameboard');

    gameboard.addEventListener('mouseover', (event) => gbhover(event, player));
    gameboard.addEventListener('click', (event) => gbclick(event, player));
};

function gbhover(event, player) {
    const gameboard = document.querySelector('.left .gameboard');
    const currShip = getShip(shipsPlaced);

    previewPlacement(currShip, event, player);

    if (shipsPlaced >= 4) {
        gameboard.removeEventListener('mouseover', gbhover);
        gameboard.removeEventListener('click', gbclick);
    }
}

function gbclick(event, player) {
    const currShip = getShip(shipsPlaced);

    let length = currShip.length;
    let row = Array.from(event.target.style.gridRow).slice(0, 2).join('') - 1;
    let col =
        Array.from(event.target.style.gridColumn).slice(0, 2).join('') - 1;
    let dir = 'v';

    if (
        shipsPlaced < 5 &&
        player.gameBoard.isValidPlacement(row, col, length, dir)
    ) {
        player.gameBoard.placeShip(row, col, length, dir);
        paintBoxes(row, col, length, dir, 'placed');
        shipsPlaced++;
    }
}

function previewPlacement(currShip, event, player) {
    let length = currShip.length;
    let hoverrow = parseInt(
        Array.from(event.target.style.gridRow).slice(0, 2).join('') - 1
    );
    let hovercol = parseInt(
        Array.from(event.target.style.gridColumn).slice(0, 2).join('') - 1
    );
    let dir = 'v';
    if (player.gameBoard.isValidPlacement(hoverrow, hovercol, length, dir)) {
        paintBoxes(hoverrow, hovercol, length, dir, 'hover');
    } else {
        preventPlacement(hoverrow, hovercol, length, dir);
    }
}

function preventPlacement(hoverrow, hovercol, length, dir) {
    const gridCells = document.querySelectorAll(
        '.left .gameboard .gameboard-cell'
    );
    gridCells.forEach((gridCell) => {
        gridCell.classList.remove('hover');
        gridCell.classList.remove('error');
    });
    if (dir === 'h') {
        // SHIP REACHES END OF BORDER
        if (hovercol + length > 10) {
            let i = hovercol;
            while (i % 10 != 0) {
                gridCells[hoverrow * 10 + i].classList.add('error');
                i++;
            }
        } else {
            // SHIP SPACE IS OCCUPIED BY OTHER SHIP
            let i = hovercol;
            while (!gridCells[hoverrow * 10 + i].classList.contains('placed')) {
                gridCells[hoverrow * 10 + i].classList.add('error');
                i++;
            }
        }
    } else {
        // SHIP REACHES END OF BORDER
        if (hoverrow + length > 10) {
            let i = hoverrow;
            while (i < 10) {
                gridCells[i * 10 + hovercol].classList.add('error');
                i++;
            }
        } else {
            // SHIP SPACE IS OCCUPIED BY OTHER SHIP
            let i = hoverrow;
            while (!gridCells[i * 10 + hovercol].classList.contains('placed')) {
                gridCells[i * 10 + hovercol].classList.add('error');
                i++;
            }
        }
    }

    // SHIP POSITION IS OCCIPIED BY OTHER SHIP
}

function paintBoxes(hoverrow, hovercol, length, dir, type) {
    const gridCells = document.querySelectorAll(
        '.left .gameboard .gameboard-cell'
    );

    gridCells.forEach((gridCell) => {
        gridCell.classList.remove('hover');
        gridCell.classList.remove('error');
    });
    if (dir === 'h') {
        for (let i = hovercol; i < hovercol + length; i++) {
            gridCells[hoverrow * 10 + i].classList.add(type);
        }
    } else {
        for (let i = hoverrow; i < hoverrow + length; i++) {
            gridCells[i * 10 + hovercol].classList.add(type);
        }
    }
}

function createGrid(container) {
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            const div = document.createElement('div');
            div.className = 'gameboard-cell';

            div.style.gridRow = i;
            div.style.gridColumn = j;

            container.appendChild(div);
        }
    }
}

export { renderGameBoards, initShipsPlacement };
