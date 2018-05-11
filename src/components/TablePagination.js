import React from 'react';
import UIExportButton from './UIExportButton.js' ;
import UIPageButton from './UIPageButton.js' ;

import '../api/table/table.css'

class TablePagination extends React.Component {

   constructor(props) {
    	super(props);
        this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.generateTableButton = this.generateTableButton.bind(this); //构造函数中绑定
    }


    getValueWithObject(){
        let objSave =  this.props.valueWithObject;
        return objSave;
    }
    componentWillUpdate(nextProps,nextState){
		//console.log("componentWillUpdate"+nextProps);
	}

    generateTableButton(bprop, btnProps) {
        if(bprop.indexOf('first') === 0) {
            return <UIPageButton key={bprop} parentName={this.props.parentName} dispatchEvent={this.props.dispatchEvent}
            iconClass='glyphicon glyphicon-step-backward' name={bprop} valueWithObject={btnProps} /> ;
        } else if(bprop.indexOf('pre') === 0) {
            return <UIPageButton key={bprop} parentName={this.props.parentName} dispatchEvent={this.props.dispatchEvent}
            iconClass='glyphicon glyphicon-triangle-left' name={bprop} valueWithObject={btnProps} /> ;
        } else if(bprop.indexOf('next') === 0) {
            return <UIPageButton key={bprop} parentName={this.props.parentName} dispatchEvent={this.props.dispatchEvent}
            iconClass='glyphicon glyphicon-triangle-right' name={bprop} valueWithObject={btnProps} /> ;
        } else if(bprop.indexOf('last') === 0) {
            return <UIPageButton key={bprop} parentName={this.props.parentName} dispatchEvent={this.props.dispatchEvent}
            iconClass='glyphicon glyphicon-step-forward' name={bprop} valueWithObject={btnProps} /> ;
        } else if(bprop.indexOf('export') === 0) {
            return <UIExportButton key={bprop} parentName={this.props.parentName} dispatchEvent={this.props.dispatchEvent}
            iconClass='icon iconfont icon-export' name={bprop} valueWithObject={btnProps} commonProps={{tdata:this.props.tdata} }   /> ;
        }
        return undefined ;
    }

	render() {
        let styleObj = {} ;
        if(this.props.visible) {
            styleObj.display = 'inline-block' ;
        } else {
            styleObj.display = 'none' ;
        }

        let buttonList = [] ;
        if(this.props.buttons !== undefined) {
            for (var bprop in this.props.buttons) {
                if(this.props.buttons.hasOwnProperty(bprop)) {
                    let tbtn = this.generateTableButton(bprop, this.props.buttons[bprop]) ;
                    if(tbtn !== undefined) {
                        buttonList.push(tbtn) ;
                    }
                }
            }
        }
                
		return (
            <div ref="default_tablePagination_id" style={styleObj} className='cs_tablePagination'>
                {buttonList}
            </div>
		)
	}
}

TablePagination.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    buttons:React.PropTypes.object,
    commonProps:React.PropTypes.object,
};

TablePagination.defaultProps = {
    ClazzType:'TablePagination',
    valueWithObject:{},
    visible:true,
    buttons:{},
    commonProps:{},
};

export default TablePagination; 