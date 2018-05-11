import React from 'react';
import {Button} from 'react-bootstrap';

import '../api/table/table.css'

class UITableRemove extends React.Component {

   constructor(props) {
    	super(props);
    	this.handleClick = this.handleClick.bind(this); //构造函数中绑定
    }

    handleClick(evt){
    	this.props.handleAction(evt, this.props.commonProps);
    }

    render() {
    	let btnClassName = this.props.iconClass ;
		btnClassName += ' removeColumn_table' ;

		return (
            <Button className={btnClassName} name={this.props.name} onClick={this.handleClick}>{this.props.text}</Button>
		)
	}
}

UITableRemove.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UITableRemove.defaultProps = {
    ClazzType:'UITableRemove',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UITableRemove; 