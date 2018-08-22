import React from 'react';
import '../../assets/style/notes.css'

export default (props) =>
        <div className="note-item">
            <div className="note-number">{props.id +1}</div>
            <div className="note-content card">
                <div className="note-title card-header">{props.userData.title}</div>
                <div className="note-desc card-body">{props.userData.content}</div>
            </div>
        </div>
