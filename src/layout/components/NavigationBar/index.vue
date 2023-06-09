<template>
    <div class="navigation-bar">
      <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
      <Breadcrumb class="breadcrumb" />
      <div class="right-menu">
        <Screenfull v-if="showScreenfull" class="right-menu-item" />
        <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
        <Notify v-if="showNotify" class="right-menu-item" />
        <el-dropdown class="right-menu-item">
          <div class="right-menu-avatar">
            <el-avatar :icon="UserFilled" :size="30" />
            <span>{{ userStore.username }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <a target="_blank" href="https://juejin.cn/post/7089377403717287972">
                <el-dropdown-item>中文文档</el-dropdown-item>
              </a>
              <a target="_blank" href="https://github.com/un-pany/v3-admin-vite">
                <el-dropdown-item>GitHub</el-dropdown-item>
              </a>
              <a target="_blank" href="https://gitee.com/un-pany/v3-admin-vite">
                <el-dropdown-item>Gitee</el-dropdown-item>
              </a>
              <el-dropdown-item divided @click="logout">
                <span style="display: block">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </template>

<script>
</script>

<style lang="scss" scoped>
</style>