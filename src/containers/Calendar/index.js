import React, {Component} from 'react';
import dateFns from "date-fns";
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {db} from "../../firebase";
import {auth} from "../../firebase";
import rootAction from '../../actions';
import withAuthorization from '../../components/withAuthorization';

import DateNotes from '../../components/DateNotes';
import Modal from '../../components/Modal';

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class Calendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            showNotes: false,
            showModal: false,
            title:'',
            content: '',
            noteTime: '',
            error: null,
            reverse: true,
            editNote: false,
            currentNote: '',
        }
    }

    componentDidMount() {
        const {onSetUsers} = this.props;
        db.onceGetUsers()
            .then(snapshot =>{
                return onSetUsers(snapshot.val())
            })
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY";
        return(
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon"
                        onClick={this.prevMonth}
                    >
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="col col-end">

                    <div className="icon" onClick={this.nextMonth}>chevron_right</div>
                </div>
                <button
                    className="btn btn-default btn-sm"
                    type="button"
                    onClick={auth.doSignOut}
                >
                    {/*Sign Out*/}
                    <span className="icon">exit_to_app</span>
                </button>
            </div>
        )
    }

    renderDays() {
        const dateFormat = 'dddd';
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++){
            const splitDay = dateFns.format(dateFns.addDays(startDate, i),dateFormat).split('');
            days.push(
                <div className="col col-center" key={i}>
                    {splitDay.map((item, id) => <span key={id}>{item}</span>)}
                </div>
            )
        }

        return <div className="days row">{days}</div>
    }

    renderTotalNotes(day){
        const {user} = this.props;
        const {authUser} = this.props;
        const userData = user[authUser.uid];

        const totalNotes = userData && userData.notes;

        return userData && Object.keys(totalNotes).map((key, id) => {
            return day.toDateString() === key
                ? <div key={id} className="total-notes-wrap">
                    <span  className="total-notes">  {Object.keys(totalNotes[key]).length}</span>
                </div>
                : null
        })


    };

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
        const dateFormat = 'D';
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                        {this.renderTotalNotes(cloneDay)}
                        {
                            dateFns.isSameDay(day, selectedDate)
                            ? <span
                                    onClick={this.modalHandler}
                                    className="icon icon-note">note_add</span>
                            : null
                        }
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    modalHandler = () => {
        this.setState({
            showModal: !this.state.showModal,
            editNote: false,
            title:'',
            content: '',
        });
    };

    onDateClick = day => {
        this.setState({
            selectedDate: day,
            showNotes: true
        })
    };

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        })
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        })
    };

    onSubmit = (event) => {
        const {
            selectedDate,
            title,
            content,
        } = this.state;

        const {authUser} = this.props;

        const {onSetUsers} = this.props;

        this.props.getNote({title, content});

        db.doNote(authUser.uid,selectedDate.toDateString(), title, content, this.props.note.noteTime);

        db.onceGetUsers()
            .then(snapshot =>{
                return onSetUsers(snapshot.val())
            });

        this.modalHandler();

        event.preventDefault();
    };

    onEditHandler = (noteId) => {
        const selectedDateNote = this.selectedDateNote();
        this.setState({
            showModal: !this.state.showModal,
            editNote: true,
            currentNote: noteId,
            title: selectedDateNote[noteId].title,
            content: selectedDateNote[noteId].content,
        });
    };

    onEditSubmit = (event) => {
        const {
            selectedDate,
            title,
            content,
            currentNote
        } = this.state;

        const {authUser} = this.props;

        const {onSetUsers} = this.props;

        db.editNote(authUser.uid,selectedDate.toDateString(), title, content, this.props.note.noteTime,currentNote);

        db.onceGetUsers()
            .then(snapshot =>{
                return onSetUsers(snapshot.val())
            });

        this.modalHandler();
        event.preventDefault();
    };

    inputHandler = (propName, value) => {
        this.setState(byPropKey(propName, value))
    };

    selectedDateNote = () => {
        const {selectedDate} = this.state;
        const {user} = this.props;
        const {authUser} = this.props;
        const userData = user[authUser.uid];
        // const selectedDateNote = userData && userData.notes[selectedDate.toDateString()];
        return userData && userData.notes[selectedDate.toDateString()];
    };

    direction = (arr) => {
        const {reverse} = this.state;
        if (reverse){
            return arr.reverse();
        }
        return arr;
    };

    renderNotes(){
        const selectedDateNote = this.selectedDateNote();

        return selectedDateNote
            ? this.direction(Object.keys(selectedDateNote)).map((key, id) => {
                return <DateNotes
                    userData={selectedDateNote[key]}
                    key={key}
                    noteId={key}
                    id={id}
                    deleteNote={this.deleteNote}
                    onEditHandler={this.onEditHandler}
                />
            })
            : <div className="notes-empty">Notes are empty</div>
    }

    deleteNote = (key) => {
        const {selectedDate} = this.state;
        const {authUser, onSetUsers} = this.props;

        db.deleteNote(authUser.uid, selectedDate.toDateString(), key);

        db.onceGetUsers()
            .then(snapshot =>{
                return onSetUsers(snapshot.val())
            });
    };

    changeDirection = () =>
        this.setState({
            reverse: !this.state.reverse
        });

    render(){
        const {selectedDate, editNote, currentNote} = this.state;
        return(
            <div className="calendar-wrapper">
                <div className="calendar">
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                </div>
                <div className="notes-container">
                    <div className="notes-header">
                        <button className="btn btn-default btn-sm"
                            onClick={this.changeDirection}
                        >Reverse</button>
                    </div>
                    <div className="notes-content">
                        {this.renderTotalNotes(selectedDate)}
                        <div className="notes-wrap">
                            {this.renderNotes()}
                        </div>
                    </div>
                </div>
                {this.state.showModal &&
                <Modal
                    closeModal={this.modalHandler}
                    onSubmit={!editNote ? this.onSubmit : this.onEditSubmit}
                    inputHandler={this.inputHandler}
                    editNote={editNote}
                    currentNote={editNote && this.selectedDateNote()[currentNote]}
                />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
        user: state.userState.user,
        note: state.noteState
    }
};

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch (rootAction.setUsers(users)),
    getNote: notes => dispatch(rootAction.getNotes(notes))
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
)(Calendar);