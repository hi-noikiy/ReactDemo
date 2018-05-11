import React from 'react';
import classNames from 'classnames';

class NavigationMenuItem extends React.Component {

   constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this); //构造函数中绑定
        this.state = {
            closed:true,
        }
    }

    onClick(e){
        this.setState({
            closed:!this.state.closed,
        })
        this.props.toggleSubMenu(e);
    }

    componentWillUpdate(nextProps,nextState){
        //console.log("componentWillUpdate"+nextProps);
    }

    render() {
        let styleObj = {
            display: this.props.visible? 'block':'none',
        }
        let ulClass = classNames({
          nav: true,
          'nav-third-level': this.props.level === '3',
          'nav-second-level': this.props.level === '2',
          'collapse':this.state.closed,
          'collapse in':!this.state.closed,
        });
        let iClass = classNames({
            fa:this.props.level === '2',
            'fa-sitemap':this.props.level === '2' && this.props.menuId!=='NB_M0003',
            'fa-rss-square':this.props.level === '2' && this.props.menuId==='NB_M0003',
            'fa-fw':this.props.level === '2',
        });
        let liClass = classNames({
            active:!this.state.closed,
        });
        return (
            <li style={styleObj} className={liClass}>
                <a href="#" onClick={this.onClick}><i className={iClass}></i>{this.props.text}<span className="fa arrow"></span></a>
                <ul className={ulClass}>{this.props.newLastTxMenus}</ul>
            </li>
        )
    }
}

NavigationMenuItem.propTypes = {
    ClazzType:React.PropTypes.string,
    hasSubMenu:React.PropTypes.bool,
    visible:React.PropTypes.bool,
    text:React.PropTypes.string,
    newLastTxMenus:React.PropTypes.array,
    level:React.PropTypes.string,
    menuId:React.PropTypes.string,
};

NavigationMenuItem.defaultProps = {
    ClazzType:'NavigationMenuItem',
    hasSubMenu:false,
    visible:true,
    text:'',
    newLastTxMenus:[],
    level:'3',
    menuId:'',
};

export default NavigationMenuItem; 