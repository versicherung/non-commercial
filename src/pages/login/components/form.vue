<script setup lang="ts">
import { Form, FormItem, Input, Space, Button } from '@arco-design/web-vue';
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon';

const errorMessage = ref('');

const userInfo = reactive({
  username: '',
  password: '',
});
</script>

<template>
  <div class="w-320px">
    <div class="text-$color-text-1 font-medium text-24px leading-32px">
      登录商非出单系统
    </div>
    <div class="text-$color-text-3 text-16px leading-24px">
      登录商非出单系统
    </div>
    <div class="error-msg">{{ errorMessage }}</div>

    <Form :model="userInfo" layout="vertical">
      <FormItem
        field="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <Input v-model="userInfo.username" placeholder="请输入用户名">
          <template #prefix>
            <IconUser />
          </template>
        </Input>
      </FormItem>
      <FormItem
        field="password"
        :rules="[{ required: true, message: '请输入密码' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <Input v-model="userInfo.password" placeholder="请输入密码">
          <template #prefix>
            <IconLock />
          </template>
        </Input>
      </FormItem>
      <Space :size="16" direction="vertical">
        <Button type="primary" html-type="submit" long :loading="loading">
          登录
        </Button>
      </Space>
    </Form>
  </div>
</template>

<style lang="less" scoped>
.error-msg {
  @apply h-32px leading-32px;
  color: rgb(var(--red-6));
}
</style>
