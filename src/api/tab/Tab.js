import React from 'react';
import classNames from 'classnames';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabDeleteButton = this.handleTabDeleteButton.bind(this);
    this.clickTab = this.clickTab.bind(this);
  }

  handleTabDeleteButton(e) {
    e.stopPropagation(); //prevent trigger clickTab function
    this.props.handleTabDeleteButton(this.props.tabKey);
  }

  clickTab() {
    this.props.handleTabClick(this.props.tabKey);
  }

  render() {
    let tabClass,
        closeButtonStyle;
    
    if (this.props.status === 'active') {
      tabClass = classNames(this.props.style + 'tab', 'active');
    } else {
      tabClass = classNames(this.props.style + 'tab');
    }

    // only show the delete button when it's active
    if (this.props.tabDeleteButton && this.props.status === "active" && this.props.tabKey !== 0) {
      closeButtonStyle = {display: 'inline-block'};
    } else {
      closeButtonStyle = {display: 'none'};
    }

    return (
      <div className={tabClass} onClick={this.clickTab}>
        {this.props.title}
        <div className="tabtab__folder__circCont" style={closeButtonStyle}>
          <div className="tabtab__folder__circle" onClick={this.handleTabDeleteButton}></div>
        </div>
      </div>
    )
  }
}