import { FC, ReactNode } from 'react';
import cs from 'classnames';
import { Button } from '@arco-design/web-react';

import styles from './icon-button.module.less';

interface Props {
  icon: ReactNode;
  className?: string | string[];
  onClick: () => void;
}

const IconButton: FC<Props> = (props) => {
  const { icon, className, ...rest } = props;

  return (
    <Button
      icon={icon}
      shape="circle"
      type="secondary"
      className={cs(styles['icon-button'], className)}
      {...rest}
    />
  );
};

export default IconButton;
