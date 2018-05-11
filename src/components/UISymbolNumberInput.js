import React from 'react';

import {
    InputGroup,
    Col
} from 'react-bootstrap';
import CurrencyInput from '../api/CurrencyInput/CurrencyInput.js';

class UISymbolNumberInput extends React.Component {

    constructor(props) {
        super(props);
        this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.changeValueHandle = this.changeValueHandle.bind(this); //构造函数中绑定
        this.onKeyPressHandle = this.onKeyPressHandle.bind(this); //构造函数中绑定
        this.state = {
            text: '标题',
            visible: true,
        }

    }
    getValueWithObject() {
        let objSave = this.props.valueWithObject;
        return objSave;
    }
    componentWillUpdate(nextProps, nextState) {
        //console.log("componentWillUpdate"+nextProps);
    }

    changeValueHandle(eValue) {
        let objSave = this.props.valueWithObject;
        let text = eValue;
        if (text !== undefined && text !== '') {
            objSave.text = text.replace(new RegExp(',', 'g'), '');
        }

        if (this.props.changeValueHandle) {
            this.props.changeValueHandle(eValue);
        }
    }

    onKeyPressHandle(evt) {
        let keynum = 0;
        if (evt.which) {
            keynum = evt.which;
        } else {
            keynum = evt.keyCode
        }
        if (keynum === 13) { //13为enter键
            if (this.props.keypress !== undefined) {
                evt.preventDefault();
                let compEvent = {};
                compEvent.ComponentName = this.props.keypress;
                compEvent.ActionName = this.props.name;
                compEvent.Action = "EVENT_ACTION_PERFORM";
                this.props.dispatchEvent(compEvent);
            }
        }
    }

    render() {
        let styleObj = {
            display: this.props.visible ? 'block' : 'none',
        }
        let colSpan = 4;
        if (this.props.columnSpan > 1) {
            colSpan = 4 * this.props.columnSpan - 2;
        }
        let textVal = '';
        if (this.props.valueWithObject) {
            textVal = this.props.valueWithObject.text;
        }
        let symbolClassName = 'input-group-addon';
        if (this.props.symbolClassName !== undefined) {
            symbolClassName = this.props.symbolClassName;
        }
        return (
            <Col sm={colSpan} style={styleObj} >
                <InputGroup>
                    <CurrencyInput displayType = '1' value = {textVal || ''} ref ='default_currencyfield_id' onChange = {this.changeValueHandle} 
                    thousandSeparator={this.props.kDivide?',':''} precision={this.props.decNumber} allowNegative={this.props.negative} autoAdd={this.props.autoAdd} onKeyPress={this.onKeyPressHandle} alignType={this.props.alignType} />
                    <label className={symbolClassName}>{this.props.symbol}</label>
                </InputGroup>                
            </Col>
        )
    }
}

UISymbolNumberInput.propTypes = {
    ClazzType: React.PropTypes.string,
    valueWithObject: React.PropTypes.object,
    visible: React.PropTypes.bool,
    commonProps: React.PropTypes.object,
};

UISymbolNumberInput.defaultProps = {
    ClazzType: 'UISymbolNumberInput',
    valueWithObject: {},
    visible: true,
    commonProps: {},
};

export default UISymbolNumberInput;