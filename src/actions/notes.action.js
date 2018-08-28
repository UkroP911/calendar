import * as actions from '../constants/actions';


export function getNotes(notes) {
    return {
        type: actions.GET_NOTES,
        notes
    }
}
export function getNotesTime(time) {
    return {
        type: actions.GET_NOTES_TIME,
        time
    }
}