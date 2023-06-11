<template>
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>
  </template>

<script>

export default {
    name: "AppMain",
    computed: {
        key() {
            // 获取当前路由地址
            return this.$route.path;
        }
    }
}
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f2f3f5;
}

.fixed-header + .app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - calc(50px + 34px));
  }
  .fixed-header + .app-main {
    padding-top: calc(50px + 34px);
  }
}
</style>