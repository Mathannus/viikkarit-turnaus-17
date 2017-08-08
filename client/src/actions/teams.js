export const FETCH_TEAMS = "FETCH_TEAMS"
export const TEAMS_IS_LOADING = "TEAMS_IS_LOADING"
export const TEAMS_FETCH_DATA_SUCCESS = "TEAMS_FETCH_DATA_SUCCESS";
export const TEAM_FETCH_DATA_SUCCESS = "TEAM_FETCH_DATA_SUCCESS";
export const TEAMS_FETCH_DATA_ERROR = "TEAMS_FETCH_DATA_ERROR";

export function teamsIsLoading(bool) {
  return {
    type: TEAMS_IS_LOADING,
    payload: {
      isLoading: bool
    }
  }
}

export function teamsFetchDataSuccess(teams, params = []) {
  return {
    type: TEAMS_FETCH_DATA_SUCCESS,
    payload: {
      teams
    }
  }
}

export function fetchTeamDataError(bool) {
  return {
    type: TEAMS_FETCH_DATA_ERROR,
    payload: {
      hasErrored: bool
    }
  }
}

export function fetchTeamData(params = []) {
  return (dispatch) => {
    dispatch(teamsIsLoading(true));

    const serverUrl = process.env.REACT_APP_API_SERVER_HOST,
          url = serverUrl +"/"+ ["joukkueet", ...params].join('/');

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(teamsIsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((items) => dispatch(teamsFetchDataSuccess(items,params)))
        .catch((e) => {
          console.log(e.name + ' : '+ e.message);
          dispatch(fetchTeamDataError(true))
        }
        );
  }
}
