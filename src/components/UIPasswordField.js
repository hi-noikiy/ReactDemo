import React from 'react';
import ReactDOM from 'react-dom';
import {FormControl,Col,FormGroup,Overlay,Popover} from 'react-bootstrap';

var MD5 = require("crypto-js/md5");

class UIPasswordField extends React.Component {

    constructor(props) {
    	super(props);
        this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.changeValueHandle = this.changeValueHandle.bind(this); //构造函数中绑定
        this.handlePromptDisplay = this.handlePromptDisplay.bind(this); //构造函数中绑定
        this.onKeyPressHandle = this.onKeyPressHandle.bind(this); //构造函数中绑定
        this.state = {
            text:'',
            visible:true,
            prompt:'',
            status:'',
            label:'',
            controlId: 'formValidationNull',
            validationState: null,
            popoverText:'',
            show:false,
        }
    }

    componentWillReceiveProps(nextProps,nextState){
        if(nextProps && nextProps.valueWithObject) {
            if(!nextProps.valueWithObject.text && nextProps.valueWithObject.mandatory) {
                this.setState({
                    controlId: 'formValidationError2',
                    validationState: 'error',
                });
            }
        }
    }

    getValueWithObject() {
        let objSave = this.props.valueWithObject;

        return objSave ;
    }

    handlePromptDisplay(minLength = 0, strength = '', pswText = '') {
        if((minLength === undefined || minLength <= 0) && (strength === undefined || strength === '')) {
            return {
                passwordStatus:0, 
                popoverText:''
            };
        }
            
        let lenBool = true ;
        let strBool = true ;
        if(minLength > 0) { //密码长度不能小于minLength位
            if(pswText === undefined || pswText === '' || pswText.length < minLength) {
                lenBool = false ;
            }
        }
                
        if(strength === '1') { //密码必须包含大写字母、小写字母、数字
            strBool = this.checkPassword(pswText, strength) ;
        }
        
        if(!lenBool && !strBool) {
            return {
                passwordStatus:9999,
                popoverText:'密码必须使用大写字母、小写字母、数字和特殊字符的组合, 且长度不能小于' + minLength + '位!'
            };
        }
                
        if(!lenBool) {
            return {
                passwordStatus:9999,
                popoverText:'密码长度不能小于' + minLength + '位!'
            };
        }
        
        if(!strBool) {
            return {
                passwordStatus:9999,
                popoverText:'密码必须使用大写字母、小写字母、数字和特殊字符的组合!'
            };
        }
                
        if(lenBool || strBool) {
            return {
                passwordStatus:0,
                popoverText:''
            };
        }
    }

    checkPassword(psw, strength) {
        let UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let LOWERCASE = 'abcdefghijklmnopqrstuvwxyz' ;
        let DIGITCASE = '1234567890' ;
        let SPECIAL = '~!@#$%^&*()_+{}|:"<>?`-=[]\\;\',./' ;

        if(strength === '1') {
            if(psw === undefined || psw === '') {
                return false ;
            }
            
            let upper:Boolean = false ;
            let lower:Boolean = false ;
            let digit:Boolean = false ;
            let special:Boolean = false ;
            
            for(let i:int=0, iLen:int=psw.length; i < iLen; i++) {
                if(!upper) {
                    upper = UPPERCASE.indexOf(psw.charAt(i)) !== -1 ;
                }
                if(!lower) {
                    lower = LOWERCASE.indexOf(psw.charAt(i)) !== -1 ;
                }
                if(!digit) {
                    digit = DIGITCASE.indexOf(psw.charAt(i)) !== -1 ;
                }
                if(!special) {
                    special = SPECIAL.indexOf(psw.charAt(i)) !== -1 ;
                }
                
                if(upper && lower && digit && special) {
                    return true ;
                }
            }
            
            return false ;
        }
        
        return true ;
    }

    componentWillUpdate(nextProps,nextState){
        //console.log("componentWillUpdate"+this.state);
    }

    onKeyPressHandle(evt) {
        let keynum = 0 ;
        if(evt.which) {
            keynum = evt.which ;
        } else {
            keynum = evt.keyCode
        }
        if(keynum === 13) { //13为enter键
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

    changeValueHandle(evt) {
        if(this.props.changeValueHandle){
            this.props.changeValueHandle(evt);
        }
        let ctext = evt.target.value;
        if(ctext && ctext !== "") {
            if(ctext.length > 31) {
                this.props.valueWithObject.text = ctext;
            } else {
                this.props.valueWithObject.text = MD5(ctext).toString() ;
            }
        }
        if(ctext && this.props.valueWithObject.mandatory) {
            this.setState({
                controlId: 'formValidationSuccess2',
                validationState: 'success',
            });
        }

        let promptDisplay = this.handlePromptDisplay(this.props.valueWithObject.__minLength__,
                this.props.valueWithObject.__strength__,
                ctext) ;
        if(promptDisplay.popoverText === '') {
            this.setState({
                popoverText: '',
                show: false,
                controlId: 'formValidationSuccess2',
                validationState: 'success',
            });
        } else {
            this.setState({
                controlId: 'formValidationError2',
                validationState: 'error',
                popoverText: promptDisplay.popoverText,
                show: true,
            });
        }
        this.props.valueWithObject.__passwordStatus__ = promptDisplay.passwordStatus ;
    }

    render() {
        let styleObj = {
            display: this.state.visible? 'block':'none',
        }
        let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }

        let readOnly = false;
        if(this.props.valueWithObject){
            readOnly = this.props.valueWithObject.__readOnly__;
        }

        return (
            <Col sm={colSpan} style={styleObj} >
                <FormGroup controlId={this.state.controlId} validationState={this.state.validationState}>
                    <FormControl type="password" placeholder="输入密码" readOnly={readOnly}
                        name="default_passwordfield_id"  ref="default_passwordfield_id" 
                        onChange={this.changeValueHandle} onKeyPress={this.onKeyPressHandle}/>
                    <FormControl.Feedback />
                </FormGroup>

                <Overlay
                    show={this.state.show}
                    placement="top"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.default_passwordfield_id)}
                >
                    <Popover id="popover-positioned-top" title="">
                        {this.state.popoverText}
                    </Popover>
                </Overlay>
            </Col>
        )
    }
}

UIPasswordField.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UIPasswordField.defaultProps = {
    ClazzType:'UIPasswordField',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UIPasswordField; 

