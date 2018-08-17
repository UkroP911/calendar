import React from 'react'

export default (props) =>
    <div className="popup-overlay">
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
                    <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"
                           name="title"
                           // value={title}
                           onChange={event => props.inputHandler('title', event.target.value)}
                    >
                    </input>
                </div>

                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Note</span>
                    </div>
                    <textarea className="form-control" aria-label="With textarea"
                              onChange={event => props.inputHandler('content', event.target.value)}
                    >
                    </textarea>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn" type="submit">Save</button>
            </div>
        </form>
    </div>