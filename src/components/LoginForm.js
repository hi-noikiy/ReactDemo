import React from 'react';
import UIPasswordField from './UIPasswordField.js';
import UITextField from './UITextField.js';
import UILabel from './UILabel.js';
import {Form,FormGroup,Checkbox} from 'react-bootstrap';
import SignCFCA from './SignCFCA.js';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this); //构造函数中绑定
        this.getValue = this.getValue.bind(this); //构造函数中绑定
        this.handleCheckbox = this.handleCheckbox.bind(this); //构造函数中绑定
        this.handleClick = this.handleClick.bind(this); //构造函数中绑定
        
		this.state = {
            BBR00BRNO1: {},
            BBR00STAF1: {},
            BBR00PSWD1: {},
            isRemember: false,
            unameHelp: "用户号",
            upwdHelp: "密码",
            orgnameHelp:"机构号",
		}
	}

    setValue(value){
        if(value && value.hasOwnProperty("BBR61001") && value["BBR61001"]) {
            //CFCA加密方式: 2-CFCA加密     6-兴业CFCA加密
            this.props.commonProps.CA_TYPE=this.getCaType(value["BBR61001"]);
            //登陆方式: 1-证书和密码登录    2-密码登录    3-人脸登陆    4-指纹登陆
            this.props.commonProps.LOGIN_MODE=this.getLoginModel(value["BBR61001"]);
            //绑定用户
            this.props.commonProps.CFCA_TEL=this.getCfcaUsers(value["BBR61001"]);
            //CN名称
            this.props.commonProps.CFCA_CNNAME=this.getCfcaCnName(value["BBR61001"]);
            
            if(value["BBR61001"].hasOwnProperty("BBR00BRNO1")) {
                this.setState({
                    BBR00BRNO1:value.BBR61001.BBR00BRNO1,
                })
            }
            if(value["BBR61001"].hasOwnProperty("BBR00STAF1")) {
                this.setState({
                    BBR00STAF1:value.BBR61001.BBR00STAF1,
                })
            }
            if(value["BBR61001"].hasOwnProperty("BBR00PSWD1")) {
                this.setState({
                    BBR00PSWD1:value.BBR61001.BBR00PSWD1,
                })
            }
        }
    }

    getValue(){
        let value1:Object={};
        let brno1:Object = this.refs['BBR00BRNO1'].getValueWithObject();
        if(brno1) {
            value1.BBR00BRNO1=brno1;
        }
        let staf1:Object = this.refs['BBR00STAF1'].getValueWithObject();
        if(staf1) {
            value1.BBR00STAF1=staf1;
        }
        
        let pswd1:Object = this.refs['BBR00PSWD1'].getValueWithObject();
        if(pswd1) {
            value1.BBR00PSWD1=pswd1;
        }
        return value1;
    }

   //是否记住密码
    handleCheckbox(e){
        let isChecked = e.target.checked;
        if(isChecked){
            this.setState({
                isRemember: true
            })
        }else{
            this.setState({
                isRemember: false
            })
        }
    }

    //点击登录按钮，触发后台接口提供的验证，对数据的处理等方法

    handleClick(){
        let curVal = this.getValue();
        if(!curVal.BBR00STAF1 || curVal.BBR00STAF1 === null || curVal.BBR00STAF1.text==='' || curVal.BBR00STAF1.text=== null){
            this.setState({
                unameHelp: "* 用户名不能为空"
            })
        }else if(!curVal.BBR00PSWD1 ||curVal.BBR00PSWD1 === null || curVal.BBR00PSWD1.text==='' || curVal.BBR00PSWD1.text=== null){
            this.setState({
                unameHelp: "",
                upwdHelp: "* 密码不能为空"
            })
        }else{
            this.setState({ //清除help-block提示文字
                unameHelp: "",
                upwdHelp: ""
            });
  
            if(this.state.isRemember === true){ //是否记住密码，若记住，则保存至localstorage，反之，清除
                // let loginData = {this.state.BBR00STAF1,this.state.BBR00PSWD1};
                let loginData = {};
                loginData.BBR00STAF1 = curVal.BBR00STAF1;
                loginData.BBR00PSWD1 = curVal.BBR00PSWD1;
                if (typeof(Storage) !== "undefined") {
                    // Store
                    localStorage.setItem("mm_loginStatus", loginData);
                }
                //Data.localSetItem("mm_loginStatus",loginData);
            }else{
                if (typeof(Storage) !== "undefined") {
                    // Store
                    localStorage.clear();
                }

                //Data.localRemoveItem("jiaj-loginStatus");
            }
            let loginModel=this.props.commonProps.LOGIN_MODE;
            let loginMode2='';
            let cfcaUsers=this.props.commonProps.CFCA_TEL;

            if(loginModel && loginModel.indexOf(`${curVal.BBR00STAF1.text}=`)>-1){
                let loginIdx = loginModel.toString().indexOf(`${curVal.BBR00STAF1.text}=`);
                loginMode2 = loginModel.toString().substr(loginIdx+curVal.BBR00STAF1.text.length+1,1);
                if(loginMode2 === '6'){
                    // openFPFeature(evt);
                    return ;
                }
                loginMode2 = "1";
            }else{
                loginMode2 = "1";
            }

            if(loginMode2 === '1' && cfcaUsers && cfcaUsers.indexOf(curVal.BBR00STAF1.text)>-1){
                let signCFCA = new SignCFCA(); 
                let allCFCA = signCFCA.listAllCFCACert(this.props.commonProps.CA_TYPE);
                if(allCFCA && allCFCA.cadn && allCFCA.CertSubjectDN) {
                    let caInfo= {};
                    caInfo.cadn=allCFCA.cadn;
                    caInfo.cnName=allCFCA.CertSubjectDN;
                    this.props.login(caInfo);
                } else {
                    return ;
                }
            }
            this.props.login();
            console.log(this.state);
        }
    }

    getLoginModel(curRetuObj) {
        if(curRetuObj){
            if(curRetuObj.LOGIN_MODE){
                if(curRetuObj.LOGIN_MODE.selected_value && curRetuObj.LOGIN_MODE.selected_value.value){
                    return curRetuObj.LOGIN_MODE.selected_value.value.toString();
                }
            }
        }
        return null;
    }
    getCaType(curRetuObj) {
        if(curRetuObj){
            if(curRetuObj.CA_TYPE){
                if(curRetuObj.CA_TYPE.text){
                    return curRetuObj.CA_TYPE.text.toString();
                }
            }
        }
        return "2";
    }
        
    getCfcaUsers(curRetuObj) {
        if(curRetuObj){
            if(curRetuObj.CFCA_TEL){
                if(curRetuObj.CFCA_TEL.text){
                    return curRetuObj.CFCA_TEL.text.toString();
                }
            }
        }
        return "";
    }
        
    getCfcaCnName(curRetuObj) {
        if(curRetuObj){
            if(curRetuObj.CFCA_CNNAME){
                if(curRetuObj.CFCA_CNNAME.text){
                    return curRetuObj.CFCA_CNNAME.text.toString();
                }
            }
        }
        return "";
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps){
           return nextProps.shouldSubUpdate; 
        }
        return true;
    }

	render() {
		let styleObj = {
			display: this.props.loginVisible?'block':'none',
		}
		return (
		<div className="container" style={styleObj}>
	        <div className="row">
	            <div className="col-md-6 col-md-offset-3">
	                <div className="login-panel panel panel-default">
	                    <div className="panel-heading">
	                        <h3 className="panel-title">登   录</h3>
	                    </div>
	                    <div className="panel-body">
                            <Form horizontal>
	                            <FormGroup controlId="formHorizontalPassword">
                                    <UILabel text='机构号' columnSpan={1.25} />
                                    <UITextField columnSpan={2} ref="BBR00BRNO1" prompt='输入机构号' valueWithObject={this.state.BBR00BRNO1} name="BBR00BRNO1" autoFocus />
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPassword">
                                    <UILabel text='用户号' columnSpan={1.25} />
                                    <UITextField columnSpan={2} ref="BBR00STAF1" prompt='输入用户号'  valueWithObject={this.state.BBR00STAF1}  name="BBR00STAF1" />
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPassword">
                                    <UILabel text='密 码' columnSpan={1.25} />
                                    <UIPasswordField columnSpan={2} ref="BBR00PSWD1" valueWithObject={this.state.BBR00PSWD1}/>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPassword">
                                    <Checkbox inline>
                                        记住密码
                                    </Checkbox>
                                </FormGroup>
	                            <fieldset>
	                                <a className="btn btn-lg btn-success btn-block" onClick={this.handleClick}>登录</a>
	                            </fieldset>
	                        </Form>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
		)
	}
}
LoginForm.propTypes = {
    ClazzType:React.PropTypes.string,
    commonProps:React.PropTypes.object,
};

LoginForm.defaultProps = {
    ClazzType:'LoginForm',
    commonProps:{},
};
export default LoginForm; 