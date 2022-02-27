import { FC, Suspense, useMemo, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Routes, Route } from 'react-router-dom';
import cs from 'classnames';
import nProgress from 'nprogress';
import { Layout, Spin } from '@arco-design/web-react';
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon';
import { settingsState } from '@/store';
import useRoute, { RouteType } from '@/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import styles from './index.module.less';

const Sider = Layout.Sider;
const Content = Layout.Content;

const LoadingComponent: FC = () => {
  useEffect(() => {
    nProgress.start();

    return () => {
      nProgress.done();
    };
  });

  return (
    <div className={styles.spin}>
      <Spin />
    </div>
  );
};

const getFlattenRoutes = (routes: RouteType[]): RouteType[] => {
  const res: RouteType[] = [];

  function travel(_routes: RouteType[], path = '') {
    _routes.forEach((route) => {
      const realPath = route.path === '' ? path : `${path}/${route.path}`;
      if (
        !route.children &&
        route.element !== undefined &&
        route.element !== null
      ) {
        const r: RouteType = {
          ...route,
          path: realPath,
          element: route.element,
        };
        res.push(r);
      } else if (Array.isArray(route.children) && route.children.length) {
        travel(route.children, realPath);
      }
    });
  }

  travel(routes);
  return res;
};

const PageLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const settings = useRecoilValue(settingsState);

  const [routes] = useRoute({});
  const flattenRoutes = useMemo(() => getFlattenRoutes(routes), [routes]);

  const navbarHeight = 60;
  const menuWidth = collapsed ? 48 : settings.menuWidth;

  const paddingLeft = settings.menu ? { paddingLeft: menuWidth } : {};
  const paddingTop = settings.navbar ? { paddingTop: navbarHeight } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };

  return (
    <Layout className={styles.layout}>
      <div
        className={cs(styles['layout-navbar'], {
          [styles['layout-navbar-hidden']]: !settings.navbar,
        })}
      >
        <Navbar />
      </div>

      <Layout>
        {settings.menu && (
          <Sider
            className={styles['layout-sider']}
            width={menuWidth}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            collapsible
            breakpoint="xl"
            style={paddingTop}
          >
            <div className={styles['menu-wrapper']}></div>
            <div
              className={styles['collapse-btn']}
              onClick={() => setCollapsed((state) => !state)}
            >
              {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
            </div>
          </Sider>
        )}

        <Layout className={styles['layout-content']} style={paddingStyle}>
          <div className={styles['layout-content-wrapper']}>
            <Content>
              <Routes>
                {flattenRoutes.map((item, index) => {
                  const Element: any = item.element;
                  return (
                    <Route
                      key={index}
                      path={item.path}
                      element={
                        <Suspense fallback={<LoadingComponent />}>
                          <Element />
                        </Suspense>
                      }
                      index={item.index}
                    />
                  );
                })}
              </Routes>
            </Content>
          </div>
          {settings.footer && <Footer />}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
