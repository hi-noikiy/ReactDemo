import React from 'react';
import {Button} from 'react-bootstrap';

class UILink extends React.Component {

    constructor(props) {
    	super(props);
    	this.mouseClickEvent = this.mouseClickEvent.bind(this); //构造函数中绑定
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.state = {
            visible:true,
            isLoading: false,
        }
        
    }
    mouseClickEvent(evt){
        evt.preventDefault();
        
        this.props.openTaskList(this.props.valueWithObject);

    }
    getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}
    render() {
        let styleObj = {
            marginRight:5,
        }
        let isLoading = this.state.isLoading;
        let bsSy=false;
        if(this.props.buttonValue && this.props.buttonValue.__enabled__ === false){
            bsSy=true;
        }
        if(isLoading){
            bsSy=true;
        }
        let buttonText=this.props.text;
        if(this.props.buttonValue && this.props.buttonValue.text){
            buttonText=this.props.buttonValue.text;
        }
        buttonText=isLoading ? (buttonText+'...') : buttonText;
        let buttonName=this.props.name;
        
        return (
            <Button style={styleObj} disabled={bsSy} name={buttonName} bsStyle="link"  onClick={!isLoading ? this.mouseClickEvent:null}>{buttonText}</Button>
        )
    }
}

UILink.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    name:React.PropTypes.string,
    commonProps:React.PropTypes.object,
};

UILink.defaultProps = {
    ClazzType:'UILink',
    valueWithObject:{},
    visible:true,
    name:'',
    commonProps:{},
};

export default UILink; 