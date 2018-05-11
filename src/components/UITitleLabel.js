import React from 'react';
import {Col,Well,ControlLabel} from 'react-bootstrap';

class UITitleLabel extends React.Component {

   constructor(props) {
    	super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        
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
			display: this.props.visible? 'block':'none',
		}
		let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }
		return (
            <Col  sm={colSpan} ref="default_titlelabel_id"  componentClass={ControlLabel} 
            		style={styleObj} name={this.props.name}>
            		<Well bsSize="small">{this.props.text}</Well></Col>
		)
	}
}

UITitleLabel.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UITitleLabel.defaultProps = {
    ClazzType:'UITitleLabel',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UITitleLabel; 