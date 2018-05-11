import React from 'react';
import {Modal} from 'react-bootstrap';
import UIGridPanel from './UIGridPanel.js';
import ComponentUtil from './ComponentUtil.js';

class ServiceCompositeDialog extends React.Component {

   constructor(props) {
    	super(props);
        this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.setValueWithObject = this.setValueWithObject.bind(this); //构造函数中绑定
        this.hideModal = this.hideModal.bind(this); //构造函数中绑定
        this.state = {
            show: false,
            data: {},
        }
    }

    hideModal() {
        this.setState({
            show: false,
            data: {},
        });
        this.props.closeSubServiceComposite(this.state.data);
    }

    componentWillReceiveProps(nextProps) {
        
    }

    setValueWithObject(valueWithObject,CurrentPanelFields){
        let data1 = this.state.data;
        data1.valueWithObject=valueWithObject;
        data1.CurrentPanelFields=CurrentPanelFields;
        this.setState({
            data: data1,
            show: true,
        });
    }
    getValueWithObject(){
        let objSave =  this.props.valueWithObject;
        return objSave;
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps){
           return nextProps.shouldSubUpdate; 
        }
        return true;
    }
	render() {
        let textVal=this.props.title;
        if(!textVal){
            textVal='';
        }
        let allComs = [];
        let util = new ComponentUtil();
        allComs = util.createNewComponents(this.state.data.CurrentPanelFields);
        let bodyPanel=<UIGridPanel valueWithObject={this.state.data.valueWithObject} allComs={allComs} inDialog={true}  dispatchEvent={this.props.dispatchEvent} />;
        return (
            <Modal
                show={this.state.show}
                onHide={this.hideModal}
                aria-labelledby="contained-modal-title-lg"
                bsSize="large"
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">{textVal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {bodyPanel}
            </Modal.Body>
          </Modal>
		)
	}
}

ServiceCompositeDialog.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

ServiceCompositeDialog.defaultProps = {
    ClazzType:'ServiceCompositeDialog',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default ServiceCompositeDialog; 