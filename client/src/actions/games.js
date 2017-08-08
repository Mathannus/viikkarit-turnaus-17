import Auth from '../Auth';

export const UPDATE_GAME = "UPDATE_GAME"
export const FETCH_GAMES = "FETCH_GAMES"
export const GAMES_IS_LOADING = "GAMES_IS_LOADING"
export const GAME_IS_UPDATING = "GAME_IS_UPDATING"
export const GAMES_FETCH_DATA_SUCCESS = "GAMES_FETCH_DATA_SUCCESS";
export const GAMES_FETCH_DATA_ERROR = "GAMES_FETCH_DATA_ERROR";

export const GAME_UPDATE_SUCCESS = "GAME_UPDATE_SUCCESS"
export const GAME_UPDATE_ERROR = "GAME_UPDATE_ERROR"

export function updateGame(gameId, newScore) {
  return (dispatch) =>{
    dispatch(gameIsUpdating(gameId, true))

    const serverUrl = process.env.REACT_APP_API_SERVER_HOST,
          url = serverUrl +"/ottelu/"+ gameId;

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + Auth.getJwtToken(),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
//      credentials: 'include',
      body: JSON.stringify({ tulosKoti: newScore[0], tulosVieras: newScore[1]})
    })
        .then((response) => {
          console.log(response);
            if (!response.ok) {
                throw Error(response.statusText);
            }

            dispatch(gameIsUpdating(gameId,false));

            return response;
        })
        .then((response) => response.json())
        .then((items) => dispatch(gameUpdateSucess(gameId,newScore)))
        .catch((e) => {
          console.log(e.name + ' : '+ e.message);
          dispatch(gameUpdateError(gameId,true, e.name + ' : '+ e.message))
        });


  }
}


export function gameIsUpdating(gameId, bool) {
  return {
    type: GAME_IS_UPDATING,
    payload: {
      gameId,
      isUpdating: bool
    }
  }
}

export function gameUpdateSucess(gameId,newScore) {
  return {
    type: GAME_UPDATE_SUCCESS,
    payload: {
      gameId,
      newScore
    }
  }
}

export function gameUpdateError(gameId, bool, errorMsg) {
  return {
    type: GAME_UPDATE_ERROR,
    payload: {
      gameId: gameId,
      hasErrored: bool,
      errorMsg: errorMsg
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
        .catch((e) => {
          console.log(e.name + ' : '+ e.message);
          dispatch(gamesTeamDataError(true))
        });
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
