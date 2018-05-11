import React from 'react';

class UITableColumn extends React.Component {

   constructor(props) {
    	super(props);
      this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
  }
  getValueWithObject(){
    let objSave =  this.props.valueWithObject;
    return objSave;
  }
  
	render() {
		
		return (
			<div></div>
		)
	}
}

UITableColumn.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UITableColumn.defaultProps = {
    ClazzType:'UITableColumn',
    valueWithObject:{},
    name:'',
    commonProps:{},
    text:'',
    editable:true,
    columnName:'',
    visible:true,
    listId:'',
    formatID:'',
    columnWidth:0,
    textAlign:0,
    nodeType:0,
    allowExport:true,
};


export default UITableColumn; 