import React from 'react';
import {Col} from 'react-bootstrap';
import '../api/Ecds/ecds.css'

import Line from './Line.js';

class UIEcdsCompBack extends React.Component {

   constructor(props) {
    	super(props);
    	this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
        this.state = {
            text:'标题',
            visible:true,
        }
    }
    getValueWithObject(){
		let objSave =  this.props.valueWithObject;
		return objSave;
	}
    componentWillUpdate(nextProps,nextState){
		//console.log("componentWillUpdate"+nextProps);
	}

	render() {
        let colSpan = 4;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }

		let styleObj = {
			display: this.state.visible? 'block':'none',
		}

        let csbmDtTm = {
            position:'absolute',
            left: 30,
            top: 15,
            fontSize:14,
        }

        let csbmTpNm = {
            position:'absolute',
            left: 360,
            top: 60,
            fontSize:30,
            fontFamily:'宋体',
        }

        let csbmIdNb = {
            position:'absolute',
            left: 20,
            top: 120,
            fontSize:14,
        }

        let ECDS_IDS = ["LineA01","LineA02","LineA11","LineA12","LineA21","LineA22","LineA31","LineA32","LineA41","LineA42"
                ,"LineB01","LineB02","LineB11","LineB12","LineB21","LineB22","LineB31","LineB32","LineB41","LineB42"
                ,"LineC01","LineC02","LineC11","LineC12","LineC31","LineC32","LineC41","LineC42","LineC51","LineC52"
                ,"LineD01","LineD02","LineD11","LineD12","LineD31","LineD32","LineD41","LineD42","LineD51","LineD52"
                ,"LineE01","LineE02","LineE11","LineE12","LineE21","LineE22","LineE31","LineE32","LineE41","LineE42","LineE51","LineE52"
                ,"LineF01","LineF02","LineF11","LineF12","LineF21","LineF22","LineF31","LineF32","LineF41","LineF42"
                ,"LineG01","LineG02","LineG11","LineG12","LineG21","LineG22","LineG31","LineG32","LineG41","LineG42"
                ,"LineH01","LineH02","LineH11","LineH12","LineH21","LineH22","LineH31","LineH32","LineH41","LineH42","LineH51","LineH52"
                ,"LineI01","LineI02","LineI11","LineI12","LineI21","LineI22","LineI31","LineI32","LineI41","LineI42"
                ,"LineJ01","LineJ02","LineJ11","LineJ12","LineJ21","LineJ22","LineJ31","LineJ32","LineJ41","LineJ42","LineJ51","LineJ52"
                ,"LineK01","LineK02","LineK11","LineK12","LineK21","LineK22","LineK31","LineK32","LineK41","LineK42","LineK51","LineK52"
                ,"LineM01","LineM02","LineM11","LineM12","LineM21","LineM22","LineM31","LineM32","LineM41","LineM42","LineM51","LineM52"
            ] ;
        let newsList = [] ;

        let dttmObj = this.props.valueWithObject['CreDtTm'] ;
        newsList.push(<label key='CreDtTm' style={csbmDtTm}>{dttmObj.text}</label>) ;

        let tpnmObj = this.props.valueWithObject['TpNm'] ;
        newsList.push(<label key='TpNm' style={csbmTpNm}>{tpnmObj.text}</label>) ;

        let idnbObj = this.props.valueWithObject['IdNb'] ;
        newsList.push(<label key='IdNb' style={csbmIdNb}>{idnbObj.text}</label>) ;

        newsList.push(<Line key='Line1' from={{x: 20, y: 141}} to={{x: 850, y: 141}} />) ;
        let maxTop = {} ;
        for(let i=0, len=ECDS_IDS.length; i<len; i++) {
            let ecdsObj = this.props.valueWithObject[ECDS_IDS[i]] ;
            let ecdsText = '' ;
            if(ecdsObj.hasOwnProperty('text')) {
                ecdsText = ecdsObj.text ;
            }

            let labelStyle = {
                position:'absolute',
                left: 40,
                top: 150,
            }

            if(i === 1) {
                labelStyle.left = 230 ;
            }

            if(i > 1) {
                if(i%2 === 0) {
                    labelStyle.left = 40 ;
                    labelStyle.top = 150 + 30*(parseInt(i/2, 10));
                } else {
                    labelStyle.left = 230 ;
                    labelStyle.top = 150 + 30*(parseInt(i/2, 10));
                }
            }
            maxTop = labelStyle ;
            newsList.push(<label key={ECDS_IDS[i]} style={labelStyle}>{ecdsText}</label>) ;

            if(i%2 === 0) {
                newsList.push(<Line key={'L'+ECDS_IDS[i]} from={{x: 20, y: labelStyle.top + 25}} to={{x: 850, y: labelStyle.top + 25}} />) ;
            }
        }

        newsList.push(<Line key='LineV1' from={{x: 20, y: 141}} to={{x: 20, y: maxTop.top + 25}} />) ;
        newsList.push(<Line key='LineV2' from={{x: 200, y: 141}} to={{x: 200, y: maxTop.top + 25}} />) ;
        newsList.push(<Line key='LineV3' from={{x: 850, y: 141}} to={{x: 850, y: maxTop.top + 25}} />) ;

		return (
			<Col  sm={colSpan} ref="default_ecdscomponent_id" 
                    style={styleObj} name={this.props.name}>
                <div className='dpbm-div'>
                    <div className='bmdiv_abs'>
                        {newsList}
                    </div>
                </div>
            </Col>
		)
	}
}

UIEcdsCompBack.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UIEcdsCompBack.defaultProps = {
    ClazzType:'UIEcdsCompBack',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UIEcdsCompBack; 