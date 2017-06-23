import { combineReducers } from 'redux';
import { games } from './games';
import { teams } from './teams';

export default combineReducers({
    games,
    teams
});
