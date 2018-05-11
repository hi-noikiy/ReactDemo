import React from 'react';
import UIGridPanel from './UIGridPanel.js';
import UIEmptyPanel from './UIEmptyPanel.js';
import {Breadcrumb} from 'react-bootstrap';
import Tabs from '../api/tab/Tabs.js';
import UIDialogPanel from './UIDialogPanel.js';
import UILink from './UILink.js';

import ComponentUtil from './ComponentUtil.js';

class RightPage extends React.Component {
    constructor(props) {
        super(props);
        this.setValueWithObject = this.setValueWithObject.bind(this); //构造函数中绑定
        this.handleTabDeleteButton = this.handleTabDeleteButton.bind(this); //构造函数中绑定
        this.dispatchEvent = this.dispatchEvent.bind(this); //构造函数中绑定
        this.handleTabClick = this.handleTabClick.bind(this); //构造函数中绑定
        this.handleAddBackTab = this.handleAddBackTab.bind(this); //构造函数中绑定
       
        this.state = {
            data:[{ title:'默认工作区',
                    allComs:[],
                    valueWithObject:{},
                    menuArrays:[{id:'myworkspace',title:'我的工作台',text:'我的工作台'}],
                    curMenuObject: {id:'menu_myworkspace'},
                }],
            activeKey: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.taskCountRoot){
            let data1 = this.state.data;
            let data = this.state.data[this.state.activeKey];
            let comLink = [];
            if(data!==undefined&&data.allComs!==undefined) {
                if(data.allComs.length === 0) {
                    if(nextProps.taskCountRoot.FXNAME3){
                        let fxname3 = nextProps.taskCountRoot.FXNAME3;
                        let comProps3 = {};
                        comProps3.name=fxname3.NAME+fxname3.VALUE;
                        comProps3.text=fxname3.text;
                        comProps3.valueWithObject=fxname3;
                        comProps3.commonProps={};
                        comProps3.visible=true;
                        comProps3.columnSpan=4;
                        let link3 = new UILink(comProps3);
                        comLink.push(link3);
                    }
                    if(nextProps.taskCountRoot.FXNAME1 && nextProps.taskCountRoot.FXNAME1.constructor === Array){
                        let FXNAME1 = nextProps.taskCountRoot.FXNAME1;
                        for (var i = 0; i < FXNAME1.length; i++) {
                            let fxname1 = FXNAME1[i];
                            let comProps1 = {};
                            comProps1.name=fxname1.NAME+fxname1.VALUE;
                            comProps1.text=fxname1.text;
                            comProps1.valueWithObject=fxname1;
                            comProps1.commonProps={};
                            comProps1.visible=true;
                            comProps1.columnSpan=1;
                            let link1 = new UILink(comProps1);
                            comLink.push(link1);
                        }
                    }
                    data1[this.state.activeKey].allComs=comLink;
                    this.setState({data: data1,});
                }
            }
        }
    }
    handleAddBackTab() {
        let data = this.state.data;
        let length = data.length;
        let title = "新工作区" + length;
        let comLink = [];
        if(this.props.taskCountRoot){
            if(this.props.taskCountRoot.FXNAME3){
                let fxname3 = this.props.taskCountRoot.FXNAME3;
                let comProps3 = {};
                comProps3.name=fxname3.NAME+fxname3.VALUE;
                comProps3.text=fxname3.text;
                comProps3.valueWithObject=fxname3;
                comProps3.commonProps={};
                comProps3.visible=true;
                comProps3.columnSpan=4;
                let link3 = new UILink(comProps3);
                comLink.push(link3);
            }
            if(this.props.taskCountRoot.FXNAME1 && this.props.taskCountRoot.FXNAME1.constructor === Array){
                let FXNAME1 = this.props.taskCountRoot.FXNAME1;
                for (var i = 0; i < FXNAME1.length; i++) {
                    let fxname1 = FXNAME1[i];
                    let comProps1 = {};
                    comProps1.name=fxname1.NAME+fxname1.VALUE;
                    comProps1.text=fxname1.text;
                    comProps1.valueWithObject=fxname1;
                    comProps1.commonProps={};
                    comProps1.visible=true;
                    comProps1.columnSpan=1;
                    comProps1.column=1;
                    let link1 = new UILink(comProps1);
                    comLink.push(link1);
                }
            }
        }
        data.push({title: title,
                    allComs:comLink,
                    valueWithObject:{},
                });
        this.setState({data: data, 
            activeKey: data.length-1});
        this.props.handleTabClick();
    }
    handleTabClick(key) {
       this.setState({activeKey: key});
       this.props.handleTabClick();
    }
    handleTabDeleteButton() {
        let data = this.state.data;
        let activeKey = this.state.activeKey;
        data.splice(activeKey, 1); // delete the selected key
        // count the active key
        if (data.length <= activeKey + 1)
          activeKey = data.length - 1;
        this.setState({
          data: data,
          activeKey: activeKey
        })
        this.props.handleTabClick();
    }
    setValueWithObject(valueWithObject,CurrentPanelFields,curMenuObject,menuArrays,currentSubSCName,panelName){
        if(valueWithObject===undefined&&CurrentPanelFields===undefined) {
            let dataClear = this.state.data;
            dataClear[this.state.activeKey].allComs = undefined;
            dataClear[this.state.activeKey].valueWithObject = undefined;
            this.setState({
              data: dataClear,
            });
            return;
        }

        let allComs = [];
        let util = new ComponentUtil();
        allComs = util.createNewComponents(CurrentPanelFields);
        // let curTabPanel = this.refs['gridpanel'+this.state.activeKey];
        // curTabPanel.setValueWithObject(valueWithObject,allComs);
        if(CurrentPanelFields && CurrentPanelFields.ClazzType === 'UIDialogPanel') {
            this.props.commonProps.title=CurrentPanelFields.title;
            this.props.commonProps.panelName=panelName;
            this.props.commonProps.allComs2=this.state.data[this.state.activeKey].allComs;
            this.props.commonProps.panelName2=this.props.commonProps.panelName;
            this.props.commonProps.showDialog=true;
            this.refs['uiDialagPanel'].setValueWithObject(valueWithObject,CurrentPanelFields);
            return ;
        } 
        if(panelName && this.refs['uiDialagPanel'].props.commonProps.panelName === panelName) {
            this.props.commonProps.showDialog=true;
            this.refs['uiDialagPanel'].setValueWithObject(valueWithObject,CurrentPanelFields);
            return ;
        } 
        if(this.props.commonProps.showDialog) {
            if(this.props.commonProps.allComs2 && this.props.commonProps.panelName2 === panelName) {
                allComs = this.props.commonProps.allComs2;
            }
            this.props.commonProps.showDialog=false;
            this.props.commonProps.panelName2='';
            this.props.commonProps.allComs2=undefined;
            this.refs['uiDialagPanel'].hideModal();
        }
        this.props.commonProps.panelName=panelName;
        if(curMenuObject) {
            let data1 = this.state.data;
            let valueWithObject1 = valueWithObject;
            if(currentSubSCName && valueWithObject[currentSubSCName]){
                let valueWithObject2 = data1[this.state.activeKey].valueWithObject;
                valueWithObject2[currentSubSCName]=valueWithObject[currentSubSCName];
                valueWithObject1 = valueWithObject2;
            } 
            if(allComs && allComs.length > 0){
                data1[this.state.activeKey].allComs = allComs;
            }
            data1[this.state.activeKey].title=curMenuObject.text;
            data1[this.state.activeKey].valueWithObject = valueWithObject1;
            data1[this.state.activeKey].menuArrays=menuArrays;
            data1[this.state.activeKey].curMenuObject=curMenuObject;
            this.setState({
              data: data1,
            })
        }
    }
    componentWillUpdate(nextProps,nextState){
    //console.log("componentWillUpdate"+nextProps);
    }
  
    dispatchEvent(evt,panelValue){
        this.props.dispatchEvent(evt,panelValue);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps){
           return nextProps.shouldSubUpdate; 
        }
        return true;
    }

	render(){
        let styleObj = {
          display: this.props.loginVisible? 'none':'block',
        }
        let tabsStyleObj = 'tabtab__folder__' ;
        
        let panel = [];
        let data = this.state.data;
        let addressLan = [];
        for (let i=0;i<data.length; i++) {
            let k = data[i];
            if(i===parseInt(this.state.activeKey,10) && k.menuArrays){
                let j = k.menuArrays.length - 1 ;
                for (let j1 = j; j1 >= 0; j1--) {
                    let menuObj = k.menuArrays[j1] ;
                    addressLan.push(<Breadcrumb.Item key={menuObj.id} href="#">{menuObj.text}</Breadcrumb.Item>)
                }
                addressLan.push(<Breadcrumb.Item active key={k.curMenuObject.id} href="#">{k.title}</Breadcrumb.Item>)
            }
            
            let refKey='gridpanel'+i;
            if(k.allComs === undefined && k.valueWithObject === undefined){
                panel.push(<UIEmptyPanel key={i} ref={refKey} />);
            } else {
                panel.push(<UIGridPanel title={k.title} activeKey={this.state.activeKey} 
                        valueWithObject={k.valueWithObject} allComs={k.allComs} key={i} ref={refKey}  
                        dispatchEvent={this.dispatchEvent} openTaskList={this.props.openTaskList} />);
            }
        }

    	return (
            <div id="page-wrapper" style={styleObj} className='right2' >
                <div className="row2">
                      <Breadcrumb>
                        {addressLan}
                      </Breadcrumb>
                </div>
                <Tabs ref='mainTxPane' id="mainTxPane" 
                    activeKey={this.state.activeKey}  
                    style={tabsStyleObj}
                    addBackTab={true}
                    handleAddBackClick={this.handleAddBackTab}
                    tabDeleteButton={true}
                    handleTabDeleteButton={this.handleTabDeleteButton}
                    handleTabClick={this.handleTabClick}
                    >
                  {panel}
                </Tabs>
                <UIDialogPanel ref='uiDialagPanel' 
                    commonProps={this.props.commonProps} dispatchEvent={this.props.dispatchEvent} />
         
            </div>
    	  )
	}
}

RightPage.propTypes = {
    ClazzType:React.PropTypes.string,
    commonProps:React.PropTypes.object,
};

RightPage.defaultProps = {
    ClazzType:'RightPage',
    commonProps:{},
};

export default RightPage; 