import React, {PropTypes} from 'react';
import classNames from 'classnames';
import { DOMMouseMoveTracker } from '../lib';
import shallowEqual from './utils/shallowEqual';


function clamp(value, min, max) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}

class  ColumnResizeHandle  extends React.Component {
    constructor(props) {
        super(props);
        this.prefix = this.prefix.bind(this);
        this._getMouseMoveTracker = this._getMouseMoveTracker.bind(this);
        this._onColumnResizeMouseDown = this._onColumnResizeMouseDown.bind(this);

        this._onMove = this._onMove.bind(this);
        this._onColumnResizeEnd = this._onColumnResizeEnd.bind(this);
        this.state = {
            columnWidth: props.columnWidth,
            cursorDelta: 0,
            visible: false
        }
    }
    prefix(className) {
        let {classPrefix } = this.props;
        let prefix = classPrefix ? classPrefix + '-' : '';
        return prefix + className;
    }
    _onMove(deltaX, deltaY) {

        if (!this.isKeyDown) {
            return;
        }

        var newWidth = this.state.cursorDelta + deltaX;
        var newColumnWidth = clamp(this.props.columnWidth + newWidth, 20);

        this.setState({
            columnWidth: newColumnWidth,
            cursorDelta: newWidth
        });

        this.props.onColumnResizeMove(newColumnWidth, this.props.columnLeft, this.props.columnFixed);
    }

    _onColumnResizeEnd() {

        this.isKeyDown = false;

        this.props.onColumnResizeEnd(
            this.state.columnWidth,
            this.state.cursorDelta
        );

        if (this._mouseMoveTracker) {
            this._mouseMoveTracker.releaseMouseMoves();
            this._mouseMoveTracker = null;
        }

        this.setState({
            visible: false
        });
    }
    _getMouseMoveTracker() {
        return this._mouseMoveTracker || new DOMMouseMoveTracker(
            this._onMove,
            this._onColumnResizeEnd,
            document.body
        );
    }
    _onColumnResizeMouseDown(event) {

        this._mouseMoveTracker = this._getMouseMoveTracker();
        this.isKeyDown = true;
        this.setState({
            visible: true,
            cursorDelta: 0
        });

        this.props.onColumnResize(
            this.props.columnWidth,
            this.props.columnLeft, {
                clientX: event.clientX,
                clientY: event.clientY,
                preventDefault: function () { }
            }
        );


    }
    componentWillReceiveProps(newProps) {
        if (this.isKeyDown && newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
            this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
        }
    }
    componentWillUnmount() {
        if (this._mouseMoveTracker) {
            this._mouseMoveTracker.releaseMouseMoves();
            this._mouseMoveTracker = null;
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState);
    }
    render() {
        let {columnLeft} = this.props;
        let {columnWidth, visible} = this.state;

        let styles = {
            width: 6,
            left: columnWidth + columnLeft - 2
        };

        let classes = classNames({ visible }, this.prefix('column-resize-spanner'));

        return (
            <div
                className={classes}
                style={styles}
                onMouseDown={this._onColumnResizeMouseDown}
                ref='spanner'
                >
            </div>
        );
    }
}
ColumnResizeHandle.propTypes =  {
    columnWidth: PropTypes.number,
    columnLeft: PropTypes.number,
    columnFixed: PropTypes.bool,
    onColumnResize: PropTypes.func,
    onColumnResizeEnd: PropTypes.func,
    onColumnResizeMove: PropTypes.func,
}
ColumnResizeHandle.defaultProps =  {
    classPrefix: 'rsuite-table',
}
export default ColumnResizeHandle;
