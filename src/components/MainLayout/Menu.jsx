import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './Menu.less';
import classnames from 'classnames';

const SubMenu = Menu.SubMenu;

const getMenuKeyFromUrl = ({pathname , onCollapseChange}) => {
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {}
  return key;
}

let collapse = false;

function MenuBar({ location,mainLayout,onCollapseChange}) {
  const { collapse } = mainLayout;

  const collapseSytle = classnames({
    [styles.sider]:  true,
    [styles.sider_collapse]:collapse,
  });

  const analyticalTitle =
    (<span><Icon type="area-chart" />
  <span className={styles.nav_text}>分析页面</span>
    </span>)

  const settingTitle =
    (<span><Icon type="setting" />
  <span className={styles.nav_text}>管理页面</span>
    </span>)

  const GetMenu = () => {
    if (mainLayout.showMenu) {
      return (<Menu
        mode={mainLayout.menuMode}
        theme="dark"
        selectedKeys={[getMenuKeyFromUrl(location.pathname)]}>

        <SubMenu title={analyticalTitle}>
          <Menu.Item key="/activity">
            <Link to="/activity">
              <span className={styles.nav_text}>报活数据</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/install">
            <Link to="/install">
              <span className={styles.nav_text}>安装数据</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/version">
            <Link to="/version">
              <span className={styles.nav_text}>版本数据</span>
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu title={settingTitle}>
          <Menu.Item key="/managent">
            <Link to="/managent">
              <span className={styles.nav_text}>企业信息</span>
            </Link>
          </Menu.Item>
        </SubMenu>


      </Menu>)
    }
  }

  return (
    <aside className={collapseSytle}>
      <div className={styles.logo}>
      </div>
      { GetMenu() }
      <div className={styles.action} onClick={onCollapseChange}>
        {collapse ? <Icon type="right" /> : <Icon type="left" />}
      </div>
    </aside>
  );
}

MenuBar.propTypes = {
  location: PropTypes.object,
  onCollapseChange:PropTypes.func,
  mainLayout:PropTypes.object,
};

export default MenuBar;


// <Menu.Item key="/">
//   <Link to="/overview"><Icon type="laptop" />
//     <span className={styles.nav_text}>概览</span>
//   </Link>
// </Menu.Item>
// <SubMenu title={analyticalTitle}>
//   <Menu.Item key="/analytical">
//     <Link to="/company">
//       <span className={styles.nav_text}>按企业维度</span>
//     </Link>
//   </Menu.Item>
//   <Menu.Item key="/group">
//     <Link to="/group">
//       <span className={styles.nav_text}>按集团维度</span>
//     </Link>
//   </Menu.Item>
// </SubMenu>
