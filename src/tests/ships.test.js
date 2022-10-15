import { ship } from './ships';

test('has length property', () => {
    let ship1 = ship(4);
    expect(ship1.length).toBe(4);
});
test('sinks the ship', () => {
    let ship1 = ship(3);
    ship1.hit();
    ship1.hit();
    ship1.hit();
    expect(ship1.isSunk).toBeTruthy();
});
