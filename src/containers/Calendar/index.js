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
            error: null
        }
    }

    componentDidMount() {
        const {onSetUsers} = this.props;
        db.onceGetUsers()
            .then(snapshot =>{
                // console.log(snapshot.val());
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
                    <button
                        className="btn btn-default"
                        type="button"
                        onClick={auth.doSignOut}
                    >
                        Sign Out
                    </button>
                    <div className="icon" onClick={this.nextMonth}>chevron_right</div>
                </div>
            </div>
        )
    }

    renderDays() {
        const dateFormat = 'dddd';
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++){
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i),dateFormat)}
                </div>
            )
        }

        return <div className="days row">{days}</div>
    }

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
                        {
                            dateFns.isSameDay(day, selectedDate)
                            ? <span
                                    onClick={this.modalHandler}
                                    className="icon">note_add</span>
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
            showModal: !this.state.showModal
        })
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

        db.doNote(authUser.uid,selectedDate.toDateString(), title, content);

        this.modalHandler();

        event.preventDefault();
    };

    inputHandler = (propName, value) => {
        this.setState(byPropKey(propName, value))
    };

    renderNotes(){
        const {selectedDate} = this.state;
        const {user} = this.props;
        const {authUser} = this.props;
        const userData = user[authUser.uid];
        const selectedDateNote = userData && userData.notes[selectedDate.toDateString()];

        return selectedDateNote
                ? Object.keys(selectedDateNote).map(key => {

                // console.log(selectedDateNote[key])

                    return <DateNotes
                                    userData={selectedDateNote[key]}
                                    key={key}
                                />




                })
                : <div>None Notes</div>
    }

    render(){
        const {selectedDate} = this.state;
        const {user} = this.props;
        const {authUser} = this.props;
        const userData = user[authUser.uid]



        // console.log(userData);

        // console.log(this.props.authUser.uid)
        return(
            <div className="calendar-wrapper">
                <div className="calendar">
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                </div>
                {/*{this.state.showNotes && <DateNotes*/}
                    {/*selectedDate={selectedDate}*/}
                {/*/>}*/}
                {/*<div>{selectedDate && selectedDate.toDateString()}</div>*/}
                <div className="notes-container">
                    {this.renderNotes()}
                </div>
                {this.state.showModal &&
                <Modal
                    closeModal={this.modalHandler}
                    onSubmit={this.onSubmit}
                    inputHandler={this.inputHandler}
                />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.sessionState.authUser,
        user: state.userState.user
    }
};

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch (rootAction.setUsers(users)),
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
)(Calendar);