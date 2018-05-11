import React from 'react';

import Select, { Option } from 'uxcore-select2';
import '../api/table/editcombo.css';

class UITableCombo extends React.Component {

   constructor(props) {
    	super(props);
    	this.handleChange = this.handleChange.bind(this); //构造函数中绑定

        this.state={
            selectValue:'',
        }
    }

    handleChange(newValue){
        this.setState({
            selectValue:newValue,
        });

    	this.props.handleAction(newValue, this.props.dataKey);
    }

    render() {
        let prefixCls='edit-rc-select';

        let newSelectValue=undefined;
        let comboText=this.props.commonProps[this.props.dataKey] ;
        let options = [];
        if(this.props.valueList !== undefined) {
            let valuesArray = this.props.valueList.value_list.values;
            if(valuesArray && valuesArray.length>0){
                for(let i=0; i<valuesArray.length; i++) {
                    let valueArray=valuesArray[i];
                    if(valueArray.text === comboText) {
                        newSelectValue=valueArray.value;
                    }

                    options.push(<Option key={valueArray.value} value={valueArray.value}>{valueArray.text}</Option>) ;
                }
            }
        }

        if(this.state.selectValue){
            newSelectValue = this.state.selectValue;
        }

		return (
            <Select value={newSelectValue} prefixCls={prefixCls} transitionName='selectSlideUp' optionLabelProp='children' onChange={this.handleChange} dropdownMatchSelectWidth={false} showArrow={false} notFoundContent='不存在下拉选项' allowClear>
                {options}
            </Select>
		)
	}
}

UITableCombo.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UITableCombo.defaultProps = {
    ClazzType:'UITableCombo',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UITableCombo; 