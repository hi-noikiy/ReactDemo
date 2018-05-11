import React from 'react';
import {Modal} from 'react-bootstrap';
import UIGridPanel from './UIGridPanel.js';
import ComponentUtil from './ComponentUtil.js';

class UIDialogPanel extends React.Component {

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
        return true;
    }
    render() {
        let textVal=this.props.commonProps.title;
        if(!textVal){
            textVal='';
        }

        let allComs = [];
        let cpf = this.state.data.CurrentPanelFields;

        let dialogBody = {
        	width: cpf!== undefined ? cpf.dialogWidth : 500,
        	height:cpf !== undefined ? cpf.dialogHeight : 500,
        	overflow: 'auto',
        } ;

        let dialogHeader = {
			width: cpf!== undefined ? cpf.dialogWidth : 500,
        } ;

        let modalCs = {
            width: cpf!== undefined ? cpf.dialogWidth : 500,
            marginLeft: 'auto',
            marginRight: 'auto',
        } ;

        let util = new ComponentUtil();
        allComs = util.createNewComponents(cpf);
        if(this.state.data.valueWithObject !== undefined){
            this.state.data.valueWithObject.__title__ = textVal;
        }
        let bodyPanel=<UIGridPanel valueWithObject={this.state.data.valueWithObject} allComs={allComs} inDialog={true}  dispatchEvent={this.props.dispatchEvent} />;
        return (
            <Modal
                show={this.state.show}
                onHide={this.hideModal}
                aria-labelledby="contained-modal-title-lg"
                bsSize="large"
                style={modalCs}
            >
            <Modal.Header style={dialogHeader}>
                <Modal.Title id="contained-modal-title-lg">{textVal}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={dialogBody}>
                {bodyPanel}
            </Modal.Body>
          </Modal>
        )
    }
}

UIDialogPanel.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UIDialogPanel.defaultProps = {
    ClazzType:'UIDialogPanel',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UIDialogPanel; 