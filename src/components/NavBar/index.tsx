/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';
import { Tooltip, Dropdown, Avatar, Menu } from '@arco-design/web-react';
import {
  IconSunFill,
  IconMoonFill,
  IconPoweroff,
} from '@arco-design/web-react/icon';
import Logo from '@/assets/logo.svg';
import avatarImg from '@/assets/avatar.jpg';
import { useGlobalContext } from '@/ctx';

import IconButton from './components/IconButton';

import styles from './index.module.less';

interface Props {
  show: boolean;
}

const NavBar: FC<Props> = ({ show }) => {
  const { theme, setTheme } = useGlobalContext();

  const droplist = (
    <Menu>
      <Menu.Item key="logout">
        <IconPoweroff className={styles['dropdown-icon']} />
        退出系统
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>商非出单系统</div>
        </div>
      </div>
      <ul className={styles.right}>
        <li>
          <Tooltip
            content={
              theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'
            }
          >
            <IconButton
              icon={theme !== 'dark' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => setTheme?.(theme === 'light' ? 'dark' : 'light')}
            />
          </Tooltip>
        </li>
        <li>
          <Dropdown droplist={droplist} position="br">
            <Avatar size={32} style={{ cursor: 'pointer' }}>
              <img src={avatarImg.src} alt="avatar" />
            </Avatar>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
