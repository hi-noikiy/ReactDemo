import React from 'react';
import Tab from './Tab';
import FunctionTab from './FunctionTab';
import classNames from 'classnames';

export default class Tabs extends React.Component {

  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleAddFrontClick = this.handleAddFrontClick.bind(this);
    this.handleAddBackClick = this.handleAddBackClick.bind(this);
    this.handleTabDeleteButton = this.handleTabDeleteButton.bind(this);
    
    this._getPanel = this._getPanel.bind(this);

    this.state = {
      activeKey: props.activeKey || props.defaultActiveKey,
      style: props.style || props.defaultStyle,
      children: props.children,
      status: 'static',
    }

  }

  static defaultProps = {
      defaultActiveKey: 0,
      defaultStyle: "tabtab__default__"
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.activeKey !== this.state.activeKey) {
      this.setState({
        activeKey: nextProps.activeKey,
      })
    }
    if (nextProps.children !== this.state.children) {
      this.setState({
        children: nextProps.children,
      })
    }
  }

  handleTabClick(activeKey) {
    if (this.props.handleTabClick) {
      this.props.handleTabClick(activeKey);
    }

    this.setState({
      activeKey: activeKey,
      panelUpdateKey: -1
    })
  }

  handleAddFrontClick() {
    this.props.handleAddFrontClick();
    this.setState({
      panelUpdateKey: 0
    })
  }

  handleAddBackClick() {
    this.props.handleAddBackClick();
  }

  handleTabDeleteButton(key) {
    this.props.handleTabDeleteButton();
    this.setState({
      panelUpdateKey: key
    })
  }
 

  _getPanel() {
    let that = this;
    let tab = [];
    let panel = [];
    React.Children.forEach(this.state.children, function(children, index) {
      // add tabs
      let status;
      if (index === that.state.activeKey) {
        status = 'active';
      } else {
        status = 'inactive';
      }
      let props = {
        activeKey: that.state.activeKey,
        key: 'tab'+index,
        tabKey: index,
        title: children.props.title,
        status: status,
        style: that.state.style,
        handleTabClick: that.handleTabClick,
        tabDeleteButton: that.props.tabDeleteButton,
        handleTabDeleteButton: that.handleTabDeleteButton,
      }
      
      tab.push(<Tab {...props}/>);
      
      if (index === that.state.activeKey) {
        props = {className: classNames(that.state.style + 'panel', status), status: status, key: index};
        if (that.state.panelUpdateKey === index) {
          props.update = true;
        }
        panel.push(React.cloneElement(children, props));
      }
    });
    if(this.props.addFrontTab && tab.length > 0) { //在前面添加Tab
      tab.unshift(<FunctionTab key="ADDFront"
                      tabKey="ADD"
                      title="＋"
                      style={that.state.style}
                      handleTabClick={that.handleAddFrontClick}/>);
    }
    if(this.props.addBackTab && tab.length > 0) { //在后面添加Tab
      tab.push(<FunctionTab key="ADDBack"
        tabKey="ADD"
        title="＋"
        style={that.state.style}
        handleTabClick={that.handleAddBackClick}/>);
    }
    return {tab: tab, panel: panel};
  }

  render() {
    let opt = this._getPanel();
    let wrapper = this.state.style + "wrapper tabtab__clearfix";
    let tabWrapper = this.state.style + "tab__wrapper";
    let panelWrapper = this.state.style + "panel__wrapper";
    return(
      <div className={wrapper}>
        <div className={tabWrapper}>
          {opt.tab}
        </div>
        <div className={panelWrapper}>
          {opt.panel}
        </div>
      </div>
    )
  }

}