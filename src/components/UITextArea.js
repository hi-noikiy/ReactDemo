import React from 'react';
import {FormControl,Col,FormGroup} from 'react-bootstrap';

class UITextArea extends React.Component {

   constructor(props) {
    	super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); // 构造函数中绑定
    	this.changeValueHandle = this.changeValueHandle.bind(this); // 构造函数中绑定
        this.onKeyPressHandle = this.onKeyPressHandle.bind(this); // 构造函数中绑定
        this.state = {
            text:'',
            visible:true,
            controlId: 'formValidationNull',
            validationState: null,
        }
    }
    getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}
    componentWillUpdate(nextProps,nextState){
		// console.log("componentWillUpdate"+nextProps);
	}
	changeValueHandle(evt) {
        let objSave =  this.props.valueWithObject;
        let text = evt.target.value;
        if(text && objSave.maximumLength) {
            let maxLen = parseInt(objSave.maximumLength, 10);
            if(maxLen > 0 && text.length > maxLen) {
                return ;
            }
        }
        
        if(text) {
            if(objSave.regEx) {
                let regExStr = new RegExp('^'+objSave.regEx+'$', 'g');
                if(!regExStr.test(text)) {
                    this.setState({
                        controlId: 'formValidationError2',
                        validationState: 'error',
                    });

                    return ;
                } else {
                    this.setState({
                        controlId: 'formValidationSuccess2',
                        validationState: 'success',
                    });
                }
            } else if(objSave.mandatory) {
                this.setState({
                    controlId: 'formValidationSuccess2',
                    validationState: 'success',
                });
            }
        } else {
            if(objSave.mandatory) {
                this.setState({
                    controlId: 'formValidationError2',
                    validationState: 'error',
                });
            }
        }

        objSave.text = text;
        if(this.props.changeValueHandle){
            this.props.changeValueHandle(evt);
        }
        
        this.setState({
            text:text,
        });
    }
    onKeyPressHandle(evt) {
        let keynum = 0 ;
        if(evt.which) {
            keynum = evt.which ;
        } else {
            keynum = evt.keyCode
        }
        if(keynum === 13) { // 13为enter键
            if(this.props.keypress !== undefined) {
                evt.preventDefault();

                let compEvent = {};
                compEvent.ComponentName=this.props.keypress;
                compEvent.ActionName=this.props.name;
                compEvent.Action="EVENT_ACTION_PERFORM";
                this.props.dispatchEvent(compEvent);
            }
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
        let height = 0;
        let readOnly = false;
        let textVal = '';
        if(this.props.valueWithObject){
            readOnly = this.props.valueWithObject.__readOnly__;
            textVal = this.props.valueWithObject.text;
            height = this.props.valueWithObject.heightFill;
        }
        let styleObj1 = {
            height: this.props.heightFill? height+'px':'50px',
        }
		return (
			<Col sm={colSpan} style={styleObj} className={this.props.className} >
                <FormGroup controlId={this.state.controlId} validationState={this.state.validationState}>
                    <FormControl componentClass="textarea"  ref='default_textarea_id' onChange={this.changeValueHandle} readOnly={readOnly} style={styleObj1}
                    type="text" value={textVal||''} onKeyPress={this.onKeyPressHandle}/>
                    <FormControl.Feedback />
                </FormGroup>
            </Col>
		)
	}
}

UITextArea.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UITextArea.defaultProps = {
    ClazzType:'UITextArea',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UITextArea; 