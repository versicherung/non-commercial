import { FC } from 'react';
import { Tooltip } from '@arco-design/web-react';
import { IconSunFill, IconMoonFill } from '@arco-design/web-react/icon';
import Logo from '@/assets/logo.svg';
import { useGlobalContext } from '@/ctx';

import IconButton from './components/IconButton';

import styles from './index.module.less';

interface Props {
  show: boolean;
}

const NavBar: FC<Props> = ({ show }) => {
  const { theme, setTheme } = useGlobalContext();

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
              icon={theme !== 'dark' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => setTheme?.(theme === 'light' ? 'dark' : 'light')}
            />
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
