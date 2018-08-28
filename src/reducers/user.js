import * as actions from '../constants/actions';
const INITIAL_STATE = {
    user: {},
};

const applySetUsers = (state, action) => ({
    ...state,
    user: {...action.user}
});

function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.USERS_SET:{
            return applySetUsers(state, action)
        }
        default: return state;
    }
}


export default userReducer;