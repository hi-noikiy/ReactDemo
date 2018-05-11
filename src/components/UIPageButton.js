import React from 'react';
import {Button} from 'react-bootstrap';

import '../api/table/table.css'

class UIPageButton extends React.Component {

    constructor(props) {
    	super(props);
    	this.mouseClickEvent = this.mouseClickEvent.bind(this); //构造函数中绑定
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.state = {
            visible:true,
            isLoading: false,
        }
        
    }
    getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}
	
    componentWillUpdate(nextProps,nextState){
		//console.log("componentWillUpdate"+this.state);
	}
	mouseClickEvent(evt){
		let delayInt = 2;
		if(parseInt(delayInt,10) > 0) {
			this.setState({isLoading: true});
			this.props.commonProps.timeout=setTimeout(() => {
		      this.setState({isLoading: false});
		    }, 1000*parseInt(delayInt,10));
		}
		
        evt.preventDefault();
		let compEvent = {};
		compEvent.ComponentName=evt.target.name;
		compEvent.ActionName=this.props.parentName;
		compEvent.Action="EVENT_ACTION_PERFORM";
		this.props.dispatchEvent(compEvent);
		
	}
	componentWillUnmount() {
		if(this.props.commonProps.timeout !== undefined) {
			clearTimeout(this.props.commonProps.timeout);
			this.props.commonProps.timeout=undefined;
		}
	}
	render() {
		let isLoading = this.state.isLoading;
		let bsSy=false;
		if(this.props.valueWithObject && this.props.valueWithObject.__enabled__ === false){
			bsSy=true;
		}
		if(isLoading){
			bsSy=true;
		}

		let btnClassName = this.props.iconClass ;

		if(bsSy) {
			btnClassName += ' cs_page_disabled' ;
		} else {
			btnClassName += ' cs_page_normal' ;
		}

		let buttonText=this.props.text;
		if(buttonText !== undefined) {
			if(this.props.buttonValue && this.props.buttonValue.text){
				buttonText=this.props.buttonValue.text;
			}
			buttonText=isLoading ? (buttonText+'...') : buttonText;
		}
		let buttonName=this.props.name;
		
		return (
			<div className='cs_page_div' disabled={bsSy}>
				<Button className={btnClassName} disabled={bsSy} name={buttonName} bsStyle="primary" bsSize="small" onClick={!isLoading ? this.mouseClickEvent:null}>{buttonText}</Button>
			</div>
		)
	}
}

UIPageButton.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    name:React.PropTypes.string,
    iconClass:React.PropTypes.string,
    commonProps:React.PropTypes.object,
};

UIPageButton.defaultProps = {
    ClazzType:'UIPageButton',
    valueWithObject:{},
    visible:true,
    name:'',
    iconClass:'',
    commonProps:{},
};

export default UIPageButton; 