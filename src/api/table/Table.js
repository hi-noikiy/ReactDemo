import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { on, scrollLeft, scrollTop, addStyle, addClass, removeClass, toggleClass } from '../lib';

import { assign } from 'lodash';

import Row from './Row';
import CellGroup from './CellGroup';
import isIE8 from './utils/isIE8.js';

const ReactChildren = React.Children;

class Table  extends React.Component {
    constructor(props) {
        super(props);
        this.prefix = this.prefix.bind(this);
        this.getFixedCellGroups = this.getFixedCellGroups.bind(this);
        this.handleBodyScroll = this.handleBodyScroll.bind(this);
        this._onColumnResizeEnd = this._onColumnResizeEnd.bind(this);
        this._onColumnResize = this._onColumnResize.bind(this);
        this._onColumnResizeMove = this._onColumnResizeMove.bind(this);
        this._onTreeToggle = this._onTreeToggle.bind(this);
        this.cloneCell = this.cloneCell.bind(this);

        this.getCells = this.getCells.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.randerRowData = this.randerRowData.bind(this);
        this.renderMouseArea = this.renderMouseArea.bind(this);
        this.onRowClickHandle = this.onRowClickHandle.bind(this);
        this.onHeadClickHandle = this.onHeadClickHandle.bind(this);

        this.handleSelectRowId=this.handleSelectRowId.bind(this);

        this.state = {
            columnWidth: 0,
            mouseAreaLeft: -1,
            dataKey: 0,
            scrollLeft: 0,
            scrollTop: 0,
            resizeColumnFixed: false,
            selected: false,
        };
    }
    
    prefix(className) {
        let {classPrefix } = this.props;
        let prefix = classPrefix ? classPrefix + '-' : '';
        return prefix + className;
    }

    getFixedCellGroups() {
        return findDOMNode(this.refs['table']).querySelectorAll(`.${this.props.classPrefix}-cell-group.fixed`);
    }
    handleBodyScroll() {

        let {tableBody, tableHeader} = this.refs;
        let tableHeaderDom = findDOMNode(tableHeader);
        let groups = this.getFixedCellGroups();
        let handelClass = { addClass, removeClass };

        let left = scrollLeft(tableBody);
        let top = scrollTop(tableBody);

        this.scrollLeft = left;
        for (let i = 0; i < groups.length; i++) {
            let group = groups[i];
            addStyle(group, { left: left + 'px' });
            let toggle = left > 1 ? 'addClass' : 'removeClass';
            !isIE8 && handelClass[toggle](group, 'shadow');
        }
        // groups.forEach((group) => {
            
        // });

        addStyle(tableHeaderDom, { left: (-left) + 'px' });

        let toggle = top > 1 ? 'addClass' : 'removeClass';
        !isIE8 && handelClass[toggle](tableHeaderDom, 'shadow');
    }

    _onColumnResizeEnd(columnWidth, cursorDelta, dataKey, index) {
        this.setState({
            isColumnResizing: false,
            mouseAreaLeft: -1,
            [`${dataKey}_${index}_width`]: columnWidth
        });
    }

    _onColumnResize(width, left, event) {
        this.setState({
            isColumnResizing: true
        });
    }

    _onColumnResizeMove(width, left, fixed) {

        this.setState({
            resizeColumnFixed: fixed,
            mouseAreaLeft: width + left
        });
    }

    _onTreeToggle(rowKey, index) {
        toggleClass(findDOMNode(this.refs[`children_${rowKey}_${index}`]), 'open');
    }

    cloneCell(Cell, props) {
        return React.cloneElement(Cell, props, Cell.props.children);
    }

    

    getCells() {
        let left = 0;                  // Cell left margin
        let isFixedColumn = false;     // IF there are fixed columns
        const headerCells = [];          // Table header cell
        const bodyCells = [];            // Table body cell
        const columns = this.props.children;
        const { sortColumn, sortType, onSortColumn} = this.props;

        ReactChildren.map(columns, (column, index) => {

            let columnChildren = column.props.children;
            let { width, fixed, align, sortable, resizable} = column.props;

            if (columnChildren.length !== 2) {
                throw new Error(`Component <HeaderCell> and <Cell> is required, column index: ${index} `);
            }

            if (fixed) {
                isFixedColumn = true;
            }

            width = this.state[`${columnChildren[1].props.dataKey}_${index}_width`] || width;

            let cellProps = {
                width, fixed, left, align, resizable, sortable, index, 
                height: this.props.rowHeight,
                headerHeight: this.props.headerHeight,
                firstColumn: (index === 0),
                lastColumn: (index === columns.length - 1),
                key: index,
                
            };

            let hCellProps = {
                width, fixed, left, align:columnChildren[0].props.align, resizable, sortable, index, 
                height: this.props.rowHeight,
                headerHeight: this.props.headerHeight,
                firstColumn: (index === 0),
                lastColumn: (index === columns.length - 1),
                key: index,
                
            };

            let headerCellsProps = {
                headerHeight: this.props.headerHeight || this.props.rowHeight,
                dataKey: columnChildren[1].props.dataKey,
                sortColumn, sortType, onSortColumn
            };

            if (resizable) {
                headerCellsProps.onColumnResizeEnd = this._onColumnResizeEnd;
                headerCellsProps.onColumnResize = this._onColumnResize;
                headerCellsProps.onColumnResizeMove = this._onColumnResizeMove;
            }

            headerCells.push(this.cloneCell(columnChildren[0], assign(hCellProps, headerCellsProps)));
            bodyCells.push(this.cloneCell(columnChildren[1], cellProps));

            left += width;
        });

        return {
            headerCells,
            bodyCells,
            isFixedColumn,
            allColumnsWidth: left
        };
    }

    componentDidMount() {
        this._onBodyScrollListener = on(this.refs['tableBody'], 'scroll', this.handleBodyScroll);
    }
    componentDidUpdate(nextProps) {
        this.handleBodyScroll();
    }
    componentWillUnmount() {
        if (this._onBodyScrollListener) {
             this._onBodyScrollListener.off();
        }
    }
    
    onRowClickHandle(rowData, rowIndex){
        if(!this.props.isCheck){
            if(!this.props.isTree) {
                for (let i = 0; i < this.props.data.length; i++) {
                    let rDt = this.props.data[i];
                    if(rDt['__rowid'] === rowData['__rowid']) {
                        rDt['isSelected'] = true;
                    } else {
                        rDt['isSelected'] = false;
                    }
                }
            } else {
                this.handleSelectRowId(this.props.data, rowData['__rowid'])
            }

            this.setState({
                selected: true,
            })
        }

        this.props.onRowClick(rowData, rowIndex);
    }
    handleSelectRowId(rows, _rowId){
        if(rows === undefined || rows.length === 0) {
            return;
        }

        for(let i=0, j=rows.length; i<j; i++) {
            let sinRow=rows[i] ;
            if(sinRow !== undefined) {
                let key1=sinRow.__rowid;
                if(key1 !== undefined && _rowId !== undefined && key1.toString() === _rowId.toString()){
                    sinRow['isSelected'] = true;
                } else {
                    sinRow['isSelected'] = false;
                }

                if(sinRow.row && sinRow.row.constructor === Array){
                    this.handleSelectRowId(sinRow.row, _rowId) ;
                }
            }
        }
    }
    onHeadClickHandle(){
        
    }
    renderTableHeader(headerCells, rowWidth) {
        const {rowHeight, headerHeight} = this.props;
        const row = this.renderRow({
            ref: 'tableHeader',
            width: rowWidth,
            height: rowHeight,
            headerHeight: headerHeight,
            isHeaderRow: true,
            onClick: this.onHeadClickHandle,
            top: 0

        }, headerCells);

        return (
            <div className={this.prefix('header-row-wrapper')}>
                {row}
            </div>
        );
    }

    randerRowData(bodyCells, rowData, props) {
        const hasChildren = this.props.isTree && rowData.row && Array.isArray(rowData.row) && rowData.row.length > 0;
        const rowKey = '_' + (Math.random() * 1E18).toString(36).slice(0, 5).toUpperCase();
        const row = this.renderRow({
            key: props.index,
            rowIndex: props.index,
            width: props.rowWidth,
            height: props.rowHeight,
            top: props.top,
            onClick: this.onRowClickHandle,
            rowData
        }, bodyCells.map((cell, key) => React.cloneElement(cell, {
            key: key,
            layer: props.layer,
            hasChildren: hasChildren,
            rowIndex: props.index,
            onTreeToggle: this._onTreeToggle,
            rowKey,
            rowData
        }, cell.props.children)));


        //insert children
        if (hasChildren) {
            props.layer++;

            let childrenClasses = classNames(this.prefix('row-children'), {
                open: this.props.expand
            });

            
            return (
                <div className={childrenClasses}
                    data-layer={props.layer}
                    ref={`children_${rowKey}_${props.index}`}
                    key={props.index} >
                    {row}
                    <div className="children" >
                        {rowData.row.map((child, index) => this.randerRowData(bodyCells, child, Object.assign({}, props, { index })))}
                    </div>
                </div>
            );

        }
        return row;
    }

    renderTableBody(bodyCells, rowWidth, allColumnsWidth) {

        const {headerHeight, rowHeight, height, data, isTree} = this.props;
        const bodyStyles = {
            top: isTree ? 0 : headerHeight || rowHeight,
            height: height - (headerHeight || rowHeight)
        };

        let top = 0;    //Row position
        let layer = 0;  //Tree layer
        let rows = (data.length > 0) ? data.map((rowData, index) => {
            let row = this.randerRowData(bodyCells, rowData, {
                index, top, rowWidth, rowHeight, layer
            });

            !isTree && (top += rowHeight);
            return row;
        }) : (
                <div className={this.prefix('body-info')}>
                    {this.props.locale.emptyMessage}
                </div>
            );



        return (
            <div ref="tableBody"
                className={this.prefix('body-row-wrapper')}
                style={bodyStyles}>
                {rows}
            </div>
        );
    }
    renderMouseArea() {
        const { height } = this.props;
        const scrollLeft = this.scrollLeft || 0;
        const {mouseAreaLeft, resizeColumnFixed} = this.state;

        const styles = {
            height,
            left: (resizeColumnFixed ? mouseAreaLeft : mouseAreaLeft - scrollLeft)
        };

        return (
            <div ref="mouseArea" className={this.prefix('mouse-area')} style={styles}></div>
        );
    }
    

    renderRow(props, cells) {

        //IF there are fixed columns, add a fixed group
        if (this.isFixedColumn) {

            let fixedCells = cells.filter(function (cell) {
                return cell.props.fixed;
            });

            let otherCells = cells.filter(function (cell) {
                return !cell.props.fixed;
            });

            let fixedCellGroupWidth = 0;

            fixedCells.forEach((item) => {
                fixedCellGroupWidth += item.props.width;
            });

            return (
                <Row {...props}>
                    <CellGroup
                        fixed
                        height={props.isHeaderRow ? props.headerHeight : props.height}
                        width={fixedCellGroupWidth}>
                        {fixedCells}
                    </CellGroup>
                    <CellGroup>{otherCells}</CellGroup>
                </Row>
            );

        }

        return (
            <Row {...props}>
                {cells}
            </Row>
        );

    }

    render() {
        const {
            children,
            className,
            width = 0,
            height,
            style,
            rowHeight,
            classPrefix,
            isTree,
            id
        } = this.props;

        let {headerCells, bodyCells, allColumnsWidth, isFixedColumn} = this.getCells();
        let rowWidth = allColumnsWidth > width ? allColumnsWidth : width;

        //Check there are fixed columns
        this.isFixedColumn = isFixedColumn;

        const clesses = classNames(
            classPrefix,
            isTree ? this.prefix('treetable') : '',
            className, {
                'column-resizing': this.state.isColumnResizing
            }
        );

        const styles = assign({ width: width || 'auto', height }, style);

        return (
            <div className={clesses} style={styles} ref='table' id={id}>
                {this.renderTableHeader(headerCells, rowWidth)}
                {this.renderTableBody(bodyCells, rowWidth, allColumnsWidth)}
                {!isIE8 && this.renderMouseArea()}
            </div>
        );
    }
    
}

Table.propTypes =  {
    width: PropTypes.number,
    data: PropTypes.array.isRequired,
    height: PropTypes.number,
    rowHeight: PropTypes.number,
    headerHeight: PropTypes.number,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    onRowClick: PropTypes.func,
    isTree: PropTypes.bool,
    expand: PropTypes.bool,
    locale: PropTypes.object,
    sortColumn: PropTypes.string,
    sortType: PropTypes.oneOf(['desc', 'asc']),
    onSortColumn: PropTypes.func
}
Table.defaultProps =  {
    height: 200,
    headerHeight: 30,
    rowHeight: 30,
    sortType: 'asc',
    locale: {
        emptyMessage: '表格中数据为空'
    },
    classPrefix: 'rsuite-table',
}

export default Table;
