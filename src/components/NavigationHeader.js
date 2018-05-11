import React from 'react';


class NavigationHeader extends React.Component {

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
		<div className="navbar-header">
                <a className="navbar-brand" href="#">DRL Workxxxxxxxx平台 v2.01</a>
        </div>
		)
	}

}

export default NavigationHeader; 