import * as actions from '../constants/actions';

export function setUsers(user) {
    return {
        type: actions.USERS_SET,
        user
    }
}

