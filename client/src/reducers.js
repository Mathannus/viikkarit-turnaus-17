import ADD_GAME from './actions.js';

function addGame(state=[], action) {
  return [
    ...state,
    {
      gameId: action.gameId,
      score: action.newScore
    }
  ]
}

export default addGame;
