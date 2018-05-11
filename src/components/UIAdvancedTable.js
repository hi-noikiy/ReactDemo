import React from 'react';

class UIAdvancedTable extends React.Component {

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
		let styleObj = {
			display: this.state.visible? 'block':'none',
		}
		return (
			<span className="input-group-addon" style={styleObj}>{this.state.text}</span>
		)
	}
}

export default UIAdvancedTable; 