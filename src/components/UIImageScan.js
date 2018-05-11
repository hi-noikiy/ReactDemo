import React from 'react';

class UIImageScan extends React.Component {

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

UIImageScan.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UIImageScan.defaultProps = {
    ClazzType:'UIImageScan',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UIImageScan; 