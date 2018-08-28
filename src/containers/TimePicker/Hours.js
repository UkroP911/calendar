import React,{Component} from 'react';

import Face from './Face';

class Hours extends Component{
    buildHours = () => {
        const hours = [];
        for (let i = 1; i <= 12; i++) hours.push(i);
        return hours;
    };

    render(){
        const { time, ...props } = this.props;
        return(
            <Face {...props} type="hours" values={this.buildHours()} selected={time.hour} />
        )
    }
}

export default Hours;