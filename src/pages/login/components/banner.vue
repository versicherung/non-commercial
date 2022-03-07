<script setup lang="ts">
import { Carousel, CarouselItem } from '@arco-design/web-vue';
import bannerImage from '@/assets/images/login-banner.png';

const carouselItem = [
  {
    slogan: '开箱即用的高质量模板',
    subSlogan: '丰富的的页面模板，覆盖大多数典型业务场景',
    image: bannerImage,
  },
  {
    slogan: '内置了常见问题的解决方案',
    subSlogan: '国际化，路由配置，状态管理应有尽有',
    image: bannerImage,
  },
  {
    slogan: '接入可视化增强工具AUX',
    subSlogan: '实现灵活的区块式开发',
    image: bannerImage,
  },
];
</script>

<template>
  <div class="banner flex items-center justify-center w-550px">
    <div class="flex-1 h-full">
      <Carousel class="h-full" animation-name="fade">
        <CarouselItem v-for="item in carouselItem" :key="item.slogan">
          <div
            :key="item.slogan"
            class="flex flex-col items-center justify-center h-full"
          >
            <div class="text-$color-fill-1 text-20px font-medium leading-28px">
              {{ item.slogan }}
            </div>
            <div class="text-$color-text-3 mt-8px text-14px leading-22px">
              {{ item.subSlogan }}
            </div>
            <img :src="item.image" class="w-320px mt-30px" />
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<style lang="less" scoped>
.banner {
  background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
}
</style>
