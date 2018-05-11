import React from 'react';
import {Col, Checkbox} from 'react-bootstrap';
import Table from '../api/table/Table.js';
import HeaderCell from '../api/table/HeaderCell.js';
import Cell from '../api/table/Cell.js';
import Column from '../api/table/Column.js';
import UITableLink from './UITableLink.js';
import UITableCheck from './UITableCheck.js';
import UITableAddHead from './UITableAddHead.js';
import UITableRemove from './UITableRemove.js';
import UITableField from './UITableField.js';
import UITableCombo from './UITableCombo.js';

import TablePagination from './TablePagination.js' ;
import '../api/table/table.css';

import ReactDOM from 'react-dom';
class UITable extends React.Component  {

   constructor(props) {
    	super(props);
    	this.gridSelctClickEvent = this.gridSelctClickEvent.bind(this); //构造函数中绑定
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.onRowSelect = this.onRowSelect.bind(this); //构造函数中绑定
        this.generateColumnWidth3 = this.generateColumnWidth3.bind(this); //构造函数中绑定
        this.handleAllChange = this.handleAllChange.bind(this);
        this.handleSingleChange = this.handleSingleChange.bind(this);
        this.querySelectRowId=this.querySelectRowId.bind(this);
        this.addRowDataAction=this.addRowDataAction.bind(this);
        this.removeRowDataAction=this.removeRowDataAction.bind(this);
        this.handleFieldEdit=this.handleFieldEdit.bind(this);
        this.handleFieldSelect=this.handleFieldSelect.bind(this);
        this.generateEmptyRow=this.generateEmptyRow.bind(this);
        
    	this.state={
            leftWidth: 1024,
            chkSelRid:[],
            allSelect:false,
    	}
	}

	gridSelctClickEvent(_rowId, rIndex){
        this.props.commonProps._rowIndex = rIndex ;

        if(this.props.commonProps.removeRow) {
            this.props.commonProps.removeRow = false ;

            this.props.data.splice(rIndex, 1) ;

            let tableValue = this.props.valueWithObject;
            if(tableValue && tableValue.row && tableValue.row.constructor === Array){
                tableValue.row.splice(rIndex, 1) ;
            }

            this.forceUpdate();

            return ;
        }

        if(this.props.checkbox) {
            return ;
        }
        let rowIdIdx = _rowId;
        if(rowIdIdx <= -1) {
            return;
        }
        let columnNames = this.props.columnNames;
        let actionFlag = false;
        if(columnNames){
            for(let index2=0; index2 < columnNames.length; index2++) {
                let msg2 = columnNames[index2];
                if(msg2.props.formatID && msg2.props.formatID === 'action'){
                    actionFlag=true;
                    break;
                 }
            }
            
        }
        if(actionFlag){
            return;
        }
        let tableValue = this.props.valueWithObject;
        if(this.props.lazyLoad) {
            if(this.props.lazyLevel === -1) {
                tableValue.row = this.props.commonProps.lazyOriData;
            }
        }
        let curSelectValues = [];
        if(tableValue && tableValue.row && tableValue.row.constructor === Array){
            if(!this.props.istree) {
                curSelectValues.push(tableValue.row[rIndex]);
            } else {
                let selectRow=this.querySelectRowId(tableValue.row, _rowId) ;
                if(selectRow!==undefined) {
                    curSelectValues.push(selectRow);
                }
            }
        }
        tableValue.selected_value=curSelectValues;
        this.props.commonProps._selected=true;

        if(this.props.lazyLoad) {
        	tableValue.lazyLoad_value=curSelectValues;
            this.props.commonProps.lazySelect=curSelectValues;
        }

        if(this.props.select !== undefined && this.props.select !== '') {
            let compEvent = {};
            compEvent.ComponentName=this.props.select;
            compEvent.ActionName=this.props.name;
            compEvent.Action="EVENT_ACTION_PERFORM";
            this.props.dispatchEvent(compEvent);
        }
	}
    querySelectRowId(rows, _rowId){
        if(rows === undefined || rows.length === 0) {
            return undefined;
        }

        for(let i=0, j=rows.length; i<j; i++) {
            let sinRow=rows[i] ;
            if(sinRow !== undefined) {
                let key1=sinRow.__rowid;
                if(key1 !== undefined && _rowId !== undefined && key1.toString() === _rowId.toString()){
                    return sinRow ;
                }

                if(sinRow.row && sinRow.row.constructor === Array){
                    let selRow=this.querySelectRowId(sinRow.row, _rowId) ;
                    if(selRow!==undefined) {
                        return selRow;
                    }
                }
            }
        }

        return undefined;
    }
    componentWillReceiveProps(nextProps,nextState){
        if(this.props.lazyLoad) {
            if(this.props.lazyLevel === 0 && nextProps.lazyLevel === -1) {
                let cloneTable = React.cloneElement(this) ;
                this.props.commonProps.lazyOriData=cloneTable.props.data;
            }

            if(nextProps.lazyLevel === -1 && this.props.commonProps.lazySelect) {
                let lazySelect=this.props.commonProps.lazySelect ;
                if(lazySelect !== undefined && lazySelect.length > 0) {
                    if(nextProps.data !== undefined && nextProps.data.length > 0) {
                        let nextDatas = nextProps.data;
                        if(nextDatas.length === 1) {
                            if(nextDatas[0][this.props.columnNames[0].props.columnName]==='加载中...') {
                                delete lazySelect[0].row;
                                this.forceUpdate();
                                return;
                            }
                        }
                        for(let i=0, j=nextDatas.length; i<j; i++) {
                            let nrowdata=nextDatas[i];
                            nrowdata['row']=[this.generateEmptyRow('加载中...')];
                        }
                        lazySelect[0].row=nextDatas;
                    } else {
                        delete lazySelect[0].row;
                    }

                    this.forceUpdate();
                }
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        let tableValue = this.props.commonProps;
        if(tableValue._selected){
            tableValue._selected=false;
            return false;
        }
        return true;
    }
    componentWillUnmount() {
        
    }
    componentDidMount() {
        let all=false;
        let checkSelRows=[] ;
        if(this.props.data) {
            for(let i=0; i<this.props.data.length; i++) {
                let rowData = this.props.data[i] ;
                if(rowData.isSelected !== undefined) {
                    checkSelRows.push(rowData.__rowid) ;
                }
            }

            if(checkSelRows.length > 0 && this.props.data.length === checkSelRows.length) {
                all=true;
            }
        }

        let leftWidth=ReactDOM.findDOMNode(this.refs['default_table_col']).offsetWidth - 5;
        this.setState({
            leftWidth:leftWidth,
            chkSelRid:checkSelRows,
            allSelect:all,
        });
    }
    componentDidUpdate() {
                
    }
	getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}

    onRowSelect(row, rIndex) {
      let _rowId=row['__rowid'];
      this.gridSelctClickEvent(_rowId, rIndex);
    }

    generateColumnWidth3(column, tfontsize):Number {
        if(!column.props.visible) {
            return 0 ;
        }
        
        let colWidth:int = -1 ;
        if(column.props["columnWidth"] !== undefined && column.props["columnWidth"] > 0) {
            colWidth = column.props["columnWidth"] ;
        }
        
        let headLen = column.props.text.length ;
        let colLen = (headLen+2) * tfontsize + 12 ;
        if(colWidth === -1) {
            if(colLen < 100) {
                return 100;
            } else {
                return colLen;
            }
        }
        
        if(headLen <= 8) {
            if(colWidth <= 10) {
                if(colLen < 100) {
                    return 100;
                }
                return colLen ;
            }
            
            if(colWidth <= 15) {
                if(colLen < 150) {
                    return 150;
                }
                return colLen;
            }
            
            if(colWidth <= 36) {
                if(colLen < 200) {
                    return 200;
                }
                return colLen ;
            }
            
            if(colWidth <= 50) {
                return 200;
            }
            
            if(colWidth > 50) {
                return 300;
            }
        }
        
        if(headLen > 8 && headLen <= 12){
            if(colWidth <= 15) {
                return colLen;
            }
            
            if(colWidth <= 36) {
                return 200;
            }
        }
        
        if(colWidth > 36 && colWidth <= 50) {
            return 300 ;
        }
        
        if(colWidth > 50) {
            return 400 ;
        }
        
        if(headLen > 12) {
            return colLen;
        }
        
        return colLen;
    }

    getLastVisibleColumn(columnNames,curCol){
        for(let i:int= columnNames.length - 1; i >= 0; i--)
        {
            let column = columnNames[i] ;
            if(column.props.visible){
                return curCol.props.columnName === column.props.columnName ;
            }
        }
        return false ;
    }

    addRowDataAction(evt) {
        let rowDatas = this.generateEmptyRow();
        if(rowDatas !== undefined) {
            this.props.data.push(rowDatas);

            this.forceUpdate();
        }
    }

    generateEmptyRow(defText) {
    	let rowDatas = undefined ;
        let columnNames = this.props.columnNames;
        if(columnNames && columnNames.length > 0){
        	rowDatas = {} ;

            for(let index2=0; index2 < columnNames.length; index2++) {
                let msg2 = columnNames[index2];
                let key1=msg2.props.columnName;
                rowDatas[key1] = '';
            }

            if(defText !== undefined && defText !== '') {
				rowDatas[columnNames[0].props.columnName] = defText;
            }
        }

        return rowDatas;
    }

    removeRowDataAction(evt) {
        /**
        * 原因是点击删除键后, 先执行此方法，再执行Select方法
        */
        this.props.commonProps.removeRow = true ;
    }

    handleFieldEdit(text, dataKey) {
        if(this.props.commonProps._rowIndex !== -1) {
            let tableValue = this.props.valueWithObject;
            if(tableValue && tableValue.row && tableValue.row.constructor === Array){
                let editRow=tableValue.row[this.props.commonProps._rowIndex] ;
                editRow[dataKey]=text;
            }
        }
    }

    handleFieldSelect(text, dataKey) {
        if(this.props.commonProps._rowIndex !== -1) {
            let tableValue = this.props.valueWithObject;
            if(tableValue && tableValue.row && tableValue.row.constructor === Array){
                let editRow=tableValue.row[this.props.commonProps._rowIndex] ;
                editRow[dataKey]=text;
            }
        }
    }

    handleAllChange(evt) {
        let onffVal = !this.state.allSelect;
        if(onffVal) {
            let checkSelRows=[] ;
            if(this.props.data) {
                for(let i=0; i<this.props.data.length; i++) {
                    let rowData = this.props.data[i] ;
                    checkSelRows.push(rowData.__rowid) ;
                }
            }

            this.setState({
                chkSelRid:checkSelRows,
                allSelect:onffVal,
            });
        } else {
            this.setState({
                chkSelRid:[],
                allSelect:onffVal,
            });
        }

        let tableValue = this.props.valueWithObject;
        let curSelectValues = [];
        if(onffVal) {
            if(tableValue && tableValue.row && tableValue.row.constructor === Array){
                for(let i=0;i<tableValue.row.length;i++){
                    let rowValue = tableValue.row[i];
                    curSelectValues.push(rowValue);
                }
            }
        }
        tableValue.selected_value=curSelectValues;

        if(this.props.select !== undefined) {
            if(onffVal || (!onffVal && this.props.checkSend) && curSelectValues.length > 0) {
                let compEvent = {};
                compEvent.ComponentName=this.props.select;
                compEvent.ActionName=this.props.name;
                compEvent.Action="EVENT_ACTION_PERFORM";
                this.props.dispatchEvent(compEvent);
            }
        }
    }

    handleSingleChange(evt, cProps) {
        let tableValue = this.props.valueWithObject;
        let selRowId=cProps['__rowid'];
        let curSelectValues = tableValue.selected_value;
        if(curSelectValues === undefined) {
            curSelectValues = [];
        }

        let onffVal = evt.target.checked;
        let checkSelRows=this.state.chkSelRid;
        if(onffVal) {
            if(checkSelRows === undefined) {
                checkSelRows=[] ;
            }

            if(checkSelRows.indexOf(selRowId) === -1) {
                checkSelRows.push(selRowId) ;
            }

            if(tableValue && tableValue.row && tableValue.row.constructor === Array){
                for(let i=0;i<tableValue.row.length;i++){
                    let rowValue = tableValue.row[i];
                    let key1=rowValue.__rowid;
                    if(key1 !== undefined && key1.toString() === selRowId.toString()){
                        curSelectValues.push(rowValue);
                        break;
                    }
                }
            }

            let all=(this.props.data.length === checkSelRows.length) ;

            this.setState({
                chkSelRid:checkSelRows,
                allSelect:all,
            });
        } else {
            let selIndex=checkSelRows.indexOf(selRowId) ;
            if(selIndex !== -1) {
                checkSelRows.splice(selIndex, 1) ;
            }

            let unselIndex = -1 ;
            for(let i=0;i<curSelectValues.length;i++){
                let rowValue = curSelectValues[i];
                let key1=rowValue.__rowid;
                if(key1 !== undefined && key1.toString() === selRowId.toString()){
                    unselIndex = i;
                    break;
                }
            }
            if(unselIndex !== -1) {
                curSelectValues.splice(unselIndex, 1) ;
            }

            let all=(this.props.data.length === checkSelRows.length) ;
            this.setState({
                chkSelRid:checkSelRows,
                allSelect:all,
            });
        }

        tableValue.selected_value=curSelectValues;

        if(this.props.select !== undefined) {
            if(onffVal || (!onffVal && this.props.checkSend)) {
                let compEvent = {};
                compEvent.ComponentName=this.props.select;
                compEvent.ActionName=this.props.name;
                compEvent.Action="EVENT_ACTION_PERFORM";
                this.props.dispatchEvent(compEvent);
            }
        }
    }

	render() {
        let styleObj = {
            display: this.props.visible? 'block':'none',
        }

        let tpvisible=false ;
        if(this.props.valueWithObject.buttons !== undefined) {
            let buttonProps = Object.getOwnPropertyNames(this.props.valueWithObject.buttons) ;
            if(buttonProps !== undefined && buttonProps.length > 0) {
                tpvisible = true ;
            }
        }

        let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }

		let colunmNameList = [];

        if(this.props.editable && this.props.addRemove) {
            let checkboxCol = <Column key='_addRemoveKey_' width={30} align='center' fixed><HeaderCell align='center'><UITableAddHead iconClass='glyphicon glyphicon-plus' handleAction={this.addRowDataAction}></UITableAddHead></HeaderCell>
                                <Cell dataKey='_addRemoveDKey'><UITableRemove iconClass='glyphicon glyphicon-minus' handleAction={this.removeRowDataAction}></UITableRemove></Cell></Column>;
            colunmNameList.push(checkboxCol);
        }

        if(this.props.checkbox) {
            let checkboxCol = <Column key='_checkboxkey_' width={30} align='center' fixed><HeaderCell align='center'><Checkbox className='checkbox_table' checked={this.state.allSelect} onChange={this.handleAllChange}></Checkbox></HeaderCell>
                                <CheckBoxCell dataKey='_checkboxDKey' selectDatas={this.state.chkSelRid} handleSingleChange={this.handleSingleChange} /></Column>;
            colunmNameList.push(checkboxCol);
        }

        let columnNames = this.props.columnNames;
        let self = this;
        let leftWidth = this.state.leftWidth;
        if(columnNames){
            for(let index2=0; index2 < columnNames.length; index2++) {
                let msg2 = columnNames[index2];
                let key1=msg2.props.columnName;
                msg2.key=key1;
                if(msg2.props.visible) {
                    let colWidth =  self.generateColumnWidth3(msg2,12);
                    if(self.getLastVisibleColumn(columnNames,msg2)){
                        if(leftWidth>colWidth){
                            colWidth=leftWidth;
                        }
                    } else {
                        leftWidth -= colWidth;
                    }

                    /**
                    * 0-左对齐 1-右对齐 2-居中
                    */
                    let textAlign = msg2.props.textAlign === 2 ? 'center' : msg2.props.textAlign === 1 ? 'right' : 'left' ;

                   /**
                    * digit-数字, amount-金额(#####.## <-> ##,###.##), 
                    * date-日期(yyyyMMdd <-> yyyy-MM-dd), time-时间(HHmmss <-> HH:mm:ss),
                    * dateTime-日期和时间(yyyyMMdd HHmmss <-> yyyy-MM-dd HH:mm:ss),
                    * amount4-金额(#####.#### <-> ##,###.####),
                    * amount6-金额(#####.###### <-> ##,###.######),
                    * action-按钮
                    **/
                    let col = undefined;
                    if(msg2.props.formatID && msg2.props.formatID === 'action'){
                        col = <Column key={key1} width={colWidth} sort resizable><HeaderCell>{msg2.props.text}</HeaderCell>
                                <ActionCell openTaskList={self.props.openTaskList} dataKey={msg2.props.columnName} /></Column>;
                    } else if(this.props.editable && msg2.props.editable) {
                        if(msg2.props.listId !== undefined) {
                            col = <Column key={key1} width={colWidth} align={textAlign} sort resizable><HeaderCell align='center'>{msg2.props.text}</HeaderCell>
                                <ComboCell dataKey={msg2.props.columnName} valueList={self.props.valueWithObject[msg2.props.listId]} handleSelect={this.handleFieldSelect}/></Column>;
                        } else {
                            col = <Column key={key1} width={colWidth} align={textAlign} sort resizable><HeaderCell align='center'>{msg2.props.text}</HeaderCell>
                                <TextFieldCell dataKey={msg2.props.columnName} handleEdit={this.handleFieldEdit}/></Column>;
                        }
                    } else if(msg2.props.formatID && msg2.props.formatID === 'digit') {
                        col = <Column key={key1} width={colWidth} align={textAlign} sort resizable><HeaderCell align='center'>{msg2.props.text}</HeaderCell>
                                <DigitCell dataKey={msg2.props.columnName} /></Column>;
                    } else if(msg2.props.formatID && msg2.props.formatID === 'amount') {
                        col = <Column key={key1} width={colWidth} align={textAlign} sort resizable><HeaderCell align='center'>{msg2.props.text}</HeaderCell>
                                <AmountCell dataKey={msg2.props.columnName} /></Column>;
                    } else if(msg2.props.formatID && msg2.props.formatID === 'date') {
                        col = <Column key={key1} width={colWidth} align={textAlign} sort resizable><HeaderCell align='center'>{msg2.props.text}</HeaderCell>
                                <DateCell dataKey={msg2.props.columnName} /></Column>;
                    } else if(msg2.props.formatID && msg2.props.formatID === 'time') {
                        col = <Column key={key1} width={colWidth} align={textAlign} sort resizable><HeaderCell align='center'>{msg2.props.text}</HeaderCell>
                                <TimeCell dataKey={msg2.props.columnName} /></Column>;
                    } else if(msg2.props.formatID && msg2.props.formatID === 'dateTime') {
                        col = <Column key={key1} width={colWidth} align={textAlign} sort resizable><HeaderCell align='center'>{msg2.props.text}</HeaderCell>
                                <DateTimeCell dataKey={msg2.props.columnName} /></Column>;
                    } else if(msg2.props.formatID && msg2.props.formatID === 'amount4') {
                        col = <Column key={key1} width={colWidth} align={textAlign} sort resizable><HeaderCell align='center'>{msg2.props.text}</HeaderCell>
                                <Amount4Cell dataKey={msg2.props.columnName} /></Column>;
                    } else if(msg2.props.formatID && msg2.props.formatID === 'amount6') {
                        col = <Column key={key1} width={colWidth} align={textAlign} sort resizable><HeaderCell align='center'>{msg2.props.text}</HeaderCell>
                                <Amount6Cell dataKey={msg2.props.columnName} /></Column>;
                    } else {
                        col = <Column key={key1} width={colWidth} align={textAlign} sort resizable><HeaderCell align='center'>{msg2.props.text}</HeaderCell>
                                <Cell dataKey={msg2.props.columnName} /></Column>;
                    }
                    colunmNameList.push(col);
                }
            }
        }

        let rowIndex = 10 ;
        if(!this.props.istree && !this.props.editable) {
        	if(this.props.data !== undefined) {
	            if(this.props.data.length > 4) {
	                rowIndex = this.props.data.length > 10 ? 10 : this.props.data.length ;
	            } else {
	            	rowIndex = 4;
	            }
        	}
        }

        let tdata=this.props.data;
        if(this.props.lazyLoad) {
            if(this.props.lazyLevel === undefined || this.props.lazyLevel === 0) {
                if(tdata !== undefined && tdata.length > 0) {
                    for(let i=0, j=tdata.length; i<j; i++) {
                        let trowdata=tdata[i];
                        trowdata['row']=[this.generateEmptyRow('加载中...')];
                    }
                }
            } else {
                tdata=this.props.commonProps.lazyOriData;
            }
        }
        if(tdata === undefined) {
            tdata = [] ;
        }
        if (this.props.valueWithObject.buttons.export != undefined) {
            this.props.valueWithObject.exportdata = this.props.valueWithObject.buttons.export.data;
        }

		return (
            <Col sm={colSpan} style={styleObj} ref='default_table_col' >
        		<Table data={tdata} ref='default_table_id' isTree={this.props.istree} height={rowIndex * 37} onRowClick={this.onRowSelect} >
                     {colunmNameList}
                </Table>
                <TablePagination visible={tpvisible} dispatchEvent={this.props.dispatchEvent} 
                parentName={this.props.name} buttons={this.props.valueWithObject.buttons} tdata = {this.props.valueWithObject.exportdata} />
            </Col>    
        )
	}
}

UITable.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    commonProps:React.PropTypes.object,
    dataSource: React.PropTypes.func,
    children: React.PropTypes.node,
    columns: React.PropTypes.array,
    order: React.PropTypes.array,
    select:React.PropTypes.string,
};

UITable.defaultProps = {
    ClazzType:'UITable',
    valueWithObject:{},
    name:'',
    commonProps:{},
    visible:true,
    percentWidth:0,
    columnSpan:1,
    buttons:[],
    chgPgSize:0,
    perSize:0,
    columnNames:[],
    select:'',
};

const DigitCell = ({ rowData, dataKey, ...props }) => {
    let actionData = rowData[dataKey];
    if(!actionData) {
        actionData = '0';
    }

    return (
        <Cell {...props}>
            {actionData}
        </Cell>
    );
}

const DateCell = ({ rowData, dataKey, ...props }) => {
    let actionData = rowData[dataKey];
    return (
        <Cell {...props}>
            {actionData}
        </Cell>
    );

}

const TimeCell = ({ rowData, dataKey, ...props }) => {
    let actionData = rowData[dataKey];
    return (
        <Cell {...props}>
            {actionData}
        </Cell>
    );
}
const DateTimeCell = ({ rowData, dataKey, ...props }) => {
    let actionData = rowData[dataKey];
    return (
        <Cell {...props}>
            {actionData}
        </Cell>
    );
}
const AmountCell = ({ rowData, dataKey, ...props }) => {
    let actionData = rowData[dataKey];
    if(!actionData) {
        actionData='0.00';
    }
    return (
        <Cell {...props}>
            {actionData}
        </Cell>
    );
}
const Amount4Cell = ({ rowData, dataKey, ...props }) => {
    let actionData = rowData[dataKey];
    if(!actionData) {
        actionData='0.0000';
    }
    return (
        <Cell {...props}>
            {actionData}
        </Cell>
    );
}
const Amount6Cell = ({ rowData, dataKey, ...props }) => {
    let actionData = rowData[dataKey];
    if(!actionData) {
        actionData='0.000000';
    }
    return (
        <Cell {...props}>
            {actionData}
        </Cell>
    );
}

const CheckBoxCell = ({rowData, dataKey, ...props }) => {
    let rchk = false ;
    if(props.selectDatas) {
        for(let i=0; i<props.selectDatas.length; i++) {
            let dataId = props.selectDatas[i] ;
            if(dataId === rowData['__rowid']) {
                rchk = true ;
                break;
            }
        }
    }
    return (
        <Cell {...props}>
            <UITableCheck checked={rchk} commonProps={rowData} handleAction={props.handleSingleChange}></UITableCheck>
        </Cell>
    );
}

const TextFieldCell = ({rowData, dataKey, ...props }) => {
    return (
        <Cell {...props}>
            <UITableField commonProps={rowData} dataKey={dataKey} handleAction={props.handleEdit}></UITableField>
        </Cell>
    );
}

const ComboCell = ({rowData, dataKey, ...props }) => {
    return (
        <Cell {...props}>
            <UITableCombo commonProps={rowData} dataKey={dataKey} valueList={props.valueList} handleAction={props.handleSelect}></UITableCombo>
        </Cell>
    );
}

const ActionCell = ({ rowData, dataKey, ...props }) => {
    let actionData = rowData[dataKey];
    let actionLabel = [];
    if(actionData.constructor === Array) {
        for(let actionIndex=0;actionIndex<actionData.length;actionIndex++){
            let actionDataItem = actionData[actionIndex];
            actionLabel.push(<UITableLink key={actionDataItem.VALUE} __rowid={rowData.__rowid} handleAction={props.openTaskList} commonProps={actionDataItem} />);
        }
    }
    
    return (
        <Cell {...props}>
            {actionLabel}
        </Cell>
    );
}

export default UITable; 