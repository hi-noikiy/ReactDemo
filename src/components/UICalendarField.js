import React from 'react';

import {
    FormControl,
    Col,
    FormGroup
} from 'react-bootstrap';

import '../api/DatePicker/stylesheets/react-datepicker.css';
import '../api/DatePicker/stylesheets/react-datepicker-cssmodules.css';

import DatePicker from '../api/DatePicker/datepicker.js';

import moment from 'moment';

class UICalendarField extends React.Component {

    constructor(props) {
        super(props);
        this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.changeValueHandle = this.changeValueHandle.bind(this); //构造函数中绑定
        this.onKeyPressHandle = this.onKeyPressHandle.bind(this); //构造函数中绑定

        this.state = {
            startDate: undefined,
        };

        if (this.props.valueWithObject) {
            let dateValue = this.props.valueWithObject.text;
            if (dateValue !== undefined && dateValue !== '' && dateValue !== '0') {
                let mm = moment(dateValue, 'YYYY-MM-DD');
                this.state = {
                    startDate: mm,
                };
            }
        }
    }
    getValueWithObject() {
        let objSave = this.props.valueWithObject;
        return objSave;
    }
    componentWillUpdate(nextProps, nextState) {
        this.state = {
            startDate: undefined,
        };
        if (this.props.valueWithObject) {
            let dateValue = this.props.valueWithObject.text;
            if (dateValue !== undefined && dateValue !== '' && dateValue !== '0') {
                let mm = moment(dateValue, 'YYYY-MM-DD');
                this.state = {
                    startDate: mm,
                };
            }
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps && nextProps.valueWithObject) {
            if (nextProps.valueWithObject.mandatory) {
                if (!nextProps.valueWithObject.text) {
                    this.setState({
                        controlId: 'formValidationError2',
                        validationState: 'error',
                    });
                } else {
                    this.setState({
                        controlId: 'formValidationSuccess2',
                        validationState: 'success',
                    });
                }
            }
        }
    }

    changeValueHandle(evt) {
        let objSave = this.props.valueWithObject;
        if (evt !== null && evt !== undefined && evt !== '') {
            objSave.text = evt.format("YYYYMMDD");

            this.setState({
                startDate: evt,
            });
        } else {
            objSave.text = '';

            this.setState({
                startDate: undefined,
            });
        }
        if (objSave.mandatory) {
            if (objSave.text) {
                this.setState({
                    controlId: 'formValidationSuccess2',
                    validationState: 'success',
                });
            } else {
                this.setState({
                    controlId: 'formValidationError2',
                    validationState: 'error',
                });
            }
        }

        if (this.props.changeValueHandle) {
            this.props.changeValueHandle(evt);
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

        let custClassName = 'form-control';
        if (this.props.inputClassName !== undefined) {
            custClassName = this.props.inputClassName;
        }

        let readOnly = false;
        if (this.props.valueWithObject) {
            readOnly = this.props.valueWithObject.__readOnly__;
        }

        return (
            <Col sm={colSpan} style={styleObj} className={this.props.className}>
                <FormGroup controlId={this.state.controlId} validationState={this.state.validationState} onKeyPress={this.onKeyPressHandle}>
                    <DatePicker dateFormat='YYYY-MM-DD' showYearDropdown showMonthDropdown locale='zh-cn'
                        name='default_calendarfield_id'  ref='default_calendarfield_id' className={custClassName}
                        placeholderText='点击选择日期' selected={this.state.startDate} disabled={readOnly}
                        onChange={this.changeValueHandle} >
                    </DatePicker>
                </FormGroup>
            </Col>
        )
    }
}

UICalendarField.propTypes = {
    ClazzType: React.PropTypes.string,
    valueWithObject: React.PropTypes.object,
    visible: React.PropTypes.bool,
    name: React.PropTypes.string,
};

UICalendarField.defaultProps = {
    ClazzType: 'UICalendarField',
    valueWithObject: {},
    visible: true,
    name: '',
    commonProps: {},
};

export default UICalendarField;