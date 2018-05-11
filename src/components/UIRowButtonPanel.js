import React from 'react';
import UIButton from './UIButton';  
import {Col} from 'react-bootstrap';
class UIRowButtonPanel extends React.Component {

   constructor(props) {
    	super(props);
        this.dispatchEvent = this.dispatchEvent.bind(this); //构造函数中绑定
        this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.state = {
            visible:true,
        }

    }

    componentWillUpdate(nextProps,nextState){
		//console.log("componentWillUpdate"+nextProps);
	}
    dispatchEvent(evt){
        this.props.dispatchEvent(evt);
    }
    getValueWithObject(){
        let objSave =  this.props.valueWithObject;
        return objSave;
    }
	render() {
        let self = this;
        let ori = this.props.orientation2;
        if(this.props.valueWithObject.orientation){
            ori=this.props.valueWithObject.orientation;
        }

        let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }

		let styleObj = {
			display: this.state.visible? 'block':'none',
            textAlign: ori === 3 ? 'right' : ori === 2 ? 'center' : 'left',
		}

        let colStyleObj = {
            display: this.state.visible? 'block':'none',
        }

        let buttonList = [];
        this.props.buttons.forEach(function(msg,index){
            if(self.props.valueWithObject[msg.props.name]){
                let buttonValue=self.props.valueWithObject[msg.props.name];
                if(buttonValue.__visible__){
                    buttonList.push(<UIButton name={msg.name}  buttonProp={msg} buttonValue={buttonValue} key={msg.props.name} 
                         dispatchEvent={self.dispatchEvent}  parentName={self.props.name} />);
                }
            } else {
                buttonList.push(<UIButton parentName={self.props.name} name={msg.name} buttonProp={msg} key={msg.props.name} dispatchEvent={self.dispatchEvent} />);
            }
            
        });

		return (
            <Col sm={colSpan} style={colStyleObj}>
			    <div style={styleObj}>{buttonList}</div>
            </Col>
		)
	}
}

UIRowButtonPanel.propTypes = {
    ClazzType:React.PropTypes.string,
    buttons:React.PropTypes.array,
    valueWithObject:React.PropTypes.object,
    commonProps:React.PropTypes.object,
    orientation:React.PropTypes.string,
};

UIRowButtonPanel.defaultProps = {
    ClazzType:'UIRowButtonPanel',
    buttons:[],
    valueWithObject:{},
    commonProps:{},
};

export default UIRowButtonPanel; 