import React, {PropTypes} from 'react';


class  Column  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        //组件 <Column> 不需要渲染
        return null;
    }
}
Column.propTypes =  {
    align: PropTypes.oneOf(['left', 'center', 'right']),
    width: PropTypes.number.isRequired,
    fixed: PropTypes.bool,
    resizable: PropTypes.bool,
    sortable: PropTypes.bool,
}
Column.defaultProps =  {
    classPrefix: 'rsuite-table',
}
export default Column;
