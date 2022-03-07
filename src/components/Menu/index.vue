<script lang="tsx">
import { compile, VNode } from 'vue';
import { RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
import { Menu } from '@arco-design/web-vue';
import { useAppStore } from '@/store';
import usePermission from '@/hooks/usePermission';
import { IconDashboard } from '@arco-design/web-vue/es/icon';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const iconMap: Record<string, VNode> = {
  dashboard: <IconDashboard />,
};

const iconMatch = (name?: string) => {
  if (name) {
    return iconMap[name];
  }

  return null;
};

export default defineComponent({
  emit: ['collapse'],
  setup() {
    const collapsed = ref(false);
    const selectedKey = ref<string[]>([]);

    const appStore = useAppStore();
    const route = useRoute();
    const router = useRouter();
    const permission = usePermission();

    watch(
      () => appStore.menuCollapse,
      (newVal) => {
        collapsed.value = newVal;
      },
      {
        immediate: true,
      }
    );

    watch(
      route,
      (newVal) => {
        if (!newVal.meta.hideInMenu) {
          selectedKey.value = newVal.matched
            .slice(1)
            .map((item) => item.name as string);
        }
      },
      {
        immediate: true,
      }
    );

    const appRoute = computed(() => {
      return router
        .getRoutes()
        .find((el) => el.name === 'root') as RouteRecordNormalized;
    });

    const menuTree = computed(() => {
      const copyRouter = JSON.parse(JSON.stringify(appRoute.value.children));

      const travel = (_routes: RouteRecordRaw[]) => {
        if (!_routes) {
          return [];
        }

        const collector = _routes.map((element) => {
          // no access
          if (!permission.accessRouter(element)) {
            return null;
          }

          // hide in menu
          if (element.meta?.hideInMenu === true) {
            return null;
          }

          if (!element.children) {
            return element;
          }

          // Associated child node
          element.children = travel(element.children) as RouteRecordRaw[];

          return element;
        });

        return collector.filter(
          (element) => element !== null && element !== undefined
        );
      };

      return travel(copyRouter) as RouteRecordRaw[];
    });

    const setCollapse = (val: boolean) => {
      appStore.updateMenuCollapse(val);
    };

    const goto = (item: RouteRecordRaw) => {
      console.log(item);
      router.push({
        name: item.name,
      });
    };

    const renderSubMenu = () => {
      const travel = (_route: RouteRecordRaw[]) => {
        return _route.map((element) => {
          const icon = iconMatch(element.meta?.icon);

          let r: VNode;
          if (element.children && element.children?.length !== 0) {
            r = (
              <SubMenu
                key={element.name as string}
                v-slots={{
                  icon: () => icon,
                  title: () => h(compile(element.meta?.name || '')),
                }}
              >
                {travel(element.children)}
              </SubMenu>
            );
          } else {
            r = (
              <MenuItem
                key={element.name as string}
                onClick={() => goto(element)}
                v-slots={{
                  icon: () => icon,
                }}
              >
                {element.meta?.name || ''}
              </MenuItem>
            );
          }

          return r;
        });
      };

      return travel(menuTree.value);
    };

    return () => (
      <Menu
        class="h-full"
        v-model:collapsed={collapsed.value}
        show-collapse-button
        selected-keys={selectedKey.value}
        auto-open-selected={true}
        level-indent={34}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onCollapse={setCollapse}
      >
        {renderSubMenu()}
      </Menu>
    );
  },
});
</script>

<style lang="less" scoped>
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    @apply flex items-center;
  }
  .arco-icon {
    &:not(.arco-icon-down) {
      @apply text-18px;
    }
  }
}
</style>
