import { ForwardRefRenderFunction, forwardRef, Ref, ReactNode } from 'react';
import { Button } from '@arco-design/web-react';
import cs from 'classnames';

import styles from './index.module.less';

interface Props {
  icon: ReactNode;
  className?: string | string[];
  onClick: () => void;
}

const IconButton: ForwardRefRenderFunction<Ref<unknown>, Props> = (
  props,
  ref
) => {
  const { icon, className, ...rest } = props;

  return (
    <Button
      ref={ref}
      icon={icon}
      shape="circle"
      type="secondary"
      className={cs(styles['icon-button'], className)}
      {...rest}
    />
  );
};

export default forwardRef(IconButton);
