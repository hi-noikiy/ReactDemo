import React from 'react';

import '../api/table/table.css'

class UITableField extends React.Component {

   constructor(props) {
    	super(props);
    	this.handleChange = this.handleChange.bind(this); //构造函数中绑定

        this.state={
            ttext:'',
        }
    }

    componentDidMount() {
        let text=this.props.commonProps[this.props.dataKey]
        this.setState({
            ttext:text,
        });
    }

    handleChange(evt){
    	let text = evt.target.value;
        this.setState({
            ttext:text,
        });

        this.props.handleAction(text, this.props.dataKey);
    }

    render() {
		return (
            <input type='text' className='editfield_table' value={this.state.ttext || ''} onChange={this.handleChange}></input>
		)
	}
}

UITableField.propTypes = {
    ClazzType:React.PropTypes.string,
    valueWithObject:React.PropTypes.object,
    visible:React.PropTypes.bool,
    commonProps:React.PropTypes.object,
};

UITableField.defaultProps = {
    ClazzType:'UITableField',
    valueWithObject:{},
    visible:true,
    commonProps:{},
};

export default UITableField; 