<script setup lang="ts">
import {
  Space,
  TypographyTitle,
  Tooltip,
  Button,
  Dropdown,
  Avatar,
  Doption,
} from '@arco-design/web-vue';
import {
  IconMoonFill,
  IconSunFill,
  IconExport,
} from '@arco-design/web-vue/es/icon';
import { useAppStore } from '@/store';

const appStore = useAppStore();
const theme = computed(() => appStore.theme);

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    appStore.toggleTheme(dark);
  },
});

const toggleTheme = useToggle(isDark);

const changeTheme = () => {
  toggleTheme();
};
</script>

<template>
  <div
    class="flex justify-between h-full bg-$color-bg-2 border-b border-solid border-$color-border"
  >
    <div class="flex items-center pl-20px">
      <Space>
        <img
          alt="logo"
          src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        />
        <TypographyTitle :heading="5" class="m-0 text-18px">
          商非出单系统
        </TypographyTitle>
      </Space>
    </div>
    <ul
      class="right-side flex pr-20px list-none children:flex children:items-center children:py-0 children:px-10px"
    >
      <li>
        <Tooltip
          :content="
            theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'
          "
        >
          <Button
            class="nav-btn text-16px"
            type="outline"
            shape="circle"
            @click="changeTheme"
          >
            <template #icon>
              <IconMoonFill v-if="theme === 'dark'" />
              <IconSunFill v-else />
            </template>
          </Button>
        </Tooltip>
      </li>

      <li>
        <Dropdown trigger="click">
          <Avatar class="mr-8px cursor-pointer" :size="32">
            <img
              alt="avatar"
              src="https://tse4-mm.cn.bing.net/th/id/OIP-C.N6p81ci1Ist4SLfQYkCX-gAAAA?pid=ImgDet&rs=1"
            />
          </Avatar>

          <template #content>
            <Doption>
              <Space>
                <IconExport />
                <span>退出登录</span>
              </Space>
            </Doption>
          </template>
        </Dropdown>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.nav-btn {
  border-color: rgb(var(--gray-2));
  color: rgb(var(--gray-8));
}
</style>
