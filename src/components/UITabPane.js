import React from 'react';
import ComponentUtil from './ComponentUtil.js';
import UIGridPanel from './UIGridPanel.js';
import Tabs from '../api/tab/Tabs.js';

class UITabPane extends React.Component {

   constructor(props) {
    	super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.handleSelect = this.handleSelect.bind(this); //构造函数中绑定
        this.state = {
            visible: true,
            activeKey: 0,
        }
        
    }
    getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}
    componentWillUpdate(nextProps,nextState){
		//console.log("componentWillUpdate"+nextProps);
	}

    handleSelect(evtKey) {
        if(this.props.items !== undefined && this.props.items[evtKey] !== undefined) {
            let clickItem = this.props.items[evtKey] ;
            if(clickItem !== undefined) {
                if(clickItem.keypress !== undefined) {
                    let compEvent = {};
                    compEvent.ComponentName=clickItem.panelName;
                    compEvent.ActionName=this.props.name;
                    compEvent.Action="EVENT_ACTION_PERFORM";
                    this.props.dispatchEvent(compEvent);
                }
            }
        }

        this.setState({
            activeKey: evtKey,
        }) ;
    }

	render() {
        let tabsStyleObj = 'tabtab__folder__' ;
        let self = this;
        let panel = [];
        let itemsArray = this.props.items;
        let util = new ComponentUtil();
        if(itemsArray) {
            itemsArray.forEach(function(msg2,index2){
                
                let allComs = util.createNewComponents(msg2.bean);
                let oneVal = self.props.valueWithObject[msg2.name];
                let val = {};
                if(oneVal) {
                    val = oneVal[msg2.panelName];
                }
                panel.push(<UIGridPanel title={msg2.Text} activeKey={self.state.activeKey} 
                        valueWithObject={val} allComs={allComs} key={msg2.name} ref={msg2.name}  
                        dispatchEvent={self.props.dispatchEvent}  />);
            });
        }

		return (
			<Tabs  
                    activeKey={this.state.activeKey}  
                    style={tabsStyleObj}
                    addBackTab={false}
                    tabDeleteButton={false}
                    handleTabClick={this.handleSelect}
                    >
                  {panel}
                  
            </Tabs>
		)
	}
}

UITabPane.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
    items:React.PropTypes.array,
};

UITabPane.defaultProps = {
    ClazzType:'UITabPane',
    valueWithObject:{},
    visible:true,
    commonProps:{},
    items:[],
};

export default UITabPane; 