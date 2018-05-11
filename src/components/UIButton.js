import React from 'react';
import {Button} from 'react-bootstrap';
import base64 from 'js-base64/base64';

class UIButton extends React.Component {

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

	componentDidUpdate(prevProps, prevState){
		if(this.props.buttonValue && this.props.buttonValue.data) {
			let data1 = this.props.buttonValue.data;
			let bstr = atob(data1);
			let n = bstr.length;
			let u8arr = new Uint8Array(n);
			while (n--) {
            	u8arr[n] = bstr.charCodeAt(n);
        	}
			let data = new Blob([u8arr],{type: 'text/csv'});
			let csvURL = window.URL.createObjectURL(data);
			let tempLink = document.createElement('a');
			tempLink.href = csvURL;
			tempLink.setAttribute('download', this.props.buttonValue.__defaultFileName__);
			tempLink.click();
			this.props.buttonValue.data = undefined;
		}
	}
	mouseClickEvent(evt){
		let delayInt = 0;
		if(this.props.delay) {
			delayInt = this.props.delay;
		} else if(this.props.buttonProp && this.props.buttonProp.props 
				&& this.props.buttonProp.props.delay) {
			delayInt = this.props.buttonProp.props.delay;
		}
		if(parseInt(delayInt,10) > 0) {
			this.setState({isLoading: true});
			setTimeout(() => {
		      this.setState({isLoading: false});
		    }, 1000*parseInt(delayInt,10));
		}
		
        evt.preventDefault();
		let compEvent = {};
		compEvent.ComponentName=evt.target.name;
		compEvent.ActionName=this.props.parentName;
		compEvent.Action="EVENT_ACTION_PERFORM";
		if(this.props.buttonProp.props.download){
			compEvent.data='__downloadFile__';
		}
		this.props.dispatchEvent(compEvent);
	}
	render() {
		let styleObj = {
			marginRight:5,
		}
		let isLoading = this.state.isLoading;
		let bsSy=false;
		if(this.props.buttonValue && this.props.buttonValue.__enabled__ === false){
			bsSy=true;
		}
		if(isLoading){
			bsSy=true;
		}
		let buttonText=this.props.buttonProp.props.text;
		if(this.props.buttonValue && this.props.buttonValue.text){
			buttonText=this.props.buttonValue.text;
		}
		buttonText=isLoading ? (buttonText+'...') : buttonText;
		let buttonName=this.props.buttonProp.props.name;
		
		return (
			<Button style={styleObj} disabled={bsSy} name={buttonName} bsStyle="primary" bsSize="small" onClick={!isLoading ? this.mouseClickEvent:null}>{buttonText}</Button>
		)
	}
}

UIButton.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    name:React.PropTypes.string,
    commonProps:React.PropTypes.object,
};

UIButton.defaultProps = {
    ClazzType:'UIButton',
    valueWithObject:{},
    visible:true,
    name:'',
    commonProps:{},
};

export default UIButton; 