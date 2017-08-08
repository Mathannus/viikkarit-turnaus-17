import { TEAMS_FETCH_DATA_SUCCESS } from '../actions'

const initialState = {
  joukkueet: [],
  joukkue: undefined
}

export function teams(state = initialState, action) {

  if(typeof state === 'undefined') {
    return initialState;
  }
  console.log("teams reducer",action);

  switch(action.type) {
    case TEAMS_FETCH_DATA_SUCCESS:
    console.log("teams reducer",action);
      state = Array.isArray(action.payload.teams) ?
            Object.assign({}, state, { joukkueet: action.payload.teams }):
            Object.assign({}, state, { joukkue: action.payload.teams });
      break;
    default:

  }
  return state;
}
