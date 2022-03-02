import { FC, Suspense, ReactNode } from 'react';
import cs from 'classnames';
import nProgress from 'nprogress';
import qs from 'query-string';
import { Layout, Spin, Menu, Breadcrumb } from '@arco-design/web-react';
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon';
import { settingsState } from '@/store';
import useRoute, { RouteType } from '@/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import styles from './index.module.less';

const Sider = Layout.Sider;
const Content = Layout.Content;

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

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

const getMenuItems = (routes: RouteType[]): ReactNode[] => {
  function travel(_routes: RouteType[], path = ''): ReactNode[] {
    return _routes.map((route) => {
      let iconDom: ReactNode = <div className={styles['icon-empty']} />;
      if (route.icon !== undefined) {
        const Icon = route.icon;
        iconDom = <Icon className={styles.icon} />;
      }
      const titleDom = (
        <>
          {iconDom} {route.name}
        </>
      );
      const realPath =
        route.path === ''
          ? path
          : `${path}${path === '' ? '' : '/'}${route.path}`;
      if (
        route.element &&
        (!Array.isArray(route.children) ||
          (Array.isArray(route.children) && !route.children.length))
      ) {
        return (
          <MenuItem key={realPath}>
            <Link to={realPath}>{titleDom}</Link>
          </MenuItem>
        );
      }

      if (Array.isArray(route.children) && route.children.length) {
        return (
          <SubMenu key={realPath} title={titleDom}>
            {travel(route.children, realPath)}
          </SubMenu>
        );
      }
    });
  }

  const nodes = travel(routes);
  return nodes;
};

const getBreadcrumb = (routes: RouteType[], paths: string[]) => {
  const res: ReactNode[] = [];

  function travel(_routes: RouteType[], idx = 0) {
    const route = _routes.find((item) => item.path === paths[idx]);

    let iconDom: ReactNode = <div className={styles['icon-empty']} />;
    if (route?.icon !== undefined && res.length === 0) {
      const Icon = route.icon;
      iconDom = <Icon className={styles.icon} />;
      res.push(iconDom);
    } else {
      res.push(route?.name);
    }

    if (Array.isArray(route?.children) && route?.children.length) {
      travel(route.children, idx + 1);
    }
  }

  travel(routes);

  return res.length === 1 ? [] : res;
};

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

const PageLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const settings = useRecoilValue(settingsState);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/welcome/example');
    }
  }, [location.pathname, navigate]);

  const [routes, defaultRoute] = useRoute({});
  const currentComponent = qs.parseUrl(location.pathname).url.slice(1);
  const paths = (currentComponent || defaultRoute).split('/');
  const defaultOpenKeys = paths.slice(0, paths.length - 1);

  const flattenRoutes = useMemo(() => getFlattenRoutes(routes), [routes]);
  const menus = useMemo(() => getMenuItems(routes), [routes]);
  const breadcrumb = useMemo(
    () => getBreadcrumb(routes, paths),
    [routes, paths]
  );

  const [selectedKeys, setSelectedKeys] = useState([
    currentComponent || defaultRoute,
  ]);
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);

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
            <div className={styles['menu-wrapper']}>
              <Menu
                collapse={collapsed}
                onClickMenuItem={(key) => setSelectedKeys([key])}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onClickSubMenu={(_, openKeys) => {
                  setOpenKeys(openKeys);
                }}
              >
                {menus}
              </Menu>
            </div>
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
            {!!breadcrumb.length && (
              <div className={styles['layout-breadcrumb']}>
                <Breadcrumb>
                  {breadcrumb.map((node, index) => (
                    <Breadcrumb.Item key={index}>{node}</Breadcrumb.Item>
                  ))}
                </Breadcrumb>
              </div>
            )}
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
