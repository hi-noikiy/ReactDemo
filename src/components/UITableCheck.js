import React from 'react';
import {Checkbox} from 'react-bootstrap';

import '../api/table/table.css'

class UITableCheck extends React.Component {

   constructor(props) {
    	super(props);
    	this.handleChange = this.handleChange.bind(this); //构造函数中绑定
    }

    handleChange(evt){
    	this.props.handleAction(evt, this.props.commonProps);
    }

    render() {
		return (
            <Checkbox checked={this.props.checked} className='checkbox_table' onChange={this.handleChange}></Checkbox>
		)
	}
}

UITableCheck.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UITableCheck.defaultProps = {
    ClazzType:'UITableCheck',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UITableCheck; 