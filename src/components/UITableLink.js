import React from 'react';
import {Button} from 'react-bootstrap';

import '../api/table/table.css'

class UITableLink extends React.Component {

   constructor(props) {
    	super(props);
    	this.mouseClickEvent = this.mouseClickEvent.bind(this); //构造函数中绑定
        this.state = {
            visible:true,
        }
    }
    mouseClickEvent(evt){
    	let linkEvt = {};
    	linkEvt.VALUE=this.props.commonProps.VALUE;
    	linkEvt.NAME=this.props.commonProps.NAME;
    	linkEvt.text=this.props.commonProps.text;
    	linkEvt.COUNT=this.props.commonProps.COUNT;
    	linkEvt.__rowid=this.props.__rowid;
    	this.props.handleAction(linkEvt);
    }
    render() {
		return (
            <Button key={this.props.commonProps.VALUE} className='link_table' name={this.props.commonProps.TXNAME} onClick={this.mouseClickEvent} bsStyle="link">{this.props.commonProps.text}</Button>
		)
	}
}

UITableLink.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UITableLink.defaultProps = {
    ClazzType:'UITableLink',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UITableLink; 