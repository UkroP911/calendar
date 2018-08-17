import { db } from './firebase';

// User API
export const doCreateUser = (id,username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
        notes: ''
    });

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const doNote = (userId, date, title, content) =>
    db.ref(`users/${userId}/notes`).child(date).push().set({
        title,
        content

    });
