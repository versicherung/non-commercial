import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { Tooltip, Dropdown, Avatar, Menu } from '@arco-design/web-react';
import {
  IconSunFill,
  IconMoonFill,
  IconPoweroff,
} from '@arco-design/web-react/icon';
import { themeState } from '@/store';
import Logo from '@/assets/logo.svg';
import IconButton from './components/IconButton';

import styles from './index.module.less';

const Navbar: FC = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const droplist = (
    <Menu>
      <Menu.Item key="logout">
        <IconPoweroff className={styles['dropdown-icon']} />
        退出登录
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
          <Tooltip>
            <IconButton
              icon={theme === 'light' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </Tooltip>
        </li>
        <li>
          <Dropdown droplist={droplist} position="br">
            <Avatar size={32} style={{ cursor: 'pointer' }}>
              <img
                alt="avatar"
                src="https://tse3-mm.cn.bing.net/th/id/OIP-C.O_zY6CYuQs_o0huiSCzjtAAAAA?pid=ImgDet&rs=1"
              />
            </Avatar>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
