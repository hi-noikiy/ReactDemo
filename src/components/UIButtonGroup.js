import React from 'react';
import {Col} from 'react-bootstrap';

import UICheckBox from './UICheckBox.js';
import UIRadioButton from './UIRadioButton.js';

class UIButtonGroup extends React.Component {

   constructor(props) {
    	super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
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

	render() {
        let self = this;

		let styleObj = {
			display: this.state.visible? 'block':'none',
		}

        let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }

        let colStyleObj = {
            display: this.state.visible? 'block':'none',
        }

        let buttonList = [];
        this.props.buttons.forEach(function(msg,index){
            let buttonValue=self.props.valueWithObject[msg.props.name];
            if(msg.props.ClazzType === 'UICheckBox'){
                buttonList.push(<UICheckBox name={msg.props.name} keypress={msg.props.keypress} buttonProp={msg} valueWithObject={buttonValue} btnName={msg.props.name} key={msg.props.name} 
                    dispatchEvent={self.props.dispatchEvent}  parentName={self.props.name} text={msg.props.text} />);
            } else if(msg.props.ClazzType === 'UIRadioButton') {
                buttonList.push(<UIRadioButton name={self.props.name} keypress={msg.props.keypress} buttonProp={msg} valueWithObject={buttonValue} btnName={msg.props.name} key={msg.props.name} 
                    dispatchEvent={self.props.dispatchEvent}  parentName={self.props.name} text={msg.props.text} 
                    btnGroupValue={self.props} />);
            }
        });

		return (
            <Col sm={colSpan} style={colStyleObj} ref="default_buttonGroup_id">
                <div style={styleObj}>
			        {buttonList}
                </div>
            </Col>
		)
	}
}

UIButtonGroup.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    name:React.PropTypes.string,
    commonProps:React.PropTypes.object,
};

UIButtonGroup.defaultProps = {
    ClazzType:'UIButtonGroup',
    valueWithObject:{},
    visible:true,
    name:'',
    commonProps:{},
};

export default UIButtonGroup; 