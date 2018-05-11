import React from 'react';
import {InputGroup,FormControl,Button,Col,FormGroup} from 'react-bootstrap';

class UIInputButton extends React.Component {

   constructor(props) {
    	super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
    	this.changeValueHandle = this.changeValueHandle.bind(this); //构造函数中绑定
        this.mouseClickEvent = this.mouseClickEvent.bind(this); //构造函数中绑定
        this.onKeyPressHandle = this.onKeyPressHandle.bind(this); //构造函数中绑定
        this.state = {
            text:'',
            visible:true,
            controlId: 'formValidationSuccess1',
            validationState: 'success',
        }
        
    }
    getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}
    componentWillReceiveProps(nextProps,nextState){
        if(nextProps && nextProps.valueWithObject) {
            if(nextProps.valueWithObject.mandatory) {
                if(!nextProps.valueWithObject.text) {
                    this.setState({
                        controlId: 'formValidationError1',
                        validationState: 'error',
                    });
                } else {
                    this.setState({
                        controlId: 'formValidationSuccess1',
                        validationState: 'success',
                    });
                }
            }
        }
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

    mouseClickEvent(evt){
        evt.preventDefault();
        let compEvent = {};
        let ComponentName=evt.target.name+'_select';
        if(this.props.keypress){
            ComponentName=this.props.keypress;
        }

        if(ComponentName !== undefined) {
            compEvent.ComponentName=ComponentName;

            //为了支持电票控件选择
            let actionName = evt.target.name;
            if(this.props.parentName !== undefined) {
                actionName=this.props.parentName;
            }
            if(actionName !== undefined) {
                compEvent.ActionName=actionName;
                compEvent.Action="EVENT_ACTION_PERFORM";
                compEvent.data = 'BUTTON_CLICK_EVENT'
                if(this.props.dispatchEvent) {
                    this.props.dispatchEvent(compEvent);
                }
            }
        }
    }

    onKeyPressHandle(evt) {
        let keynum = 0 ;
        if(evt.which) {
            keynum = evt.which ;
        } else {
            keynum = evt.keyCode;
        }
        if(keynum === 13) { //13为enter键
            if(this.props.keypress !== undefined) {
                evt.preventDefault();

                let compEvent = {};
                compEvent.ComponentName=this.props.keypress;
                
                //为了支持电票控件选择
                let actionName = this.props.name;
                if(this.props.parentName !== undefined) {
                    actionName=this.props.parentName;
                }
                if(actionName !== undefined) {
                    compEvent.ActionName=actionName;

                    compEvent.Action="EVENT_ACTION_PERFORM";
                    compEvent.data = 'TEXT_ENTER_EVENT';
                    this.props.dispatchEvent(compEvent);
                }
            }
        }
    }

	render() {
		let styleObj = {
			display: this.state.visible? 'block':'none',
		}
		let inputPrompt='请输入';
		let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }
        let buttonName=this.props.name;
        let buttonDesc='选择';
        if(this.props.buttonDesc){
            buttonDesc=this.props.buttonDesc;
        }
        let readOnly = false;
        let textVal = '';
        if(this.props.valueWithObject){
            readOnly = this.props.valueWithObject.__readOnly__;
            textVal = this.props.valueWithObject.text;
        }

        let custClassName = 'form-control';
        if(this.props.inputClassName !== undefined) {
            custClassName = this.props.inputClassName ;
        }

		return (
			<Col sm={colSpan} style={styleObj} className={this.props.className}>
				<FormGroup controlId={this.state.controlId} validationState={this.state.validationState} >
					<InputGroup>
                        <FormControl  className={custClassName} readOnly={readOnly} value={textVal||''} type="text" placeholder={inputPrompt} onChange={this.changeValueHandle} onKeyPress={this.onKeyPressHandle} />
    	  				<InputGroup.Button>
    	          			<Button name={buttonName} onClick={this.mouseClickEvent} className={this.props.buttonClassName}>{buttonDesc}</Button>
    	        		</InputGroup.Button>
                    </InputGroup>
				</FormGroup>
			</Col>
		)
	}
}


UIInputButton.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UIInputButton.defaultProps = {
    ClazzType:'UIInputButton',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};


export default UIInputButton; 