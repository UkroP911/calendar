import React,{Component} from 'react';

import AmPmInfo from './AmPmInfo';
import Hours from './Hours';
import Minutes from './Minutes';

class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {
            hoursVisible: true,
            minutesVisible: false,
            position: "below"
        };
        this.onHoursHidden = this.onHoursHidden.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if (this.props.visible && !nextProps.visible) this.setState({
            hoursVisible: true,
            minutesVisible: false,
            amPmVisible: false
        });
    }

    getTime = () => {
        return {
            hour: this.props.hour,
            minute: this.props.minute,
            am: this.props.am
        };
    };

    onHourChanged = (hour) => {
        this._hour = hour;
        this.setState({
            hoursVisible: false,
            minutesVisible: true
        });
    };

    onHoursHidden = () => {
        this.props.onTimeChanged(this._hour, this.props.minute, this.props.am);
    };

    onMinuteChanged = (minute) => {
        this.props.onDone();
        this._minute = minute;

        this.setState({
            minutesVisible: false,
            amPmVisible: true
        });
    };

    onMinutesHidden = () => {
        this.props.onTimeChanged(this.props.hour, this._minute, this.props.am);
    };

    onAmPmChanged = (am) => {
        this.props.onTimeChanged(this.props.hour, this.props.minute, am);
    };
    render(){
        return(
            <div className={"clock " + (this.props.visible ? "clock-show" : "clock-hide")} >
                <div className="clock-face-wrapper">
                    <Hours visible={this.state.hoursVisible} time={this.getTime()} onClick={this.onHourChanged} onHidden={this.onHoursHidden} />
                    <Minutes visible={this.state.minutesVisible} time={this.getTime()} onClick={this.onMinuteChanged} onHidden={this.onMinutesHidden} />
                </div>
                <AmPmInfo time={this.getTime()} onChange={this.onAmPmChanged} />
            </div>
        )
    }
}

export default Clock;