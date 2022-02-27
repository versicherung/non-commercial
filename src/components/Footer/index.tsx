import { FC } from 'react';
import cs from 'classnames';
import { Layout } from '@arco-design/web-react';
import { FooterProps } from '@arco-design/web-react/es/Layout/interface';
import styles from './index.module.less';

const Footer: FC<FooterProps> = (props) => {
  const { className, ...restProps } = props;
  return (
    <Layout.Footer className={cs(styles.footer, className)} {...restProps}>
      商非出单系统 © 2022-2022 版权所有
    </Layout.Footer>
  );
};

export default Footer;
