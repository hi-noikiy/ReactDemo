import React from 'react';
import {Table, Column, HeaderCell, Cell } from 'rsuite-table';

class UITableRow extends React.Component {

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
				
		return (
			<Column  width = {this.props.width} sort={this.props.sort} resizable={this.props.resizable}><HeaderCell>{this.props.text}</HeaderCell>
                        <Cell dataKey={this.props.columnName} /></Column>
		)
	}
}

UITableRow.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UITableRow.defaultProps = {
    ClazzType:'UITableRow',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UITableRow; 