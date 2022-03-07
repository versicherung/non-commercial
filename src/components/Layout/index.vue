<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Layout } from '@arco-design/web-vue';
import { useAppStore } from '@/store';
import Navbar from '@/components/Navbar/index.vue';
import Menu from '@/components/Menu/index.vue';
import Footer from '@/components/Footer/index.vue';

const Sider = Layout.Sider;
const Content = Layout.Content;

const appStore = useAppStore();

const navbar = computed(() => appStore.navbar);
const menu = computed(() => appStore.menu);
const menuWidth = computed(() =>
  appStore.menuCollapse ? 48 : appStore.menuWidth
);
const collapse = computed(() => appStore.menuCollapse);
const footer = computed(() => appStore.footer);

const paddingStyle = computed(() => {
  const paddingLeft = menu.value ? { paddingLeft: `${menuWidth.value}px` } : {};
  const paddingTop = navbar.value ? { paddingTop: '60px' } : {};
  return { ...paddingLeft, ...paddingTop };
});

const setCollapsed = (val: boolean) => {
  appStore.updateMenuCollapse(val);
};
</script>

<template>
  <Layout class="w-full h-full">
    <div
      v-if="navbar"
      class="fixed top-0 left-0 z-100 w-full min-w-1100px h-60px"
    >
      <Navbar />
    </div>
    <Layout>
      <Layout>
        <Sider
          v-if="menu"
          class="layout-sider fixed top-0 left-0 z-99 h-full"
          breakpoint="xl"
          :collapsed="collapse"
          :collapsible="true"
          :width="menuWidth"
          :style="{ paddingTop: navbar ? '60px' : '' }"
          :hide-trigger="true"
          @collapse="setCollapsed"
        >
          <div class="menu-wrapper h-full overflow-auto overflow-x-hidden">
            <Menu />
          </div>
        </Sider>
        <Layout
          class="min-w-1100px min-h-screen overflow-y-hidden bg-$color-fill-2 transition-all duration-200"
          :style="paddingStyle"
        >
          <Content>
            <RouterView />
          </Content>
          <Footer v-if="footer" />
        </Layout>
      </Layout>
    </Layout>
  </Layout>
</template>

<style lang="less" scoped>
.layout-sider {
  &::after {
    @apply absolute top-0 -right-1px block w-1px h-full;
    background-color: var(--color-border);
    content: '';
  }

  > :deep(.arco-layout-sider-children) {
    @apply overflow-y-hidden;
  }
}

.menu-wrapper {
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      @apply w-12px h-4px;
    }

    ::-webkit-scrollbar-thumb {
      @apply border-4px border-solid border-transparent bg-clip-padding rounded-7px;

      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}
</style>
