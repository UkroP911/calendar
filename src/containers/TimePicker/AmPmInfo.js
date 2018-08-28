import React from 'react'

function AmPmInfo(props) {
    return(
        <div className="am-pm-info">
            <div className={"am" + (props.time.am ? " selected" : "")} onClick={props.onChange.bind(null, true)}>AM</div>
            <div className="time">{_getTimeString(props.time.hour, props.time.minute, props.time.am)}</div>
            <div className={"pm" + (!props.time.am ? " selected" : "")} onClick={props.onChange.bind(null, false)}>PM</div>
        </div>
    )
}

function _pad(value) {
    value = value.toString();
    return value.length === 1 ? "0" + value : value;
}

function _getTimeString(hour, minute, am) {
    return hour + ":" + _pad(minute) + " " + (am ? "AM" : "PM");
}
export default AmPmInfo;