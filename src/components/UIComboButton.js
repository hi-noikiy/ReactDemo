import React from 'react';

class UIComboButton extends React.Component {

   constructor(props) {
    	super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.state = {
            text:'标题',
            visible:true,
        }
        this.props ={
        	valueWithObject:{},
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
		let styleObj = {
			display: this.state.visible? 'block':'none',
		}
		return (
			<span className="input-group-addon" style={styleObj}>{this.state.text}</span>
		)
	}
}

UIComboButton.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    name:React.PropTypes.string,
    commonProps:React.PropTypes.object,
};

UIComboButton.defaultProps = {
    ClazzType:'UIComboButton',
    valueWithObject:{},
    visible:true,
    name:'',
    commonProps:{},
};
export default UIComboButton; 