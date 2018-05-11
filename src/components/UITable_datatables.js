import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import 'datatables';
import 'datatables-tabletools';
import 'datatables-colreorder';
import 'datatables-scroller';
import 'datatables-bootstrap';


import $ from 'jquery'; // eslint-disable-line
import language from './locale';

$.fn.dataTable.ext.errMode = function handleError(e, settings, techNote, message) { // eslint-disable-line
  console.error(arguments);
};

class UITable extends React.Component  {

   constructor(props) {
    	super(props);
    	this.gridSelctClickEvent = this.gridSelctClickEvent.bind(this); //构造函数中绑定
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
    	this.state={
            
    	}
	}
	gridSelctClickEvent(_rowId){
        let rowIdIdx = $.inArray(_rowId, this.props.selectRowIds);
        if(rowIdIdx>-1){
            return;
        }
        
        let tableValue = this.props.valueWithObject;
        let curSelectValues = [];
        if(this.props._checkbox){
            curSelectValues = tableValue.selected_value;
        } else {
            this.props.selectRowIds.length = 0;
        }
        this.props.selectRowIds.push(_rowId);
        if(tableValue && tableValue.row && tableValue.row.constructor === Array){
            for(let i=0;i<tableValue.row.length;i++){
                let rowValue = tableValue.row[i];
                let key1=rowValue.__rowid;
                if(key1.toString() === _rowId){
                    curSelectValues.push(rowValue);
                    break;
                }
            }
        }
        tableValue.selected_value=curSelectValues;
        this.props.commonProps._selected=true;
        let compEvent = {};
        compEvent.ComponentName=this.props._select;
        compEvent.ActionName=this.props.name;
        compEvent.Action="EVENT_ACTION_PERFORM";
        this.props.dispatchEvent(compEvent);
	}
    componentWillUnmount() {
        const table = $(this.getTableDomNode()).DataTable(); // eslint-disable-line new-cap
        table.destroy();
    }
    componentDidMount() {
        let self = this;
        const options = Object.assign({
          language: language,          // 国际化语言设置
          ajax: this.props.dataSource,
          destroy: true,
          autoWidth: false,
          scrollX: '2000px',
          
        }, this.props);
        $(this.getTableDomNode()).DataTable(options); // eslint-disable-line new-cap
        const table = $(this.getTableDomNode()).DataTable(); // eslint-disable-line new-cap
        $('#default_table_id tbody').on( 'click', 'tr', function () {
            let _rowId=this.id;
            self.gridSelctClickEvent(_rowId);
            if ($(this).hasClass('selected') ) {
                //$(this).removeClass('selected');
            } else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
        $('#default_table_id').on( 'draw.dt', function () {
            //console.log( 'Redraw occurred at: '+new Date().getTime() );
        });
    }
    componentDidUpdate() {
        let tableValue = this.props.commonProps;
        if(tableValue) {
            if(!tableValue._selected){
                let table = $('#default_table_id').dataTable();
                table.fnClearTable(this);//动态刷新关键部分语句，只会根据后台数据有变化才会刷新
                table.fnAddData(this.props.data);
                table.fnDraw();
            } else {
                tableValue._selected=false;
            }
        }
        
        
    }
	getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}

    getTableDomNode() {
        return ReactDOM.findDOMNode(this);
    }

	render() {
		//const {columns, data, ajax, children} = this.props;
        
		return (
			<table width="100%" className="table table-striped table-bordered table-hover" 
                ref='default_table_id' name='default_table_id' id='default_table_id'>
                {this.props.children}
            </table>
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
    _select:React.PropTypes.string,
    
    _checkbox:React.PropTypes.bool,
    selectRowIds: React.PropTypes.array,
};

UITable.defaultProps = {
    ClazzType:'UITable',
    valueWithObject:{},
    name:'',
    commonProps:{},
    left:0,
    right:0,
    visible:true,
    width:0,
    height:0,
    x:0,
    y:0,
    percentWidth:0,
    columnSpan:1,
    buttons:[],
    chgPgSize:0,
    perSize:0,
    columnNames:[],
    allData:false,
    _select:'select',
    _checkbox:false,
    selectRowIds:[],
    
};

export default UITable; 