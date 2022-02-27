import { useRef, useState, useEffect } from 'react';
import { Form, Input, Space, Checkbox, Button } from '@arco-design/web-react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import { FormInstance } from '@arco-design/web-react/es/Form';
import useStorage from '@/utils/useStoreage';

import styles from './form.module.less';

const LoginForm = () => {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');
  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  const onSubmitClick = () => {
    formRef.current?.validate().then((values) => {
      console.log(values);
    });
  };

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>登录商非出单系统</div>
      <div className={styles['login-form-sub-title']}>登录商非出单系统</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>

      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={(r) => {
          formRef.current = r as FormInstance;
        }}
      >
        <Form.Item
          field="username"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder="请输入用户名"
            // onPressEnter={onSubmitClick}
          />
        </Form.Item>

        <Form.Item
          field="password"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder="请输入密码"
            // onPressEnter={onSubmitClick}
          />
        </Form.Item>

        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              记住密码
            </Checkbox>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            登录
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default LoginForm;
