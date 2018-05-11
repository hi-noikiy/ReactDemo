import React from 'react';
import {Col,Image} from 'react-bootstrap';

class UIImage extends React.Component {

   constructor(props) {
        super(props);
        this.getValueWithObject = this.getValueWithObject.bind(this); //构造函数中绑定
    }


    getValueWithObject(){
        let objSave =  this.props.valueWithObject;
        return objSave;
    }
    componentWillUpdate(nextProps,nextState){
        //console.log("componentWillUpdate"+nextProps);
    }

    render() {
        let styleObj = {
            display: this.props.visible? 'block':'none',
        }
        let colSpan = 2;
        if(this.props.columnSpan>1){
            colSpan = 4 * this.props.columnSpan - 2;
        }
        let textVal=this.props.text;
        if(!textVal){
            textVal='';
        } else {
            textVal = 'showpic?path='+this.props.text;
        }
        return (
            <Col  ref="default_image_id"  sm={colSpan} style={styleObj} name={this.props.name}>
                <Image src={textVal} responsive />
            </Col>
        )
    }
}

UIImage.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UIImage.defaultProps = {
    ClazzType:'UIImage',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};
export default UIImage; 