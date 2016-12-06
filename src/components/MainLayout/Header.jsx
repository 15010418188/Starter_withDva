
import React, { PropTypes } from 'react';
import { Menu, Icon, Popover} from 'antd';
import { Link } from 'dva/router';
import classnames from 'classnames';
import styles from './Header.less';

const Header = () => {

  return (
    <div className={styles.ceiling}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.h1}>
            中车集团 WPS 使用情况展示平台
          </h1>
        </div>
        <ul className={styles.right}>
          <li>|</li>
          <li>帮助中心</li>
        </ul>
      </div>
    </div>
  );
};

Header.propTypes = {
};

export default Header;
