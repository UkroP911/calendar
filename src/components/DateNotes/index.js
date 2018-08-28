import React from 'react';
import '../../assets/style/notes.css'

export default (props) =>
        <div className="note-item">
            <div className="note-number">{props.id +1}</div>
            <div className="note-content card">
                <div className="note-title card-header">
                    <span className="badge badge-secondary">{props.userData.time}</span>
                    <span>&nbsp;&nbsp;|&nbsp;&nbsp;{props.userData.title}</span>
                    <span className="icon icon-close badge badge-secondary"
                    onClick={() => props.deleteNote(props.noteId)}
                    >close</span>
                    <span className="badge icon-close mr-5 badge-secondary"
                          onClick={() => props.onEditHandler(props.noteId)}
                    >Edit</span>
                </div>
                <div className="note-desc card-body">{props.userData.content}</div>
            </div>
        </div>
