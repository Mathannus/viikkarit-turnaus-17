export const UPDATE_GAME = "UPDATE_GAME"
export const FETCH_GAMES = "FETCH_GAMES"
export const GAMES_IS_LOADING = "GAMES_IS_LOADING"
export const GAMES_FETCH_DATA_SUCCESS = "GAMES_FETCH_DATA_SUCCESS";
export const GAMES_FETCH_DATA_ERROR = "GAMES_FETCH_DATA_ERROR";

export function updateGame(gameId, newScore) {
  return {
    type: UPDATE_GAME,
    payload: {
      gameId: gameId,
      newScore:newScore
    }
  }
}

export function fetchGameData(params) {
  return (dispatch) => {
    dispatch(gamesIsLoading(true));

    const serverUrl = process.env.REACT_APP_API_SERVER_HOST,
          url = serverUrl +"/"+ ["ottelut", ...params].join('/');

    fetch(url)
        .then((response) => {
          console.log(response);
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(gamesIsLoading(false));

            return response;
        })
        .then((response) => response.json())
        .then((items) => dispatch(gamesFetchDataSuccess(items)))
        .catch(() => dispatch(gamesTeamDataError(true)));
  }
}

export function gamesIsLoading(bool) {
  return {
    type: GAMES_IS_LOADING,
    payload: {
      isLoading: bool
    }
  }
}

export function gamesFetchDataSuccess(games) {
  return {
    type: GAMES_FETCH_DATA_SUCCESS,
    payload: {
      games
    }
  }
}

export function gamesTeamDataError(bool) {
  return {
    type: GAMES_FETCH_DATA_ERROR,
    payload: {
      hasErrored: bool
    }
  }
}
