import React from 'react';
import {Panel} from 'react-bootstrap';

import IPanel from './IPanel.js';

class UIEmptyPanel extends IPanel {

   constructor(props) {
        super(props);
        this.setValueWithObject = this.setValueWithObject.bind(this); //构造函数中绑定
        
        this.state = {
            panelTitle:'',
        }     
    }

    setValueWithObject(valueWithObject,allComs){
    }

	render() {
        return (
        <Panel className="row">
        </Panel>
        );
	}
}

UIEmptyPanel.propTypes = {
    ClazzType:React.PropTypes.string,
    commonProps:React.PropTypes.object,
    valueWithObject:React.PropTypes.object,
};

UIEmptyPanel.defaultProps = {
    ClazzType:'UIEmptyPanel',
    commonProps:{},
    name:'',
    valueWithObject:{},
};

export default UIEmptyPanel; 