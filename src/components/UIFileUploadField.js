import React from 'react';
import {FormControl,Col} from 'react-bootstrap';

class UIFileUploadField extends React.Component {

   constructor(props) {
    	super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.changeValueHandle = this.changeValueHandle.bind(this); //构造函数中绑定
        this.state = {
            visible:true,
        }
    }
    getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}
    componentWillUpdate(nextProps,nextState){
		//console.log("componentWillUpdate"+nextProps);
	}
    changeValueHandle(evt) {
        let self = this;
        let files = evt.target.files;
        if(files.length)  {
            let file = files[0];  
            let reader = new FileReader();
            reader.onload = function(){
                //let unit8 = new Uint8Array(this.result);
                //let b64body = base64.Base64.encode(Array.from(unit8));
                self.props.valueWithObject.data = this.result;
                self.refs['upload_file_comp'].label='上传文件完成.';
                let compEvent = {};
                compEvent.ComponentName=self.props.name;
                compEvent.ActionName=self.props.name;
                compEvent.Action="EVENT_ACTION_PERFORM";
                compEvent.data='__uploadFile__';
                self.props.dispatchEvent(compEvent);
            };
            reader.onerror = function(){
                self.refs['upload_file_comp'].label='上传文件错误.';
            };
            reader.readAsDataURL(file);
            self.props.valueWithObject.filename=file.name;
        }
    }
	render() {
		let styleObj = {
			display: this.state.visible? 'block':'none',
		}
		let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }
		return (
            <Col sm={colSpan} style={styleObj} name={this.props.name} >
                <FormControl type="file" label="选择文件" ref='upload_file_comp' onChange={this.changeValueHandle} />
            </Col>
		)
	}
}

UIFileUploadField.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UIFileUploadField.defaultProps = {
    ClazzType:'UIFileUploadField',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UIFileUploadField; 