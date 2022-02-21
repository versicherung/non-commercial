import { FC } from 'react';
import cs from 'classnames';
import { Layout } from '@arco-design/web-react';
import { useAppSelector } from '@/store';
import { selectSettings } from '@/store/settings';
import NavBar from '@/components/NavBar';

import styles from './index.module.less';

const PageLayout: FC = ({ children }) => {
  const settings = useAppSelector(selectSettings);

  const showNavBar = settings.navbar;

  return (
    <Layout className={styles.layout}>
      <div
        className={cs(styles['layout-navbar'], {
          [styles['layout-navbar-hidden']]: !showNavBar,
        })}
      >
        <NavBar />
      </div>
      {children}
    </Layout>
  );
};

export default PageLayout;
