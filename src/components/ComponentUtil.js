import UITable from './UITable.js';
import UILabel from './UILabel.js';
import UITextField from './UITextField.js';
import UIButton from './UIButton.js';
import UITitleGroup from './UITitleGroup.js';
import UIRowButtonPanel from './UIRowButtonPanel.js';
import UITabPane from './UITabPane.js';
import UITitleLabel from './UITitleLabel.js';
import UITableColumn from './UITableColumn.js';
import UIComboBox from './UIComboBox.js';
import UITextArea from './UITextArea.js';
import UICheckBox from './UICheckBox.js';
import UIRadioButton from './UIRadioButton.js';
import UICalendarField from './UICalendarField.js';
import UIButtonGroup from './UIButtonGroup.js';
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
import UIWebScan from './UIWebScan.js';
import UISymbolNumberInput from './UISymbolNumberInput.js';

class ComponentUtil {

    createNewComponents(CurrentPanelFields) {
        let allComs = [];
        if (CurrentPanelFields && CurrentPanelFields !== null) {
            for (let nameVar in CurrentPanelFields) {
                if (CurrentPanelFields.hasOwnProperty(nameVar)) {
                    let alterObj = CurrentPanelFields[nameVar];
                    let singeleComObj = null;
                    let comProps = {
                        ClazzType: '',
                        name: '',
                        valueWithObject: {},
                        commonProps: {},
                        visible: true,
                        percentWidth: 0,
                        columnSpan: 1,
                        caType: '',
                        caFields: '',
                        caAction: '',
                        formatType: 0,
                        column: 1,
                        buttons: [],
                    };
                    switch (alterObj.ClazzType) {
                        case "UITextField":
                            singeleComObj = new UITextField(comProps);
                            break;
                        case "UIComboBox":
                            singeleComObj = new UIComboBox(comProps);
                            break;
                        case "UILabel":
                            singeleComObj = new UILabel(comProps);
                            break;
                        case "UITextArea":
                            singeleComObj = new UITextArea(comProps);
                            if (singeleComObj != null) {
                                if (alterObj.hasOwnProperty("heightFill")) {
                                    singeleComObj.props.heightFill = alterObj.heightFill;
                                }
                                if (alterObj.hasOwnProperty("widthFill")) {
                                    singeleComObj.props.widthFill = alterObj.widthFill;
                                }
                            }
                            break;
                        case "UICheckBox":
                            singeleComObj = new UICheckBox(comProps);
                            break;
                        case "UIRadioButton":
                            singeleComObj = new UIRadioButton(comProps);
                            break;
                        case "UICalendarField":
                            singeleComObj = new UICalendarField(comProps);
                            break;
                        case "UIButtonGroup":
                            singeleComObj = new UIButtonGroup(comProps);
                            break;
                        case "UITable":
                            singeleComObj = new UITable(comProps);
                            singeleComObj.props.columnSpan = 4;
                            break;
                        case "UICurrencyField":
                            singeleComObj = new UICurrencyField(comProps);
                            break;
                        case "UICurrencyCNField":
                            singeleComObj = new UICurrencyCNField(comProps);
                            break;
                        case "UIButton":
                            singeleComObj = new UIButton(comProps);
                            break;
                        case "UIFileUploadField":
                            singeleComObj = new UIFileUploadField(comProps);
                            break;
                        case "UIImage":
                            singeleComObj = new UIImage(comProps);
                            break;
                        case "UIPasswordField":
                            singeleComObj = new UIPasswordField(comProps);
                            break;
                        case "UIRowButtonPanel":
                            singeleComObj = new UIRowButtonPanel(comProps);
                            break;
                        case "UIInputButton":
                            singeleComObj = new UIInputButton(comProps);
                            break;
                        case "UIEcdsComponent":
                            singeleComObj = new UIEcdsComponent(comProps);
                            break;
                        case "UIEcdsCompBack":
                            singeleComObj = new UIEcdsCompBack(comProps);
                            break;
                        case "UIDialogPanel":
                            singeleComObj = new UIDialogPanel(comProps);
                            break;
                        case "UISelectField":
                            singeleComObj = new UISelectField(comProps);
                            break;
                        case "UITabPanel":
                            singeleComObj = new UITabPane(comProps);
                            comProps.items = [];
                            break;
                        case "UITree":
                            singeleComObj = new UIAdvancedTable(comProps);
                            break;
                        case "UIComboButton":
                            singeleComObj = new UIComboButton(comProps);
                            break;
                        case "UIDateTime":
                            singeleComObj = new UIDateTime(comProps);
                            break;
                        case "UIImageScan":
                            singeleComObj = new UIImageScan(comProps);
                            break;
                        case "UITitleGroup":
                            singeleComObj = new UITitleGroup(comProps);
                            break;
                        case "UITitleLabel":
                            singeleComObj = new UITitleLabel(comProps);
                            break;
                        case "UIWebScan":
                            singeleComObj = new UIWebScan(comProps);
                            break;
                        case "UISymbolNumberInput":
                            singeleComObj = new UISymbolNumberInput(comProps);
                            break;
                        default:

                            break;
                    }
                    if (singeleComObj !== null && singeleComObj !== undefined) {
                        for (let alterObjVar in alterObj) {
                            if (alterObj.hasOwnProperty(alterObjVar)) {
                                let alterObjVal = alterObj[alterObjVar];
                                if (alterObjVal && alterObjVal.ClazzType === 'UITabItem') {
                                    singeleComObj.props.items.push(alterObjVal);
                                } else if ('columnNames' === alterObjVar && alterObj.ClazzType === 'UITable') {
                                    let columnNamesObj = alterObj[alterObjVar];
                                    let columnNames = [];
                                    for (let columnNamesObjVar in columnNamesObj) {
                                        if (columnNamesObj.hasOwnProperty(columnNamesObjVar)) {
                                            let NBBRNO = new UITableColumn({
                                                columnName: '',
                                                text: '',
                                                columnWidth: 0,
                                                visible: true,
                                                listId: ''
                                            });
                                            NBBRNO.props.columnName = columnNamesObjVar;
                                            NBBRNO.props.text = columnNamesObj[columnNamesObjVar].Text;
                                            NBBRNO.props.columnWidth = columnNamesObj[columnNamesObjVar].CellWidth;
                                            NBBRNO.props.visible = columnNamesObj[columnNamesObjVar].Visible;
                                            NBBRNO.props.listId = columnNamesObj[columnNamesObjVar].ListId;
                                            NBBRNO.props.formatID = columnNamesObj[columnNamesObjVar].FormatID;
                                            NBBRNO.props.textAlign = columnNamesObj[columnNamesObjVar].TextAlign;
                                            NBBRNO.props.editable = columnNamesObj[columnNamesObjVar].Editable;
                                            columnNames.push(NBBRNO);
                                        }
                                    }
                                    singeleComObj.props.columns = columnNames;
                                } else if ('buttons' === alterObjVar) {
                                    let buttons = [];
                                    let buttonsObj = alterObj[alterObjVar];
                                    for (let buttonsObjVar in buttonsObj) {
                                        if (buttonsObj.hasOwnProperty(buttonsObjVar)) {
                                            if (alterObj.ClazzType === 'UIRowButtonPanel') {
                                                let update = new UIButton({
                                                    name: '',
                                                    text: '',
                                                    delay: 0
                                                });
                                                update.props.name = buttonsObjVar;
                                                update.props.text = buttonsObj[buttonsObjVar].Text;
                                                update.props.delay = buttonsObj[buttonsObjVar].ButtonDelay;
                                                update.props.download = buttonsObj[buttonsObjVar].Download;
                                                buttons.push(update);
                                            } else if (alterObj.ClazzType === 'UIButtonGroup') {
                                                if (buttonsObj[buttonsObjVar].ClazzType === 'UICheckBox') {
                                                    let checkbox = new UICheckBox({
                                                        name: '',
                                                        text: '',
                                                        ClazzType: ''
                                                    });
                                                    checkbox.props.name = buttonsObjVar;
                                                    checkbox.props.text = buttonsObj[buttonsObjVar].Text;
                                                    checkbox.props.ClazzType = buttonsObj[buttonsObjVar].ClazzType;
                                                    checkbox.props.keypress = buttonsObj[buttonsObjVar].keypress;
                                                    buttons.push(checkbox);
                                                } else if (buttonsObj[buttonsObjVar].ClazzType === 'UIRadioButton') {
                                                    let radio = new UIRadioButton({
                                                        name: '',
                                                        text: '',
                                                        ClazzType: ''
                                                    });
                                                    radio.props.name = buttonsObjVar;
                                                    radio.props.text = buttonsObj[buttonsObjVar].Text;
                                                    radio.props.ClazzType = buttonsObj[buttonsObjVar].ClazzType;
                                                    radio.props.keypress = buttonsObj[buttonsObjVar].keypress;
                                                    buttons.push(radio);
                                                }
                                            }
                                        }
                                    }
                                    singeleComObj.props.buttons = buttons;
                                } else {
                                    singeleComObj.props[alterObjVar] = alterObj[alterObjVar];
                                }
                            }
                        }
                        singeleComObj.props.name = nameVar;
                        if (alterObj.hasOwnProperty("columnSpan")) {
                            singeleComObj.columnSpan = alterObj.columnSpan;
                        }
                        allComs.push(singeleComObj);
                    }
                }
            }
        }
        return allComs;
    }
};
export default ComponentUtil;