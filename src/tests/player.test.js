import { Gameboard } from '../scripts/gameboard';
import { Player } from '../scripts/player';

test('player1 attacks player2 but misses', () => {
    const p1 = new Player();
    const p2 = new Player();

    p1.attack(p2.gameBoard, 2, 3);
    expect(p2.gameBoard.missed[2][3]).toEqual(1);
});
test('player 2 attacks player 1 and hits', () => {
    const p1 = new Player();
    const p2 = new Player();

    p1.gameBoard.placeShip(2, 3, 2, 'h');

    p2.attack(p1.gameBoard, 2, 3);
    expect(p1.gameBoard.missed[2][3]).toEqual(0);
});
test('player 1 attacks player 2 and makes him lose', () => {
    const p1 = new Player();
    const p2 = new Player();

    p1.gameBoard.placeShip(2, 3, 2, 'h');

    p2.attack(p1.gameBoard, 2, 3);
    p2.attack(p1.gameBoard, 2, 4);

    expect(p2.gameBoard.hasLost()).toBeTruthy();
});
