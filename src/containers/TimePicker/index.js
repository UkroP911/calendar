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
            inputValue: '12:00 AM',
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
        const {defaultValue, editNote} = this.props;
        this.setState({
            hour: hour,
            minute: minute === undefined ? 0 : minute,
            am: am,
            // inputValue: _getTimeString(hour, minute, am) ? _getTimeString(hour, minute, am) : defaultValue
        });
    };

    defaultValue = (inputValue) => {
        const {defaultValue, editNote} = this.props;
        // let stateValue = _getTimeString(hour, minute, am);



        // console.log(defaultValue.split(/^([0-1]{0,1}[0-9]):(\d\d{0,1}){0,1}\s(AM|PM){0,1}$/));
        // console.log(defaultValue.split(/^([0-1]{0,1}[0-9]):(\d\d{0,1}){0,1}\s(AM|PM){0,1}$/));
        // console.log(defaultValue.split(/^$(\d\d{0,1}){1}(:\d\d{0,1}){0,1}(\sAM|\sPM){0,1}/));

        console.log(this.state.inputValue);

        // if (defaultValue){
        //     return defaultValue
        // }
        // else {
        //     // return _getTimeString(this.state.hour, this.state.minute, this.state.am)
        //     return _getTimeString(hour, minute, am)
        // }

        // return _getTimeString(this.state.hour, this.state.minute, this.state.am);

        // if (stateValue ){
        //     console.log('poop')
        // }
        //
        //
        //
        // if (defaultValue){
        //     return defaultValue;
        // } else if(defaultValue !== stateValue) {
        //     return stateValue;
        // } else {
        //     return stateValue;
        // }

        // if (defaultValue){
        //     return this.setState({
        //         inputValue: defaultValue
        //     });
        // }

        return inputValue
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
                           // value={this.defaultValue(this.state.inputValue)}
                           value={_getTimeString(this.state.hour, this.state.minute, this.state.am)}
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