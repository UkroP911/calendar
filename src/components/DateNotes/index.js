import React from 'react';

export default (props) =>
        <div className="note-item">
            <div className="note-content">
                <div>{props.userData.title}</div>
                <div>{props.userData.content}</div>
            </div>
        </div>
