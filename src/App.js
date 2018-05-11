import React from 'react';
import './App.css';
import Navigation from './components/Navigation.js';
import RightPage from './components/RightPage.js';
import LoginForm from './components/LoginForm.js';
import ServiceCompositeDialog from './components/ServiceCompositeDialog.js';
import Preloading from './components/Preloading.js';
import _ from 'lodash';
import fetchapi from "./api/fetchapi.js";
import PrintPromptDialog from './components/PrintPromptDialog.js';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this); //构造函数中绑定
        this.parseResult = this.parseResult.bind(this); //构造函数中绑定
        this.getPanelValue = this.getPanelValue.bind(this); //构造函数中绑定
        this.getTxType = this.getTxType.bind(this); //构造函数中绑定
        this.getTxCode = this.getTxCode.bind(this); //构造函数中绑定
        this.getErrorMsg = this.getErrorMsg.bind(this); //构造函数中绑定
        this.checkSuccess = this.checkSuccess.bind(this); //构造函数中绑定
        this.login = this.login.bind(this); //构造函数中绑定
        this.getDesktopRedirectSc = this.getDesktopRedirectSc.bind(this);
        this.openCurTabForTxOption = this.openCurTabForTxOption.bind(this); //构造函数中绑定
        this.getMenuObject = this.getMenuObject.bind(this); //构造函数中绑定
        this.openCurTabForTx = this.openCurTabForTx.bind(this); //构造函数中绑定
        this.setAddressLan = this.setAddressLan.bind(this); //构造函数中绑定
        this.invertSComposite = this.invertSComposite.bind(this); //构造函数中绑定
        this.getAction2 = this.getAction2.bind(this); //构造函数中绑定
        this.getNavPanel = this.getNavPanel.bind(this); //构造函数中绑定
        this.dispatchEvent = this.dispatchEvent.bind(this); //构造函数中绑定
        this.fetchapiHandle = this.fetchapiHandle.bind(this); //构造函数中绑定
        this.getCurrentPanelFields = this.getCurrentPanelFields.bind(this); //构造函数中绑定
        this.closeSubServiceComposite = this.closeSubServiceComposite.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.openTaskList = this.openTaskList.bind(this);
        this.state = {
            loginVisible: true,
            menuRoot: [],
            // currentState:'',
            menuText: '默认工作区',
            preloadingState: false,
            shouldSubUpdate: true,
            messagesList: [],
            printPerData: {},
            printPromptMessage: {},
            printTask1: {},
            printTaskformat: {},
            printTaskdata: {},
        }
    }

    handleTabClick() {
        this.setState({
            shouldSubUpdate: true,
        });
    }
    setAddressLan(txObj, flag) {
        if (txObj) {
            let menuArrays = [];
            if (this.props.commonProps.menuArrays && flag) {
                menuArrays = this.props.commonProps.menuArrays;
            }
            let menuObj = this.getMenuObject(this.state.menuRoot, "id", txObj.parent);
            if (menuObj) {
                menuArrays.push(menuObj);
            }
            this.props.commonProps.menuArrays = menuArrays;
            this.setAddressLan(menuObj, true);
        }
    }
    openCurTabForTx(curMenuObject, curpanel) {
        if (curMenuObject) {
            this.setAddressLan(curMenuObject, false);
            let uuid = "";
            this.invertSComposite(curMenuObject.txid, curMenuObject.id, uuid,
                "newServiceComposite", curpanel, true);
        }
    }
    logout() {
        let FlexReqHeader = {
            TxCode: "106200",
            TxType: "Composite",
            Action: "newServiceComposite",
            ComponentName: "Composite_106200",
        };
        let FlexReqBody = {
            CurrentPanel: {},
        };
        let result = {};
        this.fetchapiHandle(FlexReqHeader, FlexReqBody, result);

        this.setState({
            loginVisible: true,
        })

    }

    parseResult(curRetuObj) {
        let shouldSubUpdate = true;
        if (this.checkSuccess(curRetuObj)) {
            let txTypeVar = this.getTxType(curRetuObj);
            let txCodeVar = this.getTxCode(curRetuObj);
            let actionVar = this.getAction2(curRetuObj);
            let componentNameVar = this.getAction(curRetuObj);
            let actionNameVar = this.getActionName(curRetuObj);
            console.log('TxType=' + txTypeVar + ',TxCode=' + txCodeVar + ',Action=' + actionVar + ',ComponentName=' + componentNameVar)
            if ("Composite" === txTypeVar) {
                if (txCodeVar === "106100" || txCodeVar === "106200") {
                    if (txCodeVar === "106100") {
                        let l106Value = this.getPanelValue(curRetuObj, "panel_106100");
                        this.refs['loginForm'].setValue(l106Value);
                    }
                } else {
                    let reloadModule = true;
                    let srsc = this.getDesktopRedirectSc(curRetuObj);
                    if (srsc) {
                        let navPanel2 = this.getNavPanel(curRetuObj);
                        let CurrentPanelFields1 = this.getCurrentPanelFields(curRetuObj);
                        let panelValue = this.getPanelValue(curRetuObj, navPanel2);
                        this.refs['compDialag'].setValueWithObject(panelValue, CurrentPanelFields1);
                        this.props.commonProps.currentSubSC = srsc;
                        this.props.allSubSCObj[srsc] = curRetuObj;
                        this.props.commonProps.scDialogVisible = true;
                        this.props.commonProps.currentSubSCName = actionNameVar;
                        reloadModule = false;
                    } else if ("CloseSubServiceComposite" === actionVar) {
                        this.props.allSubSCObj[this.props.commonProps.currentSubSC] = undefined;
                        this.props.commonProps.currentSubSC = undefined;
                        this.props.commonProps.scDialogVisible = false;
                        reloadModule = true;
                    } else if ("changeServiceComposite" === actionVar || "removeServiceComposite" === actionVar) {
                        if ("removeServiceComposite" === actionVar) {
                            //changeServiceComposite(null);
                        }
                        reloadModule = false;
                    } else {
                        // this.RemoveCurTabModules();
                        // currentSC= curRetuObj;
                    }
                    if (reloadModule) {
                        let navPanel = this.getNavPanel(curRetuObj);
                        if (navPanel) {
                            // let oldState = this.state.currentState;
                            let panelValue4 = this.getPanelValue(curRetuObj, navPanel);
                            // if(oldState!==navPanel){
                            let CurrentPanelFields4 = this.getCurrentPanelFields(curRetuObj);
                            this.refs['rightPage'].setValueWithObject(panelValue4, CurrentPanelFields4, this.props.commonProps.curMenuObject, this.props.commonProps.menuArrays);
                            // this.setState({
                            // 	currentState:navPanel,
                            // });
                            if ('803201' === txCodeVar) {
                                let evt2 = {};
                                evt2.TxCode = '803201';
                                evt2.ActionName = 'panel_803201';
                                evt2.Action = 'PANEL_ENTRY';
                                evt2.ComponentName = 'enterpanel_803201';
                                this.dispatchEvent(evt2);
                            }
                            // }
                            if ('CloseSubServiceComposite' === actionVar && this.props.commonProps.subClose) {
                                let CurrentPanelFields4 = this.getCurrentPanelFields(curRetuObj);
                                this.props.commonProps.subClose = false;
                                this.refs['rightPage'].setValueWithObject(panelValue4, CurrentPanelFields4, this.props.commonProps.curMenuObject, this.props.commonProps.menuArrays, this.props.commonProps.currentSubSCName);
                                // this.setState({
                                //     currentState:navPanel,
                                // });
                                shouldSubUpdate = false;
                            }
                        }
                    }
                }
            } else if ('login' === componentNameVar || 'loginPassword' === componentNameVar) {
                this.setState({
                    loginVisible: false,
                });
                let menuRoot = this.getMenuRoot(curRetuObj);
                let taskCountRoot = this.getTaskCountRoot(curRetuObj);
                this.refs['navigation'].setMenuRoot(menuRoot);
                this.setState({
                    menuRoot: menuRoot,
                    taskCountRoot: taskCountRoot,
                });
            } else if ("TxWorkapacePanel" === this.getTxType(curRetuObj)) {
                let taskCountRoot = this.getTaskCountRoot(curRetuObj);
                this.setState({
                    taskCountRoot: taskCountRoot,
                });
            } else if ('Event' === txTypeVar) {
                var invokeServiceComposite = this.getInvokeServiceCompositet(curRetuObj);
                if (invokeServiceComposite) {
                    curRetuObj.FlexRespHeader.TxType = "Composite";
                    this.parseResult(curRetuObj);
                    shouldSubUpdate = false;
                } else {
                    let navPanel1 = this.getNavPanel(curRetuObj);
                    if (navPanel1) {
                        let CurrentPanelFields1 = this.getCurrentPanelFields(curRetuObj);
                        let panelValue = this.getPanelValue(curRetuObj, navPanel1);
                        if (this.props.commonProps.scDialogVisible && this.props.commonProps.currentSubSC) {
                            let retuObj = this.props.allSubSCObj[this.props.commonProps.currentSubSC];
                            if (retuObj) {
                                var scClose = this.getDesktopRedirectScClose(curRetuObj, this.props.commonProps.currentSubSC);
                                if (scClose === true || scClose === false) {
                                    this.props.commonProps.subClose = true;
                                    this.refs['compDialag'].hideModal();
                                    this.props.allSubSCObj[this.props.commonProps.currentSubSC] = undefined;
                                    this.props.commonProps.currentSubSC = undefined;
                                    this.props.commonProps.scDialogVisible = false;

                                } else {
                                    let txCodeVar2 = this.getTxCode(retuObj);
                                    if (txCodeVar2 === txCodeVar) {
                                        this.refs['compDialag'].setValueWithObject(panelValue, CurrentPanelFields1);
                                        this.props.allSubSCObj[this.props.commonProps.currentSubSC] = curRetuObj;
                                        //shouldSubUpdate = !(componentNameVar && componentNameVar.startsWith('select'));
                                    }
                                }
                            }
                        } else {
                            this.refs['rightPage'].setValueWithObject(panelValue, CurrentPanelFields1, this.props.commonProps.curMenuObject, this.props.commonProps.menuArrays, navPanel1);
                            //shouldSubUpdate = !(componentNameVar && componentNameVar.startsWith('select'));
                        }
                    } else {
                        this.refs['rightPage'].setValueWithObject(undefined, undefined, undefined, undefined, undefined);
                    }
                }
            }
            let time2 = new Date().toLocaleString();
            let newMessages = this.state.messagesList;
            let newMsgFlag = false;
            let msObj = this.getMessageArea(curRetuObj);
            if (msObj && msObj.ConsoleMessage) {
                for (let a1 = 0; a1 < msObj.ConsoleMessage.length; a1++) {
                    let a1Obj = msObj.ConsoleMessage[a1];
                    let ta1Text = `[${a1Obj.MOD_ID}]     ${a1Obj.MSG_TEXT}`;
                    alert(`交易失败: ${ta1Text}`);
                    let newMessage = {
                        message: ta1Text,
                        errCode: `消息码:${a1Obj.MOD_ID}`,
                        date: time2
                    };
                    newMessage.key = newMessages.length + 1;
                    newMessages = newMessages.concat(newMessage);
                }
                newMsgFlag = true;
            }
            let statusBar4 = this.getStatusBar(curRetuObj);
            if (statusBar4 && statusBar4.DisplayMessage) {
                for (let a1 = 0; a1 < statusBar4.DisplayMessage.length; a1++) {
                    let a1Obj = statusBar4.DisplayMessage[a1];
                    let ta1Text = `[${a1Obj.MsgType}]     ${a1Obj.DisplayMessage}    ${a1Obj.TxDate}`;
                    if ('9999' === a1Obj.MsgType) {
                        alert(`状态信息: ${ta1Text}`);
                    }
                    let newMessage = {
                        message: ta1Text,
                        errCode: `状态消息码:${a1Obj.MsgType}`,
                        date: time2
                    };
                    newMessage.key = newMessages.length + 1;
                    newMessages = newMessages.concat(newMessage);
                }
                newMsgFlag = true;
            }
            if (newMsgFlag) {
                this.setState({
                    messagesList: newMessages,
                });
            }
        } else {
            let errMsg = this.getErrorMsg(curRetuObj);
            console.log(errMsg);
            alert(`交易失败: ${errMsg}`);
            var time2 = new Date().toLocaleString();
            let newMessage = {
                message: errMsg,
                errCode: `消息码:${this.getResultCode(curRetuObj)}`,
                date: time2
            };
            newMessage.key = this.state.messagesList.length + 1;
            var newMessages = this.state.messagesList.concat(newMessage);
            this.setState({
                messagesList: newMessages,
            });
        }

        let PrintTaskQueue3 = this.getPrintTaskQueue(curRetuObj);
        if (PrintTaskQueue3) {
            let rePrintLabel = this.getRePrintTaskLabel(curRetuObj);
            if (rePrintLabel !== null && rePrintLabel !== "") {
                if (PrintTaskQueue3.constructor === Array) {
                    let _data2 = PrintTaskQueue3;
                    for (let rp2 = _data2.length; rp2 > 0; rp2--) {
                        let rpData = _data2[rp2 - 1];
                        if (rpData) {
                            rpData.RE_PRINT_LABEL = rePrintLabel;
                        }
                    }
                } else {
                    PrintTaskQueue3.RE_PRINT_LABEL = rePrintLabel;
                }
            }
            this.doPrint(PrintTaskQueue3);
        }

        setTimeout(() => {
            this.setState({
                preloadingState: false,
                shouldSubUpdate: shouldSubUpdate,
            })
        }, 300)
    }

    doPrint(_data) {
        if (_data.constructor === Array) {
            var _data2 = _data;
            for (var i2 = _data2.length; i2 > 0; i2--) {
                _data = _data2[i2 - 1];
                this.refs['printPromt'].setValueWithObject(_data, _data2[i2 - 1], true);
            }
        } else {
            this.refs['printPromt'].setValueWithObject(_data, _data, true);
        }

    }

    getStatusBar(json) {
        if (json && json.FlexRespBody && json.FlexRespBody.DesktopContext) {
            return json.FlexRespBody.DesktopContext.StatusBar;
        } else {
            return null;
        }
    }

    getRePrintTaskLabel(json) {
        if (json.FlexRespBody && json.FlexRespBody.DesktopContext) {
            return json.FlexRespBody.DesktopContext.RE_PRINT_LABEL;
        } else {
            return null;
        }
    }
    getPrintTaskQueue(json) {
        if (json.FlexRespBody && json.FlexRespBody.DesktopContext) {
            return json.FlexRespBody.DesktopContext.PrintTaskQueue;
        } else {
            return null;
        }
    }
    getTaskCountRoot(json) {
        if (json.FlexRespBody && json.FlexRespBody.DesktopContext) {
            return json.FlexRespBody.DesktopContext.TaskCountRoot;
        } else {
            return null;
        }
    }
    getMessageArea(json) {
        if (json.FlexRespBody && json.FlexRespBody.DesktopContext) {
            return json.FlexRespBody.DesktopContext.MessageArea;
        } else {
            return null;
        }
    }
    getDesktopRedirectScTitle(json) {
        if (json.FlexRespBody && json.FlexRespBody.DesktopContext) {
            return json.FlexRespBody.DesktopContext.DesktopRedirectScTitle;
        }
        return null;
    }

    getNavPanel(json) {
        if (json.FlexRespHeader) {
            return json.FlexRespHeader.NavPanel;
        } else {
            return null;
        }
    }
    getActionName(json) {
        if (json.FlexRespHeader) {
            return json.FlexRespHeader.ActionName;
        } else {
            return null;
        }
    }

    getInvokeServiceCompositet(json) {
        if (json.FlexRespHeader && json.FlexRespHeader.TxType === 'Event') {
            if (json.FlexRespBody && json.FlexRespBody.DesktopContext) {
                return json.FlexRespBody.DesktopContext.invokeServiceComposite;
            }
        }
        return null;
    }

    getCurrentPanelFields(json) {
        if (json.FlexRespBody && json.FlexRespBody.CurrentPanelFields) {
            return json.FlexRespBody.CurrentPanelFields;
        } else {
            return null;
        }
    }

    getAction2(json) {
        if (json.FlexRespHeader) {
            return json.FlexRespHeader.Action;
        } else {
            return null;
        }
    }

    getDesktopRedirectSc(json) {
        if (json.FlexRespBody && json.FlexRespBody.DesktopContext) {
            return json.FlexRespBody.DesktopContext.DesktopRedirectSc;
        }
        return null;

    }

    getPanelValue(json, panelname) {
        if (json.FlexRespBody && json.FlexRespBody.CompositeContext) {
            return json.FlexRespBody.CompositeContext[panelname];
        }
        return null;
    }

    getTxType(json) {
        if (json.FlexRespHeader) {
            return json.FlexRespHeader.TxType;
        } else {
            return null;
        }
    }

    getMenuRoot(json) {
        if (json.FlexRespBody && json.FlexRespBody.DesktopContext) {
            return json.FlexRespBody.DesktopContext.MenuRoot;
        } else {
            return null;
        }
    }

    getAction(json) {
        if (json.FlexRespHeader) {
            return json.FlexRespHeader.ComponentName;
        } else {
            return null;
        }
    }

    getTxCode(json) {
        if (json.FlexRespHeader) {
            return json.FlexRespHeader.TxCode;
        } else {
            return null;
        }
    }

    getDesktopRedirectScClose(json, currentSubSC) {
        if (json.FlexRespBody && json.FlexRespBody.DesktopContext) {
            return json.FlexRespBody.DesktopContext[currentSubSC + "Close"];
        }
        return null;
    }

    getErrorMsg(result) {
        if (result.FlexRespHeader) {
            switch (result.FlexRespHeader.ResultCode) {
                case "DT9000":
                    return "前端系统错误.";
                case "DT9001":
                    return "页面请求数据为空.";
                case "DT9002":
                    return "报文解析错误,请清IE缓存重试!";
                case "DT9003":
                    return "登陆会话超时!请刷新后重新登录.";
                case "DT9004":
                    return "页面报文被篡改或验证信息为空!";
                case "DT9005":
                    return "正在启动,请稍后刷新页面重试!";
                default:
                    return "系统无响应,请刷新页面后重新登录.";
            }
        } else {
            return "错误信息为空!";
        }
    }

    getResultCode(result) {
        if (result.FlexRespHeader) {
            if (result.FlexRespHeader.ResultCode) {
                return result.FlexRespHeader.ResultCode;
            }
        }
        return '';
    }
    checkSuccess(result) {
        if (result.FlexRespHeader) {
            if (result.FlexRespHeader.ResultCode === "DT0000")
                return true;
        } else {
            return false;
        }
    }

    openCurTabForTxOption(menuId) {
        let curMenuObject = this.getMenuObject(this.state.menuRoot, "id", menuId);
        //console.log(curMenuObject);
        this.setState({
            menuText: curMenuObject.text,
        });
        this.props.commonProps.curMenuObject = curMenuObject;
        this.openCurTabForTx(curMenuObject);
    }

    getMenuObject(curMenu, prop, value) {
        if (curMenu && prop && value) {
            if (curMenu.constructor === Array) {
                for (let j = 0; j < curMenu.length; j++) {
                    let itemj = curMenu[j];
                    let subMenuj = this.getMenuObject(itemj, prop, value);
                    if (subMenuj) {
                        return subMenuj;
                    }
                }
            } else {
                if (curMenu[prop] === value) {
                    return curMenu;
                }
                let root1 = curMenu["children"];
                if (root1 !== null && root1) {
                    for (let i = 0; i < root1.length; i++) {
                        let item1 = root1[i];
                        if (item1[prop] === value) {
                            return item1;
                        }
                        let subMenu = this.getMenuObject(item1, prop, value);
                        if (subMenu) {
                            return subMenu;
                        }
                    }
                }
            }
        }
        return null;
    }

    invertSComposite(txid, meneuid, tabkey, action, curpanel, closeSubComp) {
        let FlexReqHeader = {};
        FlexReqHeader.TxCode = txid;
        FlexReqHeader.ActionName = meneuid;
        FlexReqHeader.TxType = "Composite";
        FlexReqHeader.Action = action;
        FlexReqHeader.ComponentName = tabkey;

        let FlexReqBody = {};
        FlexReqBody.CurrentPanel = curpanel;
        FlexReqBody.CloseAllSubCompositeFlag = closeSubComp;
        let result = {};
        this.fetchapiHandle(FlexReqHeader, FlexReqBody, result);
    }

    dispatchEvent(evt, panelValue) {
        let FlexReqHeader = {};
        if (evt.TxCode) {
            FlexReqHeader.TxCode = evt.TxCode;
        } else {
            FlexReqHeader.TxCode = this.props.commonProps.curMenuObject.txid;
        }
        FlexReqHeader.ActionName = evt.ActionName;
        FlexReqHeader.TxType = "Event";
        FlexReqHeader.Action = evt.Action;
        FlexReqHeader.ComponentName = evt.ComponentName;
        FlexReqHeader.data = evt.data;

        if (this.props.commonProps.scDialogVisible && this.props.commonProps.currentSubSC) {
            let retuObj = this.props.allSubSCObj[this.props.commonProps.currentSubSC];
            if (retuObj) {
                let txCodeVar2 = this.getTxCode(retuObj);
                FlexReqHeader.TxCode = txCodeVar2;
            }
        }
        let FlexReqBody = {};
        FlexReqBody.CurrentPanel = panelValue;
        let result = {};
        this.fetchapiHandle(FlexReqHeader, FlexReqBody, result);
    }

    componentDidMount() {
        let FlexReqHeader = {
            TxCode: '106100',
            TxType: 'Composite',
            Action: "EVENT_ACTION_PERFORM",
        };

        let FlexReqBody = {};
        let result = {};
        this.fetchapiHandle(FlexReqHeader, FlexReqBody, result);
    }

    login(caInfo) {
        let FlexReqHeader = {};
        FlexReqHeader.TxCode = "106100";
        FlexReqHeader.TxType = "Event";
        FlexReqHeader.Action = "EVENT_ACTION_PERFORM";
        FlexReqHeader.ActionName = 'button_panel';
        FlexReqHeader.ComponentName = 'login';
        let FlexReqBody = {};
        FlexReqBody.CurrentPanel = this.refs['loginForm'].getValue();
        if (caInfo) {
            FlexReqBody.caInfo = caInfo;
        }
        let result = {};
        this.fetchapiHandle(FlexReqHeader, FlexReqBody, result);
    }

    closeSubServiceComposite(data) {
        let FlexReqHeader = {};
        FlexReqHeader.TxCode = this.props.commonProps.curMenuObject.txid;
        FlexReqHeader.TxType = "Composite";
        FlexReqHeader.Action = "CloseSubServiceComposite";
        FlexReqHeader.ComponentName = this.props.commonProps.currentSubSC;
        FlexReqHeader.ActionName = this.props.commonProps.subClose;
        if (this.props.commonProps.scDialogVisible && this.props.commonProps.currentSubSC) {
            let retuObj = this.props.allSubSCObj[this.props.commonProps.currentSubSC];
            if (retuObj) {
                let txCodeVar2 = this.getTxCode(retuObj);
                FlexReqHeader.TxCode = txCodeVar2;
            }
        }
        let FlexReqBody = {};
        let result = {};
        this.fetchapiHandle(FlexReqHeader, FlexReqBody, result);
    }
    openTaskList(data) {
        if (data.NAME === 'FXNAME') {
            let curMenuObject1 = this.getMenuObject(this.state.menuRoot, "txid", '803201');
            this.props.commonProps.curMenuObject = curMenuObject1;
            var curpanel = {};
            curpanel.fxname = {};
            curpanel.fxname.selected_value = {};
            curpanel.fxname.selected_value.value = data.VALUE;
            this.openCurTabForTx(curMenuObject1, curpanel);
        } else if (data.NAME === 'TXNAME') {
            let compEvent = {};
            compEvent.ComponentName = 'wfoper_empty';
            compEvent.ActionName = 'apr5_button_panel';
            compEvent.Action = "EVENT_ACTION_PERFORM";
            let curPanelValue = {};
            curPanelValue.BPMO803202 = {};
            curPanelValue.BPMO803202.selected_value = [{
                fxname: data.text,
                __rowid: data.__rowid,
                mytasks: data.VALUE
            }];
            this.dispatchEvent(compEvent, curPanelValue);
        } else if (data.NAME === 'TXMESSAGE') {
            let curMenuObject1 = this.getMenuObject(this.state.menuRoot, "txid", '902001');
            this.props.commonProps.curMenuObject = curMenuObject1;
            var curpanel2 = {};
            curpanel2.fxname = {};
            curpanel2.fxname.selected_value = {};
            curpanel2.fxname.selected_value.value = data.VALUE;
            this.openCurTabForTx(curMenuObject1, curpanel2);
        }
    }

    fetchapiHandle(FlexReqHeader, FlexReqBody, result) {
        let self = this;
        this.setState({
            preloadingState: true,
            shouldSubUpdate: false,
        });

        fetchapi({
            // url: "app",
            url: "http://127.0.0.1:8080/ReactDemo/app",
            type: "post",
            promise: false,
            credentials: true,
            reqbody: FlexReqBody,
            reqheader: FlexReqHeader,
            success: function(result) {
                self.parseResult(result);
            },
            error: function(errCode, message) {
                console.log(errCode, message);
                var time2 = new Date().toLocaleString();
                alert(`连接通信错误.\n返回码: ${errCode},返回信息: ${message}`);
                let newMessage = {
                    message: message,
                    errCode: errCode,
                    date: time2
                };
                newMessage.key = self.state.messagesList.length + 1;
                var newMessages = self.state.messagesList.concat(newMessage);
                self.setState({
                    messagesList: newMessages,
                });
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if(nextState && this.state.preloadingState === nextState.preloadingState){
        //    return false; 
        // }
        return true;
    }
    render() {
        return (
            <div>
	        <Navigation shouldSubUpdate={this.state.shouldSubUpdate} messagesList={this.state.messagesList}  ref='navigation' name="navigation" loginVisible={this.state.loginVisible}  
	        	openCurTabForTxOption={this.openCurTabForTxOption} logout={this.logout} />
	        <RightPage handleTabClick={this.handleTabClick} shouldSubUpdate={this.state.shouldSubUpdate}  
                ref='rightPage' name="rightPage" loginVisible={this.state.loginVisible} 
	        	menuText={this.state.menuText} dispatchEvent={this.dispatchEvent} 
                openTaskList={this.openTaskList} taskCountRoot={this.state.taskCountRoot}/>
	        <LoginForm shouldSubUpdate={this.state.shouldSubUpdate}  ref='loginForm' 
                        name='loginForm' loginVisible={this.state.loginVisible}  login={this.login} />
	        <ServiceCompositeDialog shouldSubUpdate={this.state.shouldSubUpdate} ref='compDialag' 
                    closeSubServiceComposite={this.closeSubServiceComposite} 
                    commonProps={this.props.commonProps} dispatchEvent={this.dispatchEvent} />
            <Preloading showModal={this.state.preloadingState}>GO</Preloading>
            <PrintPromptDialog ref='printPromt' printDataEvent={this.printDataEvent} 
                    printCancelEvent={this.printCancelEvent}
                />
          </div>
        );
    }
}
App.propTypes = {
    ClazzType: React.PropTypes.string,
    commonProps: React.PropTypes.object,
};

App.defaultProps = {
    ClazzType: 'App',
    commonProps: {
        subClose: false,
    },
    allSubSCObj: {},
};

export default App;