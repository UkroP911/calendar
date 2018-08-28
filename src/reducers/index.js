import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import notesReducer from './notes';

const rootReducer = combineReducers({
    sessionState: sessionReducer,
    userState: userReducer,
    noteState: notesReducer
});

export default rootReducer;