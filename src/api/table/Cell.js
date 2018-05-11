import React, {PropTypes} from 'react';
import classNames from 'classnames';
import { assign } from 'lodash';

const LAYER_WIDTH = 30;
class  Cell  extends React.Component {
    constructor(props) {
        super(props);
        this.prefix = this.prefix.bind(this);
        this.renderCell = this.renderCell.bind(this);
        this.state = {
            
        }
    }
    prefix(className) {
        let {classPrefix } = this.props;
        let prefix = classPrefix ? classPrefix + '-' : '';
        return prefix + className;
    }
    renderCell(content) {

        let {
            width,
            left,
            height,
            style,
            className,
            firstColumn,
            lastColumn,
            isHeaderCell,
            headerHeight,
            layer,
            onTreeToggle,
            hasChildren,
            rowIndex,
            rowKey,
            align,
            sortable,
            rowData,
        } = this.props;


        const classes = classNames(
            this.prefix('cell'),
            className, {
                'sortable':sortable && isHeaderCell,
                'first': firstColumn,
                'last': lastColumn
            });
        const layerWidth = layer * LAYER_WIDTH;

        width = !isHeaderCell && firstColumn ? width - layerWidth : width;

        let bgColor = '';
        if(!isHeaderCell) {
            if(rowData&&rowData.isSelected){
                bgColor='#FFFAF0';
            } else {
                bgColor=((rowIndex%2===0) ? '#ffffff':'#f5f5f5');
            }
        }

        let styles = assign({
            height: isHeaderCell ? headerHeight : height,
            zIndex: layer,
            width: width,
            left: !isHeaderCell && firstColumn ? left + layerWidth : left,
            background: bgColor,
        }, style);

        let contentStyles = {
            width: width,
            textAlign: align
        };

        if (sortable) {
            contentStyles.paddingRight = 8;
        }

        const expandIcon = hasChildren && firstColumn ? (
            <i className="expand-icon fa"
                onClick={ event => onTreeToggle(rowKey, rowIndex, event) }>
            </i>
        ) : null;

        content = (
            <div className={this.prefix('cell-content') } style={ contentStyles } >
                {expandIcon}
                {content}
            </div>
        );

        return (
            <div className={classes} style={styles} >
                <div className={this.prefix('cell-wrap1') }>
                    <div className={this.prefix('cell-wrap2') }>
                        <div className={this.prefix('cell-wrap3') }>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        const {
            children,
            rowData,
            isHeaderCell,
            dataKey,
            
        } = this.props;

        if (isHeaderCell) {
            return this.renderCell(children);
        }

        return this.renderCell(children || rowData[dataKey]);
    }

}

Cell.propTypes =  {
    dataKey: PropTypes.string,

    align: PropTypes.oneOf(['left', 'center', 'right']),
    className: PropTypes.string,
    isHeaderCell: PropTypes.bool,

    width: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    headerHeight: PropTypes.number,

    rowData: PropTypes.object,
    rowIndex: PropTypes.number,

    cellData: PropTypes.any,
    cellRenderer: PropTypes.func,

    fixed: PropTypes.bool,

    style: PropTypes.object,
    firstColumn: PropTypes.bool,
    lastColumn: PropTypes.bool,
    hasChildren: PropTypes.bool,

    onTreeToggle: PropTypes.func,
}
Cell.defaultProps =  {
    align: 'left',
    headerHeight: 36,
    height: 36,
    classPrefix: 'rsuite-table',
}

export default Cell;
