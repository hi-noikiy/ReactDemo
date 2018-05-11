import React from 'react';
import {Button} from 'react-bootstrap';

import '../api/table/table.css'

class UIExportButton extends React.Component {

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
		if(this.props.commonProps.tdata && this.props.commonProps.tdata.length > 0 ) {
			let data1 = this.props.commonProps.tdata;
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
			tempLink.setAttribute('download', this.props.valueWithObject.__defaultFileName__);
			tempLink.click();
			this.props.commonProps.tdata = undefined;
		}
	}


	mouseClickEvent(evt){
		let delayInt = 2;
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
		compEvent.data='__downloadFile__';
		this.props.dispatchEvent(compEvent);
		
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
			btnClassName += ' cs_export_disabled' ;
		} else {
			btnClassName += ' cs_export_normal' ;
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
			<div className='cs_export_div' disabled={bsSy}>
				<Button className={btnClassName} disabled={bsSy} name={buttonName} bsStyle="primary" bsSize="small" onClick={!isLoading ? this.mouseClickEvent:null}>{buttonText}</Button>
			</div>
		)
	}
}

UIExportButton.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    name:React.PropTypes.string,
    commonProps:React.PropTypes.object,
};

UIExportButton.defaultProps = {
    ClazzType:'UIExportButton',
    valueWithObject:{},
    visible:true,
    name:'',
    commonProps:{},
};

export default UIExportButton; 