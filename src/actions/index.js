import {setUsers} from './user.action';
import {getNotes} from './notes.action';
import {getNotesTime} from './notes.action';

const rootAction = {
    setUsers,
    getNotes,
    getNotesTime
};

export default rootAction;