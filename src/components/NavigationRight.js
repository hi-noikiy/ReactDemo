import React from 'react';
import NavigationBoxMessage from './NavigationBoxMessage.js';
import NavigationBoxUser from './NavigationBoxUser.js';
import {Row} from 'react-bootstrap';

class NavigationRight extends React.Component {

    constructor(props) {
        super(props);
        this.state={

        }
    }

    componentWillUpdate(nextProps,nextState){
        //console.log("componentWillUpdate"+nextProps);
    }


	render() {

	return (
		<Row className='navbar-top-links navbar-right'>
            <NavigationBoxMessage messagesList={this.props.messagesList}/>
            <NavigationBoxUser logout={this.props.logout}/>
        </Row>
        )
	}

}

export default NavigationRight; 