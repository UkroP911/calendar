import React, {Component} from 'react';
import {connect} from 'react-redux';
import rootAction from '../../actions';

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
        document.addEventListener("click", this.hideOnDocumentClick);
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
        const time = _getTimeString(this.state.hour, this.state.minute, this.state.am);
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
            am: am
        });
    };

    defaultValue = (hour, minute, am) => {
        const {defaultValue} = this.props;

        console.log(hour, minute, am);

        // if (defaultValue){
        //     return defaultValue
        // }
        // else {
        //     // return _getTimeString(this.state.hour, this.state.minute, this.state.am)
        //     return _getTimeString(hour, minute, am)
        // }

        // return _getTimeString(this.state.hour, this.state.minute, this.state.am);

        if (!defaultValue){
            return _getTimeString(hour, minute, am)

        }

        return defaultValue
    };

    render(){
        // this.defaultValue();
        return(
            <div className="time-picker">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Time</span>
                    </div>
                    <input className="form-control"
                           readOnly="true"
                           // placeholder={this.props.defaultValue}
                           value={this.defaultValue(this.state.hour, this.state.minute, this.state.am)}
                           // value={_getTimeString(this.state.hour, this.state.minute, this.state.am)}
                           onClick={this.show}
                    />
                    {/*{console.log(this.props)}*/}
                </div>
                <Clock visible={this.state.visible} position={this.state.position} onTimeChanged={this.onTimeChanged} onDone={this.onDone} hour={this.state.hour} minute={this.state.minute} am={this.state.am} />
            </div>
        )
    }
}
function _pad(value) {
    value = value.toString();
    return value.length === 1 ? "0" + value : value;
}

function _getTimeString(hour, minute, am) {

    // return value;

    return hour + ":" + _pad(minute) + " " + (am ? "AM" : "PM");
}
const mapStateToProps = (state) => {
    // console.log(state)
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