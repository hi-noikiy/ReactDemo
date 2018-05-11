import React from 'react';
import { DatePicker,TimePicker} from 'antd';
import {Col} from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class UIDateTime extends React.Component {

   constructor(props) {
    	super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
    	this.changeValueHandle = this.changeValueHandle.bind(this); //构造函数中绑定
        this.onOk = this.onOk.bind(this); //构造函数中绑定
        this.state = {
        }
        
    }
    getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}
    componentWillUpdate(nextProps,nextState){
		//console.log("componentWillUpdate"+nextProps);
	}
	changeValueHandle(value, dateString) {
        let format = 'YYYYMMDDTHHmmss';
        if(this.props.displayStyle === 1){
            format = 'YYYYMMDD';
        } else if(this.props.displayStyle === 2){
            format = 'HHmmss';
        }
        this.props.valueWithObject.text = value.format(format);
        
    }
    onOk(value) {
        console.log('onOk: ', value);
    }
	render() {
		let styleObj = {
			display: this.props.visible? 'block':'none',
		}
		let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }
        let use12Hours = false;
        // hourType: 0-24小时  1-12小时
        if(this.props.hourType === 1) {
            use12Hours = true;
        }
        let format = 'YYYY-MM-DD HH:mm:ss';
        // displayStyle : 0-同时显示日期和时间 1-只显示日期 2-只显示时间
        let defaultValue = undefined;
        let showTime = true;
        let readOnly = false;
        let textVal = '';
        if(this.props.valueWithObject){
            readOnly = this.props.valueWithObject.__readOnly__;
            textVal = this.props.valueWithObject.text;
        }
        if(textVal) {
            defaultValue = moment(textVal, 'YYYYMMDD');
        }
        if(this.props.displayStyle === 2){
            
            // let date = "2017-04-01 15:23:34";
            return (
                <Col sm={colSpan} style={styleObj} className={this.props.className} >
                    <TimePicker
                      disabled={readOnly}
                      use12Hours={use12Hours}
                      
                      
                      onChange={this.changeValueHandle}
                      onOk={this.onOk}
                    />
                </Col>
            )
        } else {
            if(this.props.displayStyle === 1){
                showTime = false;
                format = 'YYYY-MM-DD';
            }
            // let date = "2017-04-01 15:23:34";
            return (
                <Col sm={colSpan} style={styleObj} className={this.props.className} >
                    <DatePicker
                      disabled={readOnly}
                      
                      use12Hours = {use12Hours}
                      showTime={showTime}
                      format={format}
                      
                      onChange={this.changeValueHandle}
                      onOk={this.onOk}
                      defaultValue={defaultValue}
                    />
                </Col>
            )
        }

        
	}
}

UIDateTime.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UIDateTime.defaultProps = {
    ClazzType:'UIDateTime',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};
export default UIDateTime; 