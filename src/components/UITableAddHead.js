import React from 'react';
import {Button} from 'react-bootstrap';

import '../api/table/table.css'

class UITableAddHead extends React.Component {

   constructor(props) {
    	super(props);
    	this.handleClick = this.handleClick.bind(this); //构造函数中绑定
    }

    handleClick(evt){
    	this.props.handleAction(evt, this.props.commonProps);
    }

    render() {
    	let btnClassName = this.props.iconClass ;
		btnClassName += ' addHead_table' ;
		
		return (
            <Button className={btnClassName} name={this.props.name} onClick={this.handleClick}>{this.props.text}</Button>
		)
	}
}

UITableAddHead.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UITableAddHead.defaultProps = {
    ClazzType:'UITableAddHead',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UITableAddHead; 