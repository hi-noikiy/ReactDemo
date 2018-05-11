import React, {PropTypes} from 'react';
import classNames from 'classnames';
import { assign } from 'lodash';

class  Row  extends React.Component {
    constructor(props) {
        super(props);
        this.prefix = this.prefix.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        
    }
    prefix(className) {
        let {classPrefix } = this.props;
        let prefix = classPrefix ? classPrefix + '-' : '';
        return prefix + className;
    }
    onRowClick(e){
        this.props.onClick(this.props.rowData, this.props.rowIndex);
        
    }
    render() {
        const {
            children,
            className,
            width,
            height,
            top,
            style,
            isHeaderRow,
            headerHeight,
            rowIndex,
            rowData,
        } = this.props;

        let classes = classNames(
            (rowIndex%2===0) ? this.prefix('row') : this.prefix('row2'),
            isHeaderRow ? this.prefix('row-header') : '',
            (rowData&&rowData.isSelected)? this.prefix('row-selected') : '',
            className);

        let styles = assign({
            minWidth: width,
            height: isHeaderRow ? headerHeight : height,
            top
        }, style);

        return (

            <div
                className={classes}
                style={styles}
                onClick={this.onRowClick}
                >
                {children}
            </div>
        )
    }

}
Row.propTypes =  {
    width: PropTypes.number,
    height: PropTypes.number,
    headerHeight: PropTypes.number,
    top: PropTypes.number,
    style: PropTypes.object,
    isHeaderRow: PropTypes.bool,
}
Row.defaultProps =  {
    height: 36,
    headerHeight: 36,
    isHeaderRow: false,
    classPrefix: 'rsuite-table',
}
export default Row;
