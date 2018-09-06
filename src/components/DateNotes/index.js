import React from 'react';
import '../../assets/style/notes.css'
import dateFns from "date-fns";

export default (props) => {
    const timeFormat = dateFns.format(props.userData.time, 'h:mm') + ' ' +(props.userData.time.match('AM')? 'AM' : 'PM');
    const am = dateFns.format(props.userData.time, 'A');
    // console.log(props.userData.time)
    // console.log(dateFns.format('2018-09-13T20:00', 'hh:mm A'))
    return <div className="note-item">
        <div className="note-number">{props.id +1}</div>
        <div className="note-content card">
            <div className="note-title card-header">
                <div>
                    <span className="badge badge-secondary">{timeFormat}</span>
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
}

