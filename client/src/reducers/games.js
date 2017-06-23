import { GAMES_FETCH_DATA_SUCCESS }  from '../actions';


const initialState = {
  ottelut: []
}

export function games(state, action) {

  //console.log(action);
  if(typeof state === 'undefined') {
    return initialState;
  }

  switch(action.type) {
    case GAMES_FETCH_DATA_SUCCESS:
      console.log(action.payload);
      state = Object.assign({}, state, {
        ottelut: action.payload.games
      }); break;
      default:
  }

  return state;
}
