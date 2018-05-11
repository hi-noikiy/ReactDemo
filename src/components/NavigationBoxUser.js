import React from 'react';
import {MenuItem} from 'react-bootstrap';

class NavigationBoxUser extends React.Component {

    constructor(props) {
        super(props);
        this.onSelectAlert = this.onSelectAlert.bind(this); //构造函数中绑定
        this.state={

        }
    }

    componentWillUpdate(nextProps,nextState){
        //console.log("componentWillUpdate"+nextProps);
    }

	onSelectAlert(eventKey) {
	  this.props.logout();
	}

	render() {

	return (
		<li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                </a>
                <ul className="dropdown-menu dropdown-user">
                    <li><a href="#11"><i className="fa fa-user fa-fw"></i> User Profile</a>
                    </li>
                    <li><a href="#1122"><i className="fa fa-gear fa-fw"></i> Settings</a>
                    </li>
                    <li className="divider"></li>
                    <MenuItem  eventKey={11} onSelect={this.onSelectAlert} >
						<i className="fa fa-sign-out fa-fw"></i> 退出
                    </MenuItem>
                </ul>
                
        	</li>
		)
	}

}

export default NavigationBoxUser; 