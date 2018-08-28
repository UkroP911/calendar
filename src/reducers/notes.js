import * as actions from "../constants/actions";

const initialState = {};


function notesReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_NOTES:{
            return {
                ...state,
                notes: action.notes
            }
        }
        case actions.GET_NOTES_TIME:{
            return{
                ...state,
                noteTime: action.time
            }
        }
        default: return state
    }
}
export default notesReducer;