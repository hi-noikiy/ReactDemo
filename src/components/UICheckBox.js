import React from 'react';
import {Checkbox} from 'react-bootstrap';

class UICheckBox extends React.Component {

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
			<Checkbox ref="default_checkBox_id" inline style={styleObj}  onChange={this.handleChange}>{textVal}</Checkbox>
		)
	}
}
UICheckBox.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    name:React.PropTypes.string,
    commonProps:React.PropTypes.object,
};

UICheckBox.defaultProps = {
    ClazzType:'UICheckBox',
    valueWithObject:{},
    visible:true,
    name:'',
    commonProps:{},
};
export default UICheckBox; 