import { playerAttack } from './game';

function attackingPrompt(i) {
    const prompt = document.querySelector('.info');
    prompt.textContent = `It's your ${i} turn to attack!`;
}

function endingPrompt(winner) {
    const prompt = document.querySelector('.info');
    prompt.textContent = `Game over! ${winner} wins!`;
}

function addListeners() {
    const cells = document.querySelectorAll(
        '.right .gameboard .gameboard-cell'
    );

    cells.forEach((cell) => {
        cell.addEventListener('mouseover', hover);
        cell.addEventListener('mouseout', hoverout);
        cell.addEventListener('click', attack);
    });
}

function removeListeners() {
    const cells = document.querySelectorAll(
        '.right .gameboard .gameboard-cell'
    );

    cells.forEach((cell) => {
        cell.removeEventListener('mouseover', hover);
        cell.removeEventListener('mouseout', hoverout);
        cell.removeEventListener('click', attack);
    });
}

function attack(event) {
    playerAttack(event.target);
}

function hover(event) {
    event.target.classList.add('hovered');
}

function hoverout(event) {
    event.target.classList.remove('hovered');
}

function hit(cell) {
    cell.classList.add('hit');
}

function miss(cell) {
    cell.classList.add('missed');
}

export {
    attackingPrompt,
    addListeners,
    hit,
    miss,
    endingPrompt,
    removeListeners,
};
