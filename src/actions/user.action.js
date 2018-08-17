import * as actions from '../constants/actions';

export function setUsers(user) {
    return {
        type: actions.USERS_SET,
        user
    }
}

export function getNotes(notes) {
    return {
        type: actions.GET_NOTES,
        notes
    }
}