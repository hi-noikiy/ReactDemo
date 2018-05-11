import React from 'react';
import {Col} from 'react-bootstrap';

import './titlegroup.css'

class QueryTitleGroup extends React.Component {
	constructor(props) {
		super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定

    	this.mouseClickEvent = this.mouseClickEvent.bind(this); //构造函数中绑定

    	this.state = {
	        opened:false,
	        leftClass:'glyphicon glyphicon-triangle-right',
	        rightClass:'glyphicon glyphicon-plus',
	        leftDesc:'查询条件',
	        rightDesc:'高级搜索',
	    }
	}
	
	getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}

	mouseClickEvent(evt){
		if(!this.state.opened) {
			this.setState({opened: !this.state.opened,
				leftClass:'glyphicon glyphicon-triangle-bottom',
            	rightClass:'glyphicon glyphicon-minus',
            	rightDesc:'高级搜索',
        	}) ;
		} else {
			this.setState({opened: !this.state.opened,
				leftClass:'glyphicon glyphicon-triangle-right',
            	rightClass:'glyphicon glyphicon-plus',
            	rightDesc:'收缩查询',
            }) ;
		}

		if(this.props.handleFamilyIdByClick !== undefined) {
			this.props.handleFamilyIdByClick(this.props.familyId, !this.state.opened) ;
		}

		evt.preventDefault();
		if(this.props.keypress !== undefined) {
			let compEvent = {};
	        compEvent.ComponentName=this.props.keypress;
	        compEvent.ActionName=this.props.name;
	        compEvent.Action="EVENT_ACTION_PERFORM";
	        this.props.dispatchEvent(compEvent);
    	}
	}
	
	render() {
		let styleObj = {
			display: this.props.visible? 'block':'none',
		}

		let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }
		
		return (
			<Col  sm={colSpan} ref="default_titlelgroup_id" 
            		style={styleObj} name={this.props.name}>
            	<div className='titlegroup-div0' onClick={this.mouseClickEvent}>
            		<label className='titlegroup-left0'>
					<span className={this.state.leftClass}></span>
            		{this.state.leftDesc}</label>

            		<label className='titlegroup-right0'>
            		<span className={this.state.rightClass}></span>
            		{this.state.rightDesc}</label>
            	</div>
            </Col>
		)
	}
}
QueryTitleGroup.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

QueryTitleGroup.defaultProps = {
    ClazzType:'QueryTitleGroup',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};
export default QueryTitleGroup;