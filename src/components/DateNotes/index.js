import React from 'react';
import '../../assets/style/notes.css'

export default (props) =>
        <div className="note-item">
            <div className="note-number">{props.id +1}</div>
            <div className="note-content card">
                <div className="note-title card-header">
                    <div>
                        <span className="badge badge-secondary">{props.userData.time}</span>
                        <span>&nbsp;&nbsp;|&nbsp;&nbsp;{props.userData.title}</span>
                    </div>
                    <div>
                        <span className="badge icon-close mr-3 badge-secondary"
                              onClick={() => props.onEditHandler(props.noteId)}
                        >Edit</span>
                        <span className="icon icon-close badge badge-secondary"
                              onClick={() => props.deleteNote(props.noteId)}
                        >close</span>
                    </div>
                </div>
                <div className="note-desc card-body">{props.userData.content}</div>
            </div>
        </div>
