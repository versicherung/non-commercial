import {
  FC,
  ReactNode,
  useRef,
  useState,
  useEffect,
  MutableRefObject,
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cs from 'classnames';
import qs from 'query-string';
import { Layout, Menu, Breadcrumb } from '@arco-design/web-react';
import {
  IconMenuFold,
  IconMenuUnfold,
  IconTag,
} from '@arco-design/web-react/icon';
import { useAppSelector } from '@/store';
import { selectSettings } from '@/store/settings';
import useRoute, { Route } from '@/routes';
import { isArray } from '@/utils/is';
import NavBar from '@/components/NavBar';

import styles from './index.module.less';

const Sider = Layout.Sider;
const Content = Layout.Content;

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function getIconFromKey(key: string) {
  switch (key) {
    case 'welcome':
      return <IconTag className={styles.icon} />;
    default:
      return <div className={styles['icon-empty']} />;
  }
}

const SelfMenu: FC<{
  collapsed: boolean;
  pathname: string;
  routeMap: MutableRefObject<Map<string, ReactNode[]>>;
}> = ({ collapsed, pathname, routeMap }) => {
  const currentComponent = qs.parseUrl(pathname).url.slice(1);

  const [routes, defaultRoute] = useRoute();
  const defaultSelectedKeys = [currentComponent || defaultRoute];
  const paths = (currentComponent || defaultRoute).split('/');
  const defaultOpenKeys = paths.slice(0, paths.length - 1);

  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(defaultSelectedKeys);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const onClickMenuItem = (key: string) => {
    setSelectedKeys([key]);
  };

  const renderRoutes = () => {
    const nodes: ReactNode[] = [];
    routeMap.current.clear();

    const travel = (
      _routes: Route[],
      level: number,
      parentNode: (JSX.Element | string)[] = []
    ) => {
      return _routes.map((route) => {
        const { breadcrumb = true } = route;
        const iconDom = getIconFromKey(route.key);
        const titleDom = (
          <>
            {iconDom} {route.name}
          </>
        );
        if (
          route.key &&
          (!isArray(route.children) ||
            (isArray(route.children) && !route.children?.length))
        ) {
          routeMap.current.set(
            `/${route.key}`,
            breadcrumb ? [...parentNode, route.name] : []
          );
          if (level > 1) {
            return (
              <MenuItem key={route.key}>
                <Link href={`/${route.key}`}>
                  <a>{titleDom}</a>
                </Link>
              </MenuItem>
            );
          }

          nodes.push(
            <MenuItem key={route.key}>
              <Link href={`/${route.key}`}>
                <a>{titleDom}</a>
              </Link>
            </MenuItem>
          );
        }

        if (isArray(route.children) && route.children?.length) {
          const parentNode = [];
          if (iconDom.props.isIcon) {
            parentNode.push(iconDom);
          }
          if (level > 1) {
            return (
              <SubMenu key={route.key} title={titleDom}>
                {travel(route.children, level + 1, [...parentNode, route.name])}
              </SubMenu>
            );
          }
          nodes.push(
            <SubMenu key={route.key} title={titleDom}>
              {travel(route.children, level + 1, [...parentNode, route.name])}
            </SubMenu>
          );
        }
      });
    };

    travel(routes, 1);
    return nodes;
  };

  return (
    <div className={styles['menu-wrapper']}>
      <Menu
        collapse={collapsed}
        onClickMenuItem={onClickMenuItem}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onClickSubMenu={(_, openKeys) => {
          setOpenKeys(openKeys);
        }}
      >
        {renderRoutes()}
      </Menu>
    </div>
  );
};

const PageLayout: FC = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumb, setBreadCrumb] = useState<ReactNode[]>([]);
  const routeMap = useRef(new Map<string, ReactNode[]>());

  const settings = useAppSelector(selectSettings);

  useEffect(() => {
    const routeConfig = routeMap.current.get(pathname);
    setBreadCrumb(routeConfig || []);
  }, [pathname]);

  const showNavBar = settings.navbar;
  const showMenu = settings.menu;
  const showFooter = settings.footer;

  const navbarHeight = 60;
  const menuWidth = collapsed ? 48 : settings?.menuWidth;

  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {};
  const paddingTop = showNavBar ? { paddingTop: navbarHeight } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };

  const toggleCollapse = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  return (
    <Layout className={styles.layout}>
      <div
        className={cs(styles['layout-navbar'], {
          [styles['layout-navbar-hidden']]: !showNavBar,
        })}
      >
        <NavBar />
      </div>
      <Layout>
        {showMenu && (
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
            <SelfMenu
              collapsed={collapsed}
              pathname={pathname}
              routeMap={routeMap}
            />
            <div className={styles['collapse-btn']} onClick={toggleCollapse}>
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
              {routeMap.current.has(pathname) ? children : null}
            </Content>
          </div>
          {showFooter}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
