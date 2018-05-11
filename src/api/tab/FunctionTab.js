import React from 'react';
import classNames from 'classnames';

export default class FunctionTab extends React.Component {
  constructor(props) {
    super(props);
    this.clickTab = this.clickTab.bind(this);
  }

  clickTab() {
    this.props.handleTabClick();
  }

  render() {
    let tabClass;

    tabClass = classNames(this.props.style + 'tab', 'add');

    return (
      <span>
        <li className={tabClass} onClick={this.clickTab}>
          {this.props.title}
        </li>
      </span>
    );
  }
};