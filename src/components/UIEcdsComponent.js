import React from 'react';
import {Col} from 'react-bootstrap';

import '../api/Ecds/ecds.css'

import UITextField from './UITextField.js';
import UICalendarField from './UICalendarField.js';
import UIComboBox from './UIComboBox.js';
import UIInputButton from './UIInputButton.js';

import cnMoney from '../api/CurrencyInput/cnMoney.js'

class UIEcdsComponent extends React.Component {

   constructor(props) {
    	super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.changeValueHandle = this.changeValueHandle.bind(this); //构造函数中绑定
        this.amtFocusInHandle = this.amtFocusInHandle.bind(this) ;
        this.setAmtText = this.setAmtText.bind(this) ;

        this.state = {
            text:'标题',
            visible:true,
            amt1:0,
            amt2:0,
            amt3:0,
            amt4:0,
            amt5:0,
            amt6:0,
            amt7:0,
            amt8:0,
            amt9:0,
            amt10:0,
            amt11:0,
            amt12:0,
            cnMoneyText:'零元整', 
        }
    }

    setAmtText(i, value) {
        switch(i) {
            case 1:
                this.setState({amt1: value}) ;
                break ;
            case 2:
                this.setState({amt2: value}) ;
                break ;
            case 3:
                this.setState({amt3: value}) ;
                break ;
            case 4:
                this.setState({amt4: value}) ;
                break ;
            case 5:
                this.setState({amt5: value}) ;
                break ;
            case 6:
                this.setState({amt6: value}) ;
                break ;
            case 7:
                this.setState({amt7: value}) ;
                break ;
            case 8:
                this.setState({amt8: value}) ;
                break ;
            case 9:
                this.setState({amt9: value}) ;
                break ;
            case 10:
                this.setState({amt10: value}) ;
                break ;
            case 11:
                this.setState({amt11: value}) ;
                break ;
            case 12:
                this.setState({amt12: value}) ;
                break ;
            default:
                break;
        }
    }

    getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}
    componentWillUpdate(nextProps,nextState){
		//console.log("componentWillUpdate"+nextProps);
	}

    componentDidMount(){
        if(this.props.valueWithObject !== undefined 
            && this.props.valueWithObject['IsseAmt'] !== undefined 
            && this.props.valueWithObject['IsseAmt'].hasOwnProperty("text")) {
            let isseAmt = this.props.valueWithObject['IsseAmt'].text ;
            if(isseAmt !== undefined && isseAmt !== '') {
                this.setState({cnMoneyText: cnMoney(isseAmt)}) ;

                let amtString = Number(isseAmt).toFixed(2) ;
                amtString = amtString.replace('.', '').split('').reverse().join('') ;
                for(let i=(amtString.length - 1); i>=0; i--) {
                    if(amtString[i] === '.') {
                        continue ;
                    }
                    
                    this.setAmtText(i+1, amtString[i]) ;
                }
            }
        }
    }

    amtFocusInHandle(evt) {
        if(evt.target !== undefined) {
            evt.target.setSelectionRange(0, evt.target.value.length) ;
        }
    }

    changeValueHandle(evt) {
        let text = evt.target.value;
        if(text !== '' && '0123456789'.indexOf(text) !== -1) {
            let insertIndex = Number(evt.target.name.substr(7)) ;
            this.setAmtText(insertIndex, text) ;

            let money = '' ;
            for(let i=12; i>0; i--) {
                if(i === insertIndex) {
                    if(insertIndex === 2) {
                        money += '.' ;
                    }
                    money += text ;
                    continue ;
                }
                if(i === 2) {
                    money += '.' ;
                }
                money += eval('this.state.amt' + i) ;
            }
            if(money !== '') {
                this.props.valueWithObject['IsseAmt'].text = Number(money).toFixed(2) ;
                this.setState({cnMoneyText: cnMoney(money)}) ;
            } else {
                this.props.valueWithObject['IsseAmt'].text = '' ;
            }
        }
    }

	render() {
        let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }

        let dpsyDiv = 'dpsy-div';
        let Tp = this.props.valueWithObject.Tp ;
        if(Tp === 'AC01') {
            dpsyDiv = 'dpyh-div';
        }

		let styleObj = {
			display: this.state.visible? 'block':'none',
		}

        let amtReadOnly = false ;
        if(this.props.valueWithObject !== undefined 
            && this.props.valueWithObject['IsseAmt'] !== undefined 
            && this.props.valueWithObject['IsseAmt'].hasOwnProperty("__readOnly__")) {
            amtReadOnly = this.props.valueWithObject['IsseAmt'].__readOnly__ ;
        }

		return (
			<Col  sm={colSpan} ref="default_ecdscomponent_id" 
                    style={styleObj} name={this.props.name}>
                <div className={dpsyDiv}>
                    <div className='div_abs'>
                        {/*显示日期*/}
                        <UITextField name="CreDtTm" valueWithObject={this.props.valueWithObject['CreDtTm']} className='cs_CreDtTm' inputClassName='cs_input'></UITextField>

                        {/*出票日期*/}
                        <UICalendarField name="IsseDt" valueWithObject={this.props.valueWithObject['IsseDt']} className='cs_IsseDt' inputClassName='cs_input_calendar'></UICalendarField>
                        {/*票据状态*/}
                        <UIComboBox name="IsseSts" className='cs_IsseSts' prefixCls='ecds-rc-select' dropdownMatchSelectWidth={false} valueWithObject={this.props.valueWithObject['IsseSts']}></UIComboBox>

                        {/*汇票到期日*/}
                        <UICalendarField name="DueDt" valueWithObject={this.props.valueWithObject['DueDt']} className='cs_DueDt' inputClassName='cs_input_calendar'></UICalendarField>
                        {/*票据号码*/}
                        <UITextField name="IdNb" valueWithObject={this.props.valueWithObject['IdNb']} className='cs_IdNb' inputClassName='cs_input'></UITextField>

                        {/*出票人全称*/}
                        <UITextField name="DrwrNm" valueWithObject={this.props.valueWithObject['DrwrNm']} className='cs_DrwrNm' inputClassName='cs_input'></UITextField>
                        {/*收票人全称*/}
                        <UITextField name="PyeeNm" valueWithObject={this.props.valueWithObject['PyeeNm']} className='cs_PyeeNm' inputClassName='cs_input'></UITextField>

                        {/*出票人账号*/}
                        <UIInputButton name="DrwrAcct" parentName={this.props.name} dispatchEvent={this.props.dispatchEvent} keypress='DrwrAcct' valueWithObject={this.props.valueWithObject['DrwrAcct']} className='cs_DrwrAcct' bgClassName='cs_inputgroup' inputClassName='cs_input_ib' buttonClassName='cs_inputButton'> buttonDesc="选择"></UIInputButton>
                        {/*收票人账号*/}
                        <UITextField name="PyeeAcct" valueWithObject={this.props.valueWithObject['PyeeAcct']} className='cs_PyeeAcct' inputClassName='cs_input'></UITextField>

                        {/*出票人开户银行*/}
                        <UIInputButton name="DrwrAcctSvcr" parentName={this.props.name} dispatchEvent={this.props.dispatchEvent} keypress='DrwrAcctSvcr' valueWithObject={this.props.valueWithObject['DrwrAcctSvcr']} className='cs_DrwrAcctSvcr' bgClassName='cs_inputgroup' inputClassName='cs_input_ib' buttonClassName='cs_inputButton' buttonDesc="选择"></UIInputButton>
                        {/*收票人开户银行*/}
                        <UIInputButton name="PyeeAcctSvcr" parentName={this.props.name} dispatchEvent={this.props.dispatchEvent} keypress='PyeeAcctSvcr' valueWithObject={this.props.valueWithObject['PyeeAcctSvcr']} className='cs_PyeeAcctSvcr' bgClassName='cs_inputgroup_r' inputClassName='cs_input_ibr' buttonClassName='cs_inputButton' buttonDesc="选择"></UIInputButton>

                        {/*出票保证信息保证人名称*/}
                        <UITextField name="DrwGuarnteeNm" valueWithObject={this.props.valueWithObject['DrwGuarnteeNm']} className='cs_DrwGuarnteeNm' inputClassName='cs_input'></UITextField>
                        {/*出票保证信息保证人地址*/}
                        <UITextField name="DrwGuarnteeAdr" valueWithObject={this.props.valueWithObject['DrwGuarnteeAdr']} className='cs_DrwGuarnteeAdr' inputClassName='cs_input'></UITextField>
                        {/*出票保证信息保证日期*/}
                        <UICalendarField name="DrwGuarnteeDt" valueWithObject={this.props.valueWithObject['DrwGuarnteeDt']} className='cs_DrwGuarnteeDt' inputClassName='cs_input_calendar'></UICalendarField>
                    
                        {/*票据金额十亿位*/}
                        <input name="IsseAmt12" className='cs_Amt cs_Amt12' value={this.state.amt12} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>
                        {/*票据金额亿位*/}
                        <input name="IsseAmt11" className='cs_Amt cs_Amt11' value={this.state.amt11} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>
                        {/*票据金额千万位*/}
                        <input name="IsseAmt10" className='cs_Amt cs_Amt10' value={this.state.amt10} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>
                        {/*票据金额百万位*/}
                        <input name="IsseAmt9" className='cs_Amt cs_Amt9' value={this.state.amt9} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>
                        {/*票据金额十万位*/}
                        <input name="IsseAmt8" className='cs_Amt cs_Amt8' value={this.state.amt8} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>
                        {/*票据金额万位*/}
                        <input name="IsseAmt7" className='cs_Amt cs_Amt7' value={this.state.amt7} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>
                        {/*票据金额千位*/}
                        <input name="IsseAmt6" className='cs_Amt cs_Amt6' value={this.state.amt6} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>
                        {/*票据金额百位*/}
                        <input name="IsseAmt5" className='cs_Amt cs_Amt5' value={this.state.amt5} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>
                        {/*票据金额十位*/}
                        <input name="IsseAmt4" className='cs_Amt cs_Amt4' value={this.state.amt4} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>
                        {/*票据金额元位*/}
                        <input name="IsseAmt3" className='cs_Amt cs_Amt3' value={this.state.amt3} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>
                        {/*票据金额角位*/}
                        <input name="IsseAmt2" className='cs_Amt cs_Amt2' value={this.state.amt2} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>
                        {/*票据金额分位*/}
                        <input name="IsseAmt1" className='cs_Amt cs_Amt1' value={this.state.amt1} maxLength='1' disabled={amtReadOnly} onChange={this.changeValueHandle} onFocus={this.amtFocusInHandle}></input>

                        {/*票据金额*/}
                        <label name="IsseAmtCNY" className='cs_cnAmt'>{this.state.cnMoneyText}</label>

                        {/*承兑人全称*/}
                        <UITextField name="AccptrNm" valueWithObject={this.props.valueWithObject['AccptrNm']} className='cs_AccptrNm' inputClassName='cs_input'></UITextField>
                        {/*承兑人开户行行号*/}
                        <UIInputButton name="AccptrAcctSvcr" parentName={this.props.name} dispatchEvent={this.props.dispatchEvent} keypress='AccptrAcctSvcr' valueWithObject={this.props.valueWithObject['AccptrAcctSvcr']} className='cs_AccptrAcctSvcr' bgClassName='cs_inputgroup_r' inputClassName='cs_input_ibr' buttonClassName='cs_inputButton' buttonDesc="选择"></UIInputButton>
                    
                        {/*承兑人账号*/}
                        <UITextField name="AccptrAcct" valueWithObject={this.props.valueWithObject['AccptrAcct']} className='cs_AccptrAcct' inputClassName='cs_input'></UITextField>
                        {/*承兑人开户行名称*/}
                        <UITextField name="AccptrAcctSvnm" valueWithObject={this.props.valueWithObject['AccptrAcctSvnm']} className='cs_AccptrAcctSvnm' inputClassName='cs_input'></UITextField>
                    
                        {/*交易合同号*/}
                        <UITextField name="TxlCtrctNb" valueWithObject={this.props.valueWithObject['TxlCtrctNb']} className='cs_TxlCtrctNb' inputClassName='cs_input'></UITextField>

                        {/*能否转让*/}
                        <UIComboBox name="BanEndrsmtMk" className='cs_BanEndrsmtMk' prefixCls='ecds-rc-select' dropdownMatchSelectWidth={false} valueWithObject={this.props.valueWithObject['BanEndrsmtMk']}></UIComboBox>
                        
                        {/*承兑日期*/}
                        <UICalendarField name="AccptDt" valueWithObject={this.props.valueWithObject['AccptDt']} className='cs_AccptDt' inputClassName='cs_input_calendar'></UICalendarField>
                    
                        {/*承兑保证信息保证人名称*/}
                        <UITextField name="AccptGuarnteeNm" valueWithObject={this.props.valueWithObject['AccptGuarnteeNm']} className='cs_AccptGuarnteeNm' inputClassName='cs_input'></UITextField>
                        {/*承兑保证信息保证人地址*/}
                        <UITextField name="AccptGuarnteeAdr" valueWithObject={this.props.valueWithObject['AccptGuarnteeAdr']} className='cs_AccptGuarnteeAdr' inputClassName='cs_input'></UITextField>
                        {/*承兑保证信息保证日期*/}
                        <UICalendarField name="AccptGuarnteeDt" valueWithObject={this.props.valueWithObject['AccptGuarnteeDt']} className='cs_AccptGuarnteeDt' inputClassName='cs_input_calendar'></UICalendarField>
                    
                        {/*评级信息出票人评级主体*/}
                        <UITextField name="DrwrCdtRatgAgcy" valueWithObject={this.props.valueWithObject['DrwrCdtRatgAgcy']} className='cs_DrwrCdtRatgAgcy' inputClassName='cs_input'></UITextField>
                        {/*评级信息出票人信用等级*/}
                        <UIComboBox name="DrwrCdtRatgs" className='cs_DrwrCdtRatgs' prefixCls='ecds-rc-select' dropdownMatchSelectWidth={false} valueWithObject={this.props.valueWithObject['DrwrCdtRatgs']}></UIComboBox>
                        {/*评级信息出票人评级到期日*/}
                        <UICalendarField name="DrwrCdtRatgDueDt" valueWithObject={this.props.valueWithObject['DrwrCdtRatgDueDt']} className='cs_DrwrCdtRatgDueDt' inputClassName='cs_input_calendar_dq'></UICalendarField>
                
                        {/*评级信息承兑人评级主体*/}
                        <UITextField name="AccptrCdtRatgAgcy" valueWithObject={this.props.valueWithObject['AccptrCdtRatgAgcy']} className='cs_AccptrCdtRatgAgcy' inputClassName='cs_input'></UITextField>
                        {/*评级信息承兑人信用等级*/}
                        <UIComboBox name="AccptrCdtRatgs" className='cs_AccptrCdtRatgs' prefixCls='ecds-rc-select' dropdownMatchSelectWidth={false} valueWithObject={this.props.valueWithObject['AccptrCdtRatgs']}></UIComboBox>
                        {/*评级信息承兑人评级到期日*/}
                        <UICalendarField name="AccptrCdtRatgDueDt" valueWithObject={this.props.valueWithObject['AccptrCdtRatgDueDt']} className='cs_AccptrCdtRatgDueDt' inputClassName='cs_input_calendar_dq'></UICalendarField>
                    </div>
                </div>
            </Col>
		)
	}
}

UIEcdsComponent.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UIEcdsComponent.defaultProps = {
    ClazzType:'UIEcdsComponent',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UIEcdsComponent; 