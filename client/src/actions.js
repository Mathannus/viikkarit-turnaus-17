const UPDATE_GAME = "UPDATE_GAME";


export function updateGame(gameId, newScore) {
  return {
    type: UPDATE_GAME,
    payload: {
      gameId: gameId,
      newScore:newScore
    }
  }
}
