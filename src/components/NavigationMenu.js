import React from 'react';
import ReactDOM from 'react-dom';
import {MenuItem} from 'react-bootstrap';
import NavigationMenuItem from './NavigationMenuItem.js';
import Autocomplete from '../api/autocomplete/index'
import { matchStateToTerm, sortStates, styles} from '../api/autocomplete/utils'

class NavigationMenu extends React.Component {

    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this); //构造函数中绑定
        this.onSearchInputHandle=this.onSearchInputHandle.bind(this);
        this.onSearchClickHandle=this.onSearchClickHandle.bind(this);
        this.state={
            value: '',
            loading: false,
            filter: false,
            MenuSelects: [],
            selectMenu: {},
        }
    }

    onSearchInputHandle(evt,value) {
        console.log(evt,'onSearchInputHandle');
        this.setState({ value: value, loading: true });
        if (value === ''){

        } else {
            var items = this.props.commonProps.MenuSelects.filter((state) => {
                return matchStateToTerm(state, value)
            });
            setTimeout(() => {
                this.setState({loading: false, filter: true, MenuSelects: items})
            }, 200);
        }
    }
    componentWillReceiveProps(nextProps,nextState){
        
    }

    onSearchClickHandle(evt) {
        this.props.openCurTabForTxOption(this.state.selectMenu.key);
    }

    componentDidUpdate() {
        
    }

    handleItemClick(evt){
        //console.log(evt,'is clicked');
    }

    leftLoadComplete(menuRoot1){
        let lastTxMenu = [];
        let self = this;
        if(menuRoot1) {
            if(menuRoot1.constructor === Array){
                for(let j:int=0; j< menuRoot1.length; j++){
                    let itemj:Object= menuRoot1[j];
                    let itemj1:Array  = itemj["children"];
                    if(itemj1 && itemj1.length > 0){
                        let newLastTxMenus1 = this.leftLoadComplete(itemj);
                        lastTxMenu = lastTxMenu.concat(<NavigationMenuItem key={itemj.id} menuId={itemj.id}
                            toggleSubMenu={this.handleItemClick} level='3' text={itemj.text}   newLastTxMenus={newLastTxMenus1} />);
                    } else if("0"!==itemj.visible){
                        let newLastTxMenus2 = this.leftLoadComplete(itemj);
                        lastTxMenu = lastTxMenu.concat(newLastTxMenus2);
                    }
                }
            }else{
                let  root1:Array = menuRoot1["children"];
                if(root1 && root1.length > 0 && "0"!==menuRoot1.visible){
                    this.props.commonProps.curParent=menuRoot1.text;
                    let newLastTxMenus3 = this.leftLoadComplete(root1);
                    lastTxMenu = lastTxMenu.concat(newLastTxMenus3);
                }else{
                    if(menuRoot1 && menuRoot1.txid && "0"!==menuRoot1.visible){ 
                        let newLastTxMenus = lastTxMenu;
                        newLastTxMenus = newLastTxMenus.concat(<MenuItem  
                            key={menuRoot1.id} eventKey={menuRoot1.id} onSelect={self.props.openCurTabForTxOption}>{menuRoot1.text}</MenuItem>);
                        lastTxMenu = newLastTxMenus;
                        this.props.commonProps.MenuSelects.push({key: menuRoot1.id, txid: menuRoot1.txid, optid: menuRoot1.optid, abbr:  this.props.commonProps.curParent , name:  menuRoot1.text });
                    }
                }
            }
        }
        return lastTxMenu;
    }

    renderItems (items) {
        return items.map((item, index) => {
          let text = item.props.children;
          let parent = item.props.title;
          if (index === 0 || items[index - 1].props.title !== parent) {
            var style = {
              background: '#eee',
              color: '#454545',
              padding: '2px 6px',
              fontWeight: 'bold'
            }
            return [<div style={style}>{parent}</div>, item]
          }
          else {
            return item;
          }
        })
    }

	render() {
        
        this.props.commonProps.MenuSelects=[];

        let menuRoot = this.props.menuRoot;
        let TwoMenu=[];
        for(let i:int=0; i< menuRoot.length; i++){
            let item2:Object= menuRoot[i];
            if("0"!==item2.visible){
                let  root1:Array  = item2["children"];
                if(root1!==null){
                    let threeMenu = this.leftLoadComplete(root1);
                    TwoMenu.push(
                    <NavigationMenuItem key={item2.id} menuId={item2.id}
                            toggleSubMenu={this.handleItemClick} level='2' text={item2.text}   newLastTxMenus={threeMenu} />);
                }
            }
        }
        let menus = this.props.commonProps.MenuSelects;
        if(this.state.MenuSelects && this.state.filter && this.state.value) {
            menus = this.state.MenuSelects;
        }

    	return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <div className='nav2'>
                    <ul className="nav" id="side-menu" ref='side-menu'>
                        <li className="sidebar-search">
                            <div className="input-group custom-search-form">
                                <Autocomplete className="form-control"
                                  value={this.state.value}
                                  inputProps={{name: "MenuSelect", id: "menu-select-autocomplete"}}
                                  items={menus}
                                  getItemValue={(item) => item.optid}
                                  onSelect={(value, state) => this.setState({ value,selectMenu: state}) }
                                  onChange={this.onSearchInputHandle}
                                  renderItem={(item, isHighlighted) => (
                                    <div
                                      style={isHighlighted ? styles.highlightedItem : styles.item}
                                      key={item.key}
                                      title={item.abbr}
                                    >{item.name}</div>
                                  )}
                                  renderMenu={(items, value, style) => (
                                    <div style={{...styles.menu, ...style}}>
                                      {value === '' ? (
                                        <div style={{padding: 1}}>输入菜单名称</div>
                                      ) : this.state.loading ? (
                                        <div style={{padding: 1}}>查询...</div>
                                      ) : items.length === 0 ? (
                                        <div style={{padding: 1}}>没找到满足 {value}</div>
                                      ) : this.renderItems(items)}
                                    </div>
                                  )}
                                />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={this.onSearchClickHandle}>
                                        <i className="fa fa-search"></i>
                                    </button>
                            	</span>
                            </div>
                            
                        </li>
                        <li>
                            <a href="index.html"><i className="fa fa-dashboard fa-fw"></i>首页</a>
                        </li>

                        {TwoMenu}
                        
                    </ul>
                    </div>
                </div>
            </div>
            )
	}

}
NavigationMenu.propTypes = {
    ClazzType:React.PropTypes.string,
    commonProps:React.PropTypes.object,
};

NavigationMenu.defaultProps = {
    ClazzType:'NavigationMenu',
    commonProps:{MenuSelects:[]},
};
export default NavigationMenu; 