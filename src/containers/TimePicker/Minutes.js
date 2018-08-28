import React,{Component} from 'react';

import Face from './Face';

class Minutes extends Component{
    buildMinutes = () => {
        const minutes = [];
        for (let i = 1; i <= 12; i++) minutes.push(_pad((i === 12 ? 0 : i) * 5));
        return minutes;
    };
    render(){
        const { time, ...props } = this.props;
        return(
            <Face {...props} type="minutes" values={this.buildMinutes()} selected={time.minute} />
        )
    }
}
function _pad(value) {
    value = value.toString();
    return value.length === 1 ? "0" + value : value;
}

export default Minutes;