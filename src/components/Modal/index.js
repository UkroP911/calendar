import React from 'react';
import '../../assets/style/modal.css';

import TimePicker from '../../containers/TimePicker';

export default (props) =>
    <div>
        <div className="popup-overlay"
             onClick={() => props.closeModal()}
        > </div>
        <form className="popup"
            onSubmit={(event) => props.onSubmit(event)}
        >
            <div className="modal-header">
                <button
                    className="btn"
                    onClick={() => props.closeModal()}
                >
                    <span className="icon">close</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Title</span>
                    </div>
                    <input type="text" className="form-control"
                           required
                           name="title"
                           defaultValue={props.editNote ? props.currentNote.title : ''}
                           onChange={event => !'' ? props.inputHandler('title', event.target.value) : props.inputHandler('title', ' ')}
                    >
                    </input>
                </div>

                <div className="input-group mb-3 input-group-textarea">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Note</span>
                    </div>
                    <textarea className="form-control"
                              defaultValue={props.editNote ? props.currentNote.content : ''}
                              onChange={event => !'' ? props.inputHandler('content', event.target.value) : props.inputHandler('content', ' ')}
                    >
                    </textarea>
                </div>


            </div>
            <div className="modal-footer">
                <TimePicker
                    defaultValue={props.currentNote ? props.currentNote.time : ''}
                    editNote={props.editNote}
                    onChange={event => !'' ? props.inputHandler('noteTime', event.target.value) : props.inputHandler('noteTime', ' ')}
                />
                <button className="btn" type="submit">Save</button>
            </div>
        </form>
    </div>