import { startGame } from './game';
import { renderGameBoards, setButtonListeners, setPrompt } from './domstuff';

renderGameBoards();
startGame();
setButtonListeners();
setPrompt();
