import React from 'react';
import {Panel,Grid} from 'react-bootstrap';

import IPanel from './IPanel.js';
import PanelRowComponent0 from './PanelRowComponent0.js';

import UITitleGroup from './UITitleGroup.js';

class UIGridPanel extends IPanel {

   constructor(props) {
        super(props);
        this.setValueWithObject = this.setValueWithObject.bind(this); //构造函数中绑定
        this.checkComOccupyPosition = this.checkComOccupyPosition.bind(this); //构造函数中绑定

        this.addMLabel = this.addMLabel.bind(this); //构造函数中绑定
        this.handleFamilyId = this.handleFamilyId.bind(this) ;
        this.handleFamilyIdByClick = this.handleFamilyIdByClick.bind(this) ;

        this.dispatchEvent = this.dispatchEvent.bind(this); //构造函数中绑定
        
        this.state = {
            panelTitle:'',
            panelRows:[],
            allComponents:[],
        }     
    }
    componentWillReceiveProps(nextProps){
        this.setValueWithObject(nextProps.valueWithObject,nextProps.allComs);
    }

    componentDidMount(){
        if(this.props){
            this.setValueWithObject(this.props.valueWithObject,this.props.allComs);
        }
    }

    setValueWithObject(valueWithObject,allComs){
        if(valueWithObject){
            let _allRows = [] ;
            let col:int = 0 ;
            let _gridRow = new PanelRowComponent0({rowElements:[],commonProps:{},inDialog:this.props.inDialog}) ;
            _gridRow.props.commonProps.display = true ;
            let prc:int=1;
            if(allComs===undefined || allComs.length === 0){
                allComs = this.state.allComponents;
            }
            _gridRow.props.commonProps.rowNum=prc;
            if(allComs){
                let fClosedHeight = -1 ;

                for (let i:int = 0, comLen:int = allComs.length; i < comLen; i++) {
                    let comObj = allComs[i] ;
                    if(!comObj) {
                        continue ;
                    }
                    
                    let occupyPosition:int = this.checkComOccupyPosition(comObj) ;
                    if(occupyPosition === 1) {
                        continue ;
                    }
                    if(valueWithObject[comObj.props.name]) {
                        comObj.props.valueWithObject=valueWithObject[comObj.props.name];
                    }

                    if(comObj.props.hasOwnProperty("familyId") && comObj.props["familyId"] !== undefined && comObj.props["familyId"] !== "") {
                        if((comObj.constructor === UITitleGroup)) {
                            fClosedHeight = comObj.props.ClosedHeight ;

                            _gridRow.props.commonProps.isTG = true ;
                        } else {
                            _gridRow.props.commonProps.isTG = false ;
                        }

                        _gridRow.props.commonProps.avoidIndex = fClosedHeight ;
                        _gridRow.props.commonProps.familyId = comObj.props.familyId ;
                    }
                    
                    if(comObj.props["columnSpan"] !== undefined){
                        col += comObj.props["columnSpan"] ;
                    } else {
                        col++ ;
                    }
                    
                    if(col > this.props.column)
                    {
                        _allRows.push(_gridRow) ;
                        _gridRow.setLastColumnSpan(this.props.column-(col-comObj.props["columnSpan"]));
                        _gridRow = new PanelRowComponent0({rowElements:[],commonProps:{},inDialog:this.props.inDialog}) ;
                        _gridRow.props.commonProps.display = true ;
                        
                        prc++;
                        _gridRow.props.commonProps.rowNum=prc;
                        this.addMLabel(comObj, col, _gridRow, occupyPosition);
                        if(comObj["columnSpan"] !== undefined)
                        {
                            col = comObj["columnSpan"] ;
                            if(comObj["columnSpan"] === this.props.column) {
                                col = 1 ;
                            }
                        } else {
                            col = 1 ;
                        }
                    } else if(col % this.props.column === 0) {
                        this.addMLabel(comObj, col, _gridRow, occupyPosition);
                        
                        _allRows.push(_gridRow);
                        _gridRow = new PanelRowComponent0({rowElements:[],commonProps:{},inDialog:this.props.inDialog}) ;
                        _gridRow.props.commonProps.display = true ;
                        
                        prc++;
                        _gridRow.props.commonProps.rowNum=prc;
                        col = 0 ;
                    } else {
                        this.addMLabel(comObj, col, _gridRow, occupyPosition);
                    }
                }
            }

            if(col % this.props.column !== 0) {
                _allRows.push(_gridRow) ;
            }

            this.handleFamilyId(_allRows) ;

            if(valueWithObject.__displayTitle__){
                this.setState({
                    panelTitle:valueWithObject.__title__,
                    panelRows:_allRows,
                    allComponents:allComs,
                })
            } else {
                this.setState({
                    panelTitle:'',
                    panelRows:_allRows,
                    allComponents:allComs,
                })
            }
            
        }
    }
    /**
     * 检查控件是否占住位置, 0表示显示, 1表示隐藏不占位置, 2表示隐藏且占位置
     */
    checkComOccupyPosition(comObj){
        let velement =  (comObj);
        let visible:Boolean = velement.props.visible ;
        if(comObj.props.hasOwnProperty("visible")) {
            visible = comObj.props["visible"] ;
        }
        if(visible !== undefined && !visible) {
            let visibleAlways:Boolean = false ;
            if(comObj.props.hasOwnProperty("always")) {
                visibleAlways = comObj.props.always ;
            }
            if(visibleAlways)
            {
                return 2 ;
            }
            return 1 ;
        }
        return 0 ;
    }

    addMLabel(comObj, col, _gridRow, _occupyPos){
        if(_occupyPos === 0) {
            _gridRow.addElement(comObj) ;
        }
    }

    handleFamilyId(allRows) {
        let lastRowObj ;
        let openedIndex = 0 ;
        if(allRows !== undefined && allRows.length > 0) {
            for (let i:int = (allRows.length - 1); i >= 0; i--) {
                let rowObj = allRows[i] ;

                if(rowObj.props.commonProps.hasOwnProperty("familyId") && rowObj.props.commonProps["familyId"] !== undefined && rowObj.props.commonProps["familyId"] !== "") {
                    if(!rowObj.props.commonProps.isTG) {
                        if(rowObj.props.commonProps.avoidIndex === 0) {
                            rowObj.props.commonProps.display = false ;
                        } else {
                            if(rowObj.props.commonProps.avoidIndex === -1 || openedIndex < rowObj.props.commonProps.avoidIndex) {
                                rowObj.props.commonProps.display = true ;
                            } else {
                                rowObj.props.commonProps.display = false ;
                            }

                            openedIndex++ ;
                        }
                    }
                    
                    if(lastRowObj !== undefined && lastRowObj.props.commonProps.hasOwnProperty("familyId") && rowObj.props.commonProps.familyId !== lastRowObj.props.commonProps.familyId) {
                        openedIndex = 0 ;
                    }
                }

                lastRowObj = rowObj ;
            }
        }
    }

    handleFamilyIdByClick(clickfamilyId, clickOpened) {
        let openedIndex = 0 ;

        if(this.state.panelRows !== undefined && this.state.panelRows.length > 0) {
            for (let i:int = (this.state.panelRows.length - 1); i >= 0; i--) {
                let rowObj = this.state.panelRows[i] ;
                if(clickOpened) {
                    if(rowObj.props.commonProps.hasOwnProperty("familyId") && rowObj.props.commonProps["familyId"] === clickfamilyId) {
                        if(!rowObj.props.commonProps.isTG) {
                            rowObj.props.commonProps.display = true ;
                        } else {
                            break ;
                        }
                    }

                    continue ;
                }

                if(rowObj.props.commonProps.hasOwnProperty("familyId") && rowObj.props.commonProps["familyId"] === clickfamilyId) {
                    if(!rowObj.props.commonProps.isTG) {
                        if(rowObj.props.commonProps.avoidIndex === 0) {
                            rowObj.props.commonProps.display = false ;
                        } else {
                            if(openedIndex < rowObj.props.commonProps.avoidIndex) {
                                rowObj.props.commonProps.display = true ;
                            } else {
                                rowObj.props.commonProps.display = false ;
                            }

                            openedIndex++ ;
                        }
                    } else {
                        break ;
                    }
                }
            }
        }

        this.setState({
                panelTitle:this.state.panelTitle,
                panelRows:this.state.panelRows,
                allComponents:this.state.allComponents,
        }) ;
    }

    componentWillUpdate(nextProps,nextState){
        //console.log("componentWillUpdate"+nextProps);
    }

    dispatchEvent(evt){
        let panelValue = {};
        for (let i:int = 0, comLen:int = this.state.allComponents.length; i < comLen; i++) {
            let comObj:Object = this.state.allComponents[i] ;
            if(!comObj) {
                continue ;
            }
            panelValue[comObj.props.name] = comObj.getValueWithObject();
        }

        this.props.dispatchEvent(evt,panelValue);
    }

	render() {
        let self = this;
        let newsList = [];
        this.state.panelRows.forEach(function(msg,index){
            let key1='Row'+index;
            msg.key=key1;
            newsList.push(<PanelRowComponent0 key={key1} inDialog={self.props.inDialog} dispatchEvent={self.dispatchEvent} 
                rowElements={msg.props.rowElements} commonProps={msg.props.commonProps} openTaskList={self.props.openTaskList} handleFamilyIdByClick={self.handleFamilyIdByClick} />);
        });
        if(this.state.panelTitle) {
            return (
            <Panel className="row" header={this.state.panelTitle}>
                <Grid fluid>
                    {newsList}
                </Grid>
            </Panel>
            )
        } else {
            return (
            <Panel className="row">
                <Grid fluid>
                    {newsList}
                </Grid>
            </Panel>
            )
        }
		
	}
}

UIGridPanel.propTypes = {
    ClazzType:React.PropTypes.string,
    commonProps:React.PropTypes.object,
    valueWithObject:React.PropTypes.object,
};

UIGridPanel.defaultProps = {
    ClazzType:'UIGridPanel',
    commonProps:{},
    name:'',
    valueWithObject:{},
    visible:true,
    percentWidth:0,
    columnSpan:1,
    caType:'',
    caFields:'',
    caAction:'',
    formatType:0,
    column:4,
    allComs:[],
};

export default UIGridPanel; 