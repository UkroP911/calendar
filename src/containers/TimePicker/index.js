import React, {Component} from 'react';
import {connect} from 'react-redux';
import rootAction from '../../actions';
import dateFns from "date-fns";

import Clock from './Clock';

import '../../assets/style/timepicker.css'

class TimePicker extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            hour: 12,
            minute: 0,
            am: true,
        };
    }

    componentDidMount(){
        const {defaultValue, editNote} = this.props;
        document.addEventListener("click", this.hideOnDocumentClick);
        // const defTime = dateFns.parse(defaultValue);
        const hour = dateFns.format(defaultValue, 'hh');
        const minute = dateFns.format(defaultValue, 'mm');
        // const am = dateFns.format(defaultValue, 'A');
        // console.log('defaultValue', defaultValue);
        // console.log('hour',hour)
        // console.log('minute',minute)
        // console.log('am:',am)
        if (editNote){
            this.setState({
                hour: hour,
                minute: minute,
                // am: am === "AM",
                am: !!defaultValue.match('AM'),
            });
        }
    }

    componentWillUnmount(){
        document.removeEventListener("click", this.hideOnDocumentClick);
    }

    show = () =>{
        this.setState({
            visible: true,
        });
    };

    hide = () => {
        this.setState({
            visible: false
        });
    };

    onDone = () => {
        this.hide();
    };

    hideOnDocumentClick = (e) => {
        const {hour, minute, am} = this.state;
        const {selectedDate} = this.props;
        // const time = _getTimeString(this.state.hour, this.state.minute, this.state.am);
        const time = _getTimeObject(selectedDate, hour, minute, am);
        this.props.getNotesTime(time);
        if (!this.parentsHaveClassName(e.target, "time-picker")) this.hide();
    };

    parentsHaveClassName = (element, className) => {
        let parent = element;
        while (parent) {
            if (parent.className && parent.className.indexOf(className) > -1) return true;

            parent = parent.parentNode;
        }

        return false;
    };

    onTimeChanged = (hour, minute, am) => {
        this.setState({
            hour: hour,
            minute: minute === undefined ? 0 : minute,
            am: am,
        });
    };


    render(){
        const {hour, minute, am} = this.state;
        // const {selectedDate} = this.props;
        return(
            <div className="time-picker">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Time</span>
                    </div>
                    {/*<input type="hidden" value={_getTimeObject(selectedDate, hour, minute, am)}/>*/}
                    <input className="form-control"
                           readOnly="true"
                           value={_getTimeString(hour, minute, am)}
                           onClick={this.show}
                    />
                </div>
                <Clock visible={this.state.visible} position={this.state.position} onTimeChanged={this.onTimeChanged} onDone={this.onDone} hour={hour} minute={minute} am={am} />
            </div>
        )
    }
}
function _pad(value) {
    value = value.toString();
    return value.length === 1 ? "0" + value : value;
}
function _getTimeObject(date, hour, minute, am) {

    let test = new Date(date).setHours(hour, minute,am);
    // let str = dateFns.format(test,'YYYY-MM-DDThh:mm') +  " " + (am ? "AM" : "PM");
    // let parse = dateFns.parse(str);



    // console.log(dateFns.format(str, 'hh:mm'));
    // console.log('date',date);
    // console.log('hour',hour);
    // console.log('minute',minute);
    // console.log('am',am);


    // console.log('test',str);

    return dateFns.format(test,'YYYY-MM-DDThh:mm') +  " " + (am ? "AM" : "PM");
    // return dateFns.format(test,'YYYY-MM-DDThh:mm');
}
function _getTimeString(hour, minute, am) {
    return hour + ":" + _pad(minute) + " " + (am ? "AM" : "PM");
}
const mapStateToProps = (state) => {
    return {
        noteTime: state.noteState.noteTime
    }
};
const mapDispatchToProps = (dispatch) => {
    return{
        getNotesTime: time => dispatch(rootAction.getNotesTime(time))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(TimePicker);