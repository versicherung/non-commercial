import { FC, useEffect } from 'react';
import Footer from '@/components/Footer';
import Logo from '@/assets/logo.svg';
import Banner from './components/Banner';
import styles from './index.module.less';

const Login: FC = () => {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
        <div className={styles['logo-text']}>商非出单系统</div>
      </div>
      <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <Banner />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Login;
