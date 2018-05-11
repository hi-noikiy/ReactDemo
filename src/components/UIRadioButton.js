import React from 'react';
import {Radio} from 'react-bootstrap';

class UIRadioButton extends React.Component {

   constructor(props) {
    	super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.handleChange = this.handleChange.bind(this);
    }

    getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}

    componentWillUpdate(nextProps,nextState){
		//console.log("componentWillUpdate"+nextProps);
	}

    handleChange(evt) {
        let onffVal = evt.target.checked;
        this.props.valueWithObject.onoff = onffVal;

        if(onffVal && this.props.btnGroupValue && this.props.btnGroupValue.buttons) {
            if(this.props.btnGroupValue.buttons.length > 0) {
                for (let i:int=0; i < this.props.btnGroupValue.buttons.length; i++) {
                    if(this.props.btnName !== this.props.btnGroupValue.buttons[i].props.name) {
                        let othRadio = this.props.btnGroupValue.valueWithObject[this.props.btnGroupValue.buttons[i].props.name] ;
                        othRadio.onoff = !onffVal ;
                    }
                }
            }
        }

        if(this.props.keypress !== undefined) {
            let delayInt = 2;
            if(parseInt(delayInt,10) > 0) {
                this.setState({isLoading: true});
                setTimeout(() => {
                  this.setState({isLoading: false});
                }, 1000*parseInt(delayInt,10));
            }

            let compEvent = {};
            compEvent.ComponentName=this.props.btnName;
            compEvent.ActionName=this.props.parentName;
            compEvent.Action="EVENT_ACTION_PERFORM";
            this.props.dispatchEvent(compEvent);
        }
    }

	render() {
		let styleObj = {
			display: this.props.visible? 'inline':'none',
		}

        let textVal=this.props.text;
        if(!textVal){
            textVal='';
        }
        
		return (
			<Radio ref="default_radioButton_id" inline style={styleObj} onChange={this.handleChange}  name={this.props.name}>{textVal} </Radio>
		)
	}
}

UIRadioButton.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UIRadioButton.defaultProps = {
    ClazzType:'UIRadioButton',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UIRadioButton; 