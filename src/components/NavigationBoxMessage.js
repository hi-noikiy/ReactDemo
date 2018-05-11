import React from 'react';

class NavigationBoxMessage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state={

        }
    }

    componentWillUpdate(nextProps,nextState){
        //console.log("componentWillUpdate"+nextProps);
    }


	render() {
        let msgList = [];
        this.props.messagesList.forEach(function(msg2,index2){
            msgList.push(<li key={msg2.key}>
                            <a href="#">
                                <div>
                                    <strong>{msg2.errCode}</strong>
                                    <span className="pull-right text-muted">
                                        <em>{msg2.date}</em>
                                    </span>
                                </div>
                                <div>{msg2.message}</div>
                            </a>
                        </li>
                        )
        });
    	return (
    		<li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i className="fa fa-envelope fa-fw"></i> <i className="fa fa-caret-down"></i>
                </a>
                <ul className="dropdown-menu dropdown-messages">
                    {msgList}
                </ul>
            </li>
    		)
    	}

}

NavigationBoxMessage.propTypes = {
    ClazzType:React.PropTypes.string,
     
};

NavigationBoxMessage.defaultProps = {
    ClazzType:'NavigationBoxMessage',
    
};

export default NavigationBoxMessage; 