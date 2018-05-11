import React, {PropTypes} from 'react';
import classNames from 'classnames';
import { assign } from 'lodash';

class  CellGroup  extends React.Component {
    constructor(props) {
        super(props);
        this.prefix = this.prefix.bind(this);
        this.state = {
            
        }
    }
    
    prefix(className) {
        let {classPrefix } = this.props;
        let prefix = classPrefix ? classPrefix + '-' : '';
        return prefix + className;
    }
    render() {

        let {
            children,
            fixed,
            width,
            left,
            height,
            style,
            className
        } = this.props;

        let classes = classNames(
            className,
            this.prefix('cell-group'),
            fixed ? 'fixed' : ''
        );
        let styles = assign({ width, left, height }, style);

        return (
            <div className={classes} style={styles}>
                {children}
            </div>
        );
    }

}

CellGroup.propTypes =  {
    fixed: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    style: PropTypes.string,
}
CellGroup.defaultProps =  {
    classPrefix: 'rsuite-table',
}
export default CellGroup;
