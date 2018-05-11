import React from 'react';
import {Col} from 'react-bootstrap';

import '../api/TitleGroup/titlegroup.css'
import TitleGroup from '../api/TitleGroup/TitleGroup.js';
import QueryTitleGroup from '../api/TitleGroup/QueryTitleGroup.js';

class UITitleGroup extends React.Component {
	constructor(props) {
		super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
	}
	
	getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}

	render() {
		let styleObj = {
			display: this.props.visible? 'block':'none',
		}

		let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }

        let groupCom = undefined ;
        if(this.props.tgStyle === 1) { //0-查询样式  1-一般样式
        	groupCom = <TitleGroup familyId={this.props.familyId}  always={this.props.always}  keypress={this.props.keypress} focusout={this.props.focusout} name={this.props.name} columnSpan={this.props.columnSpan} 
                    valueWithObject={this.props.valueWithObject} leftDesc={this.props.leftDesc} rightDesc={this.props.rightDesc} closedHeight={this.props.closedHeight} shrinkType={this.props.shrinkType}
                    text={this.props.text}  visible={this.props.visible} handleFamilyIdByClick={this.props.handleFamilyIdByClick} dispatchEvent={this.props.dispatchEvent} />
        } else {
        	groupCom = <QueryTitleGroup familyId={this.props.familyId}  always={this.props.always}  keypress={this.props.keypress} focusout={this.props.focusout} name={this.props.name} columnSpan={this.props.columnSpan} 
                    valueWithObject={this.props.valueWithObject} closedHeight={this.props.closedHeight} shrinkType={this.props.shrinkType}
                    text={this.props.text}  visible={this.props.visible} handleFamilyIdByClick={this.props.handleFamilyIdByClick} dispatchEvent={this.props.dispatchEvent} /> ;
        }
		
		return (
			<Col  sm={colSpan} ref="default_titlelgroup_id" 
            		style={styleObj} name={this.props.name}>
            	{groupCom}
            </Col>
		)
	}
}
UITitleGroup.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UITitleGroup.defaultProps = {
    ClazzType:'UITitleGroup',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};
export default UITitleGroup;