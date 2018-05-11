import React from 'react';
import {
	Col
} from 'react-bootstrap';

import Select, {
	Option
} from 'uxcore-select2';
import '../api/Select/select.css';

class UIComboBox extends React.Component {
	constructor(props) {
		super(props);
		this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
		this.updateValue = this.updateValue.bind(this); //构造函数中绑定
		this.state = {
			selectValue: '',
		}
	}

	componentWillReceiveProps(nextProps) {
		this.state = {
			selectValue: '',
		};
	}

	getValueWithObject() {
		let objSave = this.props.valueWithObject;
		return objSave;
	}

	componentWillUpdate(nextProps, nextState) {
		//console.log("componentWillUpdate"+nextProps);
	}

	updateValue(newValue) {
		console.log("Selected: " + newValue);
		this.setState({
			selectValue: newValue,
		})
		if (this.props.valueWithObject !== undefined && this.props.valueWithObject) {
			let selected_value = {};
			if (this.props.valueWithObject.value_list !== undefined) {
				var valuesArray = this.props.valueWithObject.value_list.values;
				if (valuesArray && valuesArray.length > 0) {
					valuesArray.forEach(function(valueArray, index) {
						if (newValue === valueArray.value) {
							selected_value.text = valueArray.text;
						}
					});
				}
			}
			selected_value.value = newValue;
			this.props.valueWithObject.selected_value = selected_value;
			this.setState({
				selectValue: newValue,
			});
		}

		if (this.props.select !== undefined) {
			let compEvent = {};
			compEvent.ComponentName = this.props.select;
			compEvent.ActionName = this.props.name;
			compEvent.Action = "EVENT_SELECT";
			this.props.dispatchEvent(compEvent);
		}
	}

	render() {
		let styleObj = {
			display: this.props.visible ? 'block' : 'none',
		}
		let options = [];
		let id = 'default_combobox_id';
		let selectValue = '';
		let clearable = true;
		let searchable = true;
		if (this.props.valueWithObject !== undefined && this.props.valueWithObject) {
			styleObj = {
				display: this.props.valueWithObject.__visible__ ? 'block' : 'none',
			}
			if (this.props.valueWithObject.value_list !== undefined) {
				id = this.props.valueWithObject.value_list.id;
				let valuesArray = this.props.valueWithObject.value_list.values;
				if (valuesArray && valuesArray.length > 0) {
					valuesArray.forEach(function(valueArray, index) {
						options.push(<Option key={valueArray.value} value={valueArray.value}>{valueArray.text}</Option>);
					});
				}

				let selected_value = this.props.valueWithObject.selected_value;
				if (selected_value !== undefined) {
					selectValue = selected_value.value;
				} else {
					let default_value = this.props.valueWithObject.default_value;
					if (default_value !== undefined) {
						selectValue = default_value.value;
					}
				}
			}
		}
		if (options.length === 0) {
			selectValue = '';
		}
		let newSelectValue = selectValue;
		if (this.state.selectValue) {
			newSelectValue = this.state.selectValue;
		}

		let colSpan = 4;
		if (this.props.columnSpan > 1) {
			colSpan = 4 * this.props.columnSpan - 2;
		}

		let readOnly = false;
		if (this.props.valueWithObject) {
			readOnly = this.props.valueWithObject.__readOnly__;
		}

		let dropdownMatchSelectWidth = true;
		if (this.props.dropdownMatchSelectWidth !== undefined) {
			dropdownMatchSelectWidth = this.props.dropdownMatchSelectWidth;
		}

		let prefixCls = 'rc-select';
		if (this.props.prefixCls !== undefined) {
			prefixCls = this.props.prefixCls;
		}

		return (
			<Col sm={colSpan} style={styleObj} className={this.props.className}>
				<Select style={this.props.controlStyle} value={newSelectValue} prefixCls={prefixCls} transitionName='selectSlideUp' optionLabelProp='children' disabled={readOnly} onChange={this.updateValue} dropdownMatchSelectWidth={dropdownMatchSelectWidth} notFoundContent='不存在下拉选项' allowClear>
    				{options}
  				</Select>
			</Col>
		)
	}
}

UIComboBox.propTypes = {
	ClazzType: React.PropTypes.string,
	valueWithObject: React.PropTypes.object,
	commonProps: React.PropTypes.object,
};

UIComboBox.defaultProps = {
	ClazzType: 'UIComboBox',
	valueWithObject: {},
	name: '',
	commonProps: {},
	visible: true,
	percentWidth: 0,
	columnSpan: 1,
	buttons: [],
	chgPgSize: 0,
	perSize: 0,
	columns: [],
};

export default UIComboBox;