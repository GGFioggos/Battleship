import { getVersion } from 'jest';
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
test('multiple ships hit but not lost', () => {
    const gb = Gameboard();
    gb.placeShip(2, 2, 2, 'h');
    gb.placeShip(3, 3, 2, 'v');
    gb.receiveAttack(2, 2);
    gb.receiveAttack(2, 3);
    gb.receiveAttack(3, 3);
    expect(gb.hasLost()).toBeFalsy();
});
test('all ships hit and lost', () => {
    const gb = Gameboard();
    gb.placeShip(2, 2, 2, 'h');
    gb.placeShip(3, 3, 2, 'v');
    gb.receiveAttack(2, 2);
    gb.receiveAttack(2, 3);
    gb.receiveAttack(3, 3);
    gb.receiveAttack(4, 3);
    expect(gb.hasLost()).toBeTruthy();
});
