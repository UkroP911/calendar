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

export const doNote = (userId, date, title, content, time) =>
    db.ref(`users/${userId}/notes`).child(date).push().set({
        title,
        content,
        time
    });

export const editNote = (userId, date, title, content,time, noteId) => {
    return db.ref(`users/${userId}/notes/${date}/${noteId}`).update({
        title,
        content,
        time
    })
};

export const deleteNote = (userId, date, noteId) =>
    db.ref(`users/${userId}/notes/${date}/${noteId}`).remove();
