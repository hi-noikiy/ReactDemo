import React from 'react';
import NavigationHeader from './NavigationHeader.js';
import NavigationMenu from './NavigationMenu.js';
import NavigationRight from './NavigationRight.js';

class Navigation extends React.Component {

    constructor(props) {
    	super(props);
    	this.state={
    		menuRoot:[],
    	}
    }


    setMenuRoot(menuRoot){
    	if(menuRoot){
    		this.setState({
				menuRoot:menuRoot,
			});
    	}
    }

    componentWillUpdate(nextProps,nextState){
		//console.log("componentWillUpdate"+nextProps);
	}

	shouldComponentUpdate(nextProps, nextState){
        if(nextProps){
           return nextProps.shouldSubUpdate; 
        }
        return true;
    }

	render() {
		let styleObj = {
			display: this.props.loginVisible? 'none':'block',
			marginBottom: '0',
		}
		
		return (
			<nav className="navbar navbar-default navbar-static-top" role="navigation" style={styleObj} >
	            <NavigationHeader />
	            <NavigationRight logout={this.props.logout} messagesList={this.props.messagesList}/>
	            <NavigationMenu openCurTabForTxOption={this.props.openCurTabForTxOption} menuRoot={this.state.menuRoot} className="navbar-default sidebar" role="navigation"/>
	      	</nav>
		)
	}
}

Navigation.propTypes = {
    ClazzType:React.PropTypes.string,
    loginVisible:React.PropTypes.bool,
};

Navigation.defaultProps = {
    ClazzType:'Navigation',
    loginVisible:true,
};

export default Navigation; 