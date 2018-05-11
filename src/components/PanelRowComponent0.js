import React from 'react';
import {
    Row
} from 'react-bootstrap';
import _ from 'lodash';
import UITable from './UITable.js';
import UILabel from './UILabel.js';
import UITextField from './UITextField.js';

import UITitleGroup from './UITitleGroup.js';

import UIRowButtonPanel from './UIRowButtonPanel.js';
import UITabPane from './UITabPane.js';
import UITitleLabel from './UITitleLabel.js';

import UIComboBox from './UIComboBox.js';
import UITextArea from './UITextArea.js';

import UICheckBox from './UICheckBox.js';
import UIRadioButton from './UIRadioButton.js';
import UICalendarField from './UICalendarField.js';

import UICurrencyField from './UICurrencyField.js';
import UICurrencyCNField from './UICurrencyCNField.js';
import UIFileUploadField from './UIFileUploadField.js';
import UIImage from './UIImage.js';
import UIPasswordField from './UIPasswordField.js';
import UIInputButton from './UIInputButton.js';
import UIEcdsComponent from './UIEcdsComponent.js';
import UIEcdsCompBack from './UIEcdsCompBack.js';
import UIDialogPanel from './UIDialogPanel.js';
import UISelectField from './UISelectField.js';
import UIAdvancedTable from './UIAdvancedTable.js';
import UIComboButton from './UIComboButton.js';
import UIDateTime from './UIDateTime.js';
import UIImageScan from './UIImageScan.js';
import UISymbolNumberInput from './UISymbolNumberInput.js';
import UIButtonGroup from './UIButtonGroup.js';
import UILink from './UILink.js';

class PanelRowComponent0 extends React.Component {

    constructor(props) {
        super(props);
        this.addElement = this.addElement.bind(this); //构造函数中绑定        
        this.setLastColumnSpan = this.setLastColumnSpan.bind(this); //构造函数中绑定     
    }

    addElement(velement) {
        let newRowElements = this.props.rowElements.concat(velement);
        this.props.rowElements = newRowElements;
    }

    componentWillUpdate(nextProps, nextState) {
        //console.log("componentWillUpdate"+nextProps);
    }
    setLastColumnSpan(addSpan) {
        if (this.props.rowElements && this.props.rowElements.length > 0) {
            let lastEle = this.props.rowElements[this.props.rowElements.length - 1];
            lastEle.props.columnSpan += addSpan;
        }
    }
    render() {
        let styleObj = {
            display: this.props.commonProps.display ? 'block' : 'none',
            marginBottom: 10,
        }
        let self = this;
        let newsList = [];
        this.props.rowElements.forEach(function(msg, index) {
            let key1 = 'Column' + index;
            msg.key = key1;
            if (msg.constructor === UITable) {
                let colunmNameList = [];
                let columnNames = msg.props.columns;
                if (columnNames) {
                    columnNames.forEach(function(msg2, index2) {
                        let key1 = msg2.props.columnName;
                        msg2.key = key1;
                        if (msg2.props.visible) {
                            colunmNameList.push({
                                title: msg2.props.text,
                                name: key1,
                                data: key1
                            });
                        }
                    });
                }
                let tableValue = msg.props.valueWithObject;

                let rowsValueList = [];
                if (tableValue !== undefined) {
                    rowsValueList = tableValue.row;
                    if (rowsValueList === undefined || rowsValueList.constructor !== Array) {
                        rowsValueList = [];
                    }
                }

                newsList.push(<UITable key={key1} inDialog={self.props.inDialog} columns={colunmNameList} data={rowsValueList} name={msg.props.name} columnSpan={msg.props.columnSpan} valueWithObject={msg.props.valueWithObject}
                    columnNames={msg.props.columns} text={msg.props.text} visible={msg.props.visible} select={msg.props.select}
                    dispatchEvent={self.props.dispatchEvent} allData={msg.props.allData} editable={msg.props.editable}
                    checkbox={msg.props.checkbox} addRemove={msg.props.addRemove} always={msg.props.always}
                    checkSend={msg.props.checkSend} lazyLoad={msg.props.lazyLoad} lazyLevel={msg.props.lazyLevel}
                    rowNum={msg.props.rowNum} istree={msg.props.istree} familyId={msg.props.familyId}
                    prjsymbol={msg.props.prjsymbol} treelabel={msg.props.treelabel} chgPgSize={msg.props.chgPgSize}
                    openTaskList={self.props.openTaskList} />);
            } else if (msg.constructor === UIRowButtonPanel) {
                newsList.push(<UIRowButtonPanel familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} valueWithObject={msg.props.valueWithObject}
                    buttons={msg.props.buttons} columns={msg.props.columns} text={msg.props.text} 
                    visible={msg.props.visible} dispatchEvent={self.props.dispatchEvent} 
                    orientation2={msg.props.orientation} heightFill={msg.props.heightFill} widthFill={msg.props.widthFill} />);
            } else if (msg.constructor === UIButtonGroup) {
                newsList.push(<UIButtonGroup familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} valueWithObject={msg.props.valueWithObject}
                    buttons={msg.props.buttons} columns={msg.props.columns} text={msg.props.text} 
                    visible={msg.props.visible} dispatchEvent={self.props.dispatchEvent} 
                    orientation2={msg.props.orientation} heightFill={msg.props.heightFill} widthFill={msg.props.widthFill} />);
            } else if (msg.constructor === UILabel) {
                newsList.push(<UILabel familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} 
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UITextField) {
                newsList.push(<UITextField familyId={msg.props.familyId}  always={msg.props.always} keypress={msg.props.keypress} focusout={msg.props.focusout} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UIPasswordField) {
                newsList.push(<UIPasswordField familyId={msg.props.familyId}  always={msg.props.always} keypress={msg.props.keypress} focusout={msg.props.focusout} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UIComboBox) {
                newsList.push(<UIComboBox familyId={msg.props.familyId}  always={msg.props.always} select={msg.props.select}  key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UICalendarField) {
                newsList.push(<UICalendarField familyId={msg.props.familyId}  always={msg.props.always}  keypress={msg.props.keypress} focusout={msg.props.focusout} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  
                    adjustDate={msg.props.adjustDate} dateType={msg.props.dateType} endDate={msg.props.endDate} />);
            } else if (msg.constructor === UICheckBox) {
                newsList.push(<UICheckBox familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UIComboButton) {
                newsList.push(<UIComboButton familyId={msg.props.familyId}  always={msg.props.always} select={msg.props.select} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UICurrencyCNField) {
                newsList.push(<UICurrencyCNField familyId={msg.props.familyId}  always={msg.props.always}  keypress={msg.props.keypress} focusout={msg.props.focusout} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible} 
                    decNumber={msg.props.decNumber} kDivide={msg.props.kDivide} negative={msg.props.negative} alignType={msg.props.alignType} autoAdd={msg.props.autoAdd} />);
            } else if (msg.constructor === UICurrencyField) {
                newsList.push(<UICurrencyField familyId={msg.props.familyId}  always={msg.props.always} keypress={msg.props.keypress} focusout={msg.props.focusout} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible} 
                    decNumber={msg.props.decNumber} kDivide={msg.props.kDivide} negative={msg.props.negative} alignType={msg.props.alignType} autoAdd={msg.props.autoAdd} />);
            } else if (msg.constructor === UIDateTime) {
                newsList.push(<UIDateTime familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible} hourType={msg.props.hourType}
                    adjustDate={msg.props.adjustDate} dateType={msg.props.dateType} endDate={msg.props.endDate}
                    displayStyle={msg.props.displayStyle} />);
            } else if (msg.constructor === UIDialogPanel) {
                newsList.push(<UIDialogPanel familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UIEcdsComponent) {
                newsList.push(<UIEcdsComponent familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UIEcdsCompBack) {
                newsList.push(<UIEcdsCompBack familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} 
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UIFileUploadField) {
                newsList.push(<UIFileUploadField familyId={msg.props.familyId}  always={msg.props.always} keypress={msg.props.keypress} focusout={msg.props.focusout} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UIImage) {
                newsList.push(<UIImage familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} 
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UIInputButton) {
                newsList.push(<UIInputButton familyId={msg.props.familyId}  always={msg.props.always} keypress={msg.props.keypress} focusout={msg.props.focusout} buttonDesc={msg.props.buttonDesc} 
                    key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject}  
                    text={msg.props.text}  visible={msg.props.visible} dispatchEvent={self.props.dispatchEvent} />);
            } else if (msg.constructor === UIRadioButton) {
                newsList.push(<UIRadioButton familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UISelectField) {
                newsList.push(<UISelectField familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UISymbolNumberInput) {
                newsList.push(<UISymbolNumberInput familyId={msg.props.familyId}  always={msg.props.always} keypress={msg.props.keypress} focusout={msg.props.focusout} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible} 
                    decNumber={msg.props.decNumber} kDivide={msg.props.kDivide} negative={msg.props.negative} alignType={msg.props.alignType} autoAdd={msg.props.autoAdd} symbol={msg.props.symbol} />);
            } else if (msg.constructor === UITabPane) {
                newsList.push(<UITabPane items={msg.props.items} familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} 
                    text={msg.props.text}  visible={msg.props.visible}  dispatchEvent={self.props.dispatchEvent} />);
            } else if (msg.constructor === UITextArea) {
                newsList.push(<UITextArea familyId={msg.props.familyId}  always={msg.props.always} heightFill={msg.props.heightFill} widthFill={msg.props.widthFill} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UITitleLabel) {
                newsList.push(<UITitleLabel familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} 
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UITitleGroup) {
                newsList.push(<UITitleGroup familyId={msg.props.familyId}  always={msg.props.always}  keypress={msg.props.keypress} focusout={msg.props.focusout} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} leftDesc={msg.props.LeftDesc} rightDesc={msg.props.RightDesc} closedHeight={msg.props.ClosedHeight} shrinkType={msg.props.ShrinkType} tgStyle={msg.props.Style}
                    text={msg.props.text}  visible={msg.props.visible} handleFamilyIdByClick={self.props.handleFamilyIdByClick} dispatchEvent={self.props.dispatchEvent} />);
            } else if (msg.constructor === UIImageScan) {
                newsList.push(<UIImageScan familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} 
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UIAdvancedTable) {
                newsList.push(<UIAdvancedTable familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  />);
            } else if (msg.constructor === UILink) {
                newsList.push(<UILink familyId={msg.props.familyId}  always={msg.props.always} key={key1} name={msg.props.name} columnSpan={msg.props.columnSpan} 
                    valueWithObject={msg.props.valueWithObject} dispatchEvent={self.props.dispatchEvent}
                    text={msg.props.text}  visible={msg.props.visible}  openTaskList={self.props.openTaskList} />);
            }

        });

        return (
            <Row  style={styleObj}>
				{newsList}
			</Row>
        )
    }
}

PanelRowComponent0.propTypes = {
    ClazzType: React.PropTypes.string,
    valueWithObject: React.PropTypes.object,
    rowElements: React.PropTypes.array,
    commonProps: React.PropTypes.object,
};

PanelRowComponent0.defaultProps = {
    ClazzType: 'PanelRowComponent0',
    valueWithObject: {},
    rowElements: [],
    commonProps: {},
};

export default PanelRowComponent0;