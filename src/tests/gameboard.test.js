import { Gameboard } from '../scripts/gameboard';

test('successfully places ship', () => {
    const gb = Gameboard();
    expect(gb.placeShip(2, 3, 2, 'h')).toBeTruthy();
});
test('fails to place ship', () => {
    const gb = Gameboard();
    gb.placeShip(2, 3, 2, 'h');
    expect(gb.placeShip(2, 3, 2, 'h')).toBeFalsy();
});
test('loses', () => {
    const gb = Gameboard();
    gb.placeShip(1, 1, 2, 'h');
    gb.receiveAttack(1, 1);
    gb.receiveAttack(1, 2);
    expect(gb.hasLost()).toBeTruthy();
});
