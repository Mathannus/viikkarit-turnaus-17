import { GAMES_FETCH_DATA_SUCCESS, GAME_IS_UPDATING,GAME_UPDATE_SUCCESS }  from '../actions';


const initialState = {
  ottelut: [],
  otteluId: 0,
  otteluIsUpdating: false,
  otteluTulos: [],
  otteluUpdated: false
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
    case GAME_IS_UPDATING:
      state = Object.assign({}, state , {
        otteluId: action.payload.gameId,
        otteluIsUpdating: action.payload.isUpdating
      });
      break;
    case GAME_UPDATE_SUCCESS:
      state = Object.assign({}, state , {
        otteluId: action.payload.gameId,
        otteluIsUpdating: false,
        otteluUpdated: true,
        otteluTulos: action.payload.newScore
      });
      break;
      default:
  }

  return state;
}
