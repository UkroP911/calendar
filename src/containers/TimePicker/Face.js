import React,{Component} from 'react';

import ReactDOM from 'react-dom';

class Face extends Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount(){
        ReactDOM.findDOMNode(this.myRef.current).addEventListener("transitionend", this.onTransitionEnd);
    }

    componentWillUnmount(){
        ReactDOM.findDOMNode(this.myRef.current).removeEventListener("transitionend", this.onTransitionEnd);
    }

    onTransitionEnd = (e) => {
        if (e.propertyName === "opacity" && e.target.className.indexOf("face-hide") > -1) this.props.onHidden();
    };

    render(){
        return(
            <div ref={this.myRef} className={"face " + this.props.type + (this.props.visible ? " face-show" : " face-hide")}>
                {this.props.values.map(function(value, i) {
                    return <div key={i}
                                className={"position position-" + (i + 1) + (parseInt(this.props.selected,10) === parseInt(value,10) ? " selected" : "")}
                                onClick={this.props.onClick.bind(null, value)}
                    >

                        {_pad(value)}
                    </div>
                }.bind(this))}

                <div className="inner-face"/>
            </div>
            )
    }
}
function _pad(value) {
    value = value.toString();
    return value.length === 1 ? "0" + value : value;
}

export default Face;