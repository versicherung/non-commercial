<script setup lang="ts">
import Footer from '@/components/footer/index.vue';
import Banner from './components/banner.vue';
import Form from './components/form.vue';
</script>

<template>
  <div class="flex h-screen">
    <div class="fixed top-24px left-22px z-1 inline-flex items-center">
      <img
        alt="logo"
        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
      />
      <div class="mx-4px text-$color-fill-1 text-20px">商非出单系统</div>
    </div>

    <Banner />

    <div class="relative flex flex-1 items-center justify-center pb-40px">
      <div>
        <Form />
      </div>

      <div class="absolute right-0 bottom-0 w-full">
        <Footer />
      </div>
    </div>
  </div>
</template>
