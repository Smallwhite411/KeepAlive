<template>
  <div class="navigation-bar">
    <!-- <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
      <Breadcrumb class="breadcrumb" /> -->
    <div class="right-menu">
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <Notify v-if="showNotify" class="right-menu-item" />
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <img :src="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'" class="user-avatar" />
          <span>{{ username }}</span>
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
import Screenfull from "@/components/Screenfull/index.vue"
import Notify from "@/components/Notify/index.vue"
import { mapActions, mapState } from "vuex";
export default {
  name: "NavigationBar",
  components: {
    Screenfull,
    Notify,
  },
  computed: {
    ...mapState("user", ["username"])
  },
  methods: {
    ...mapActions("settings", {
      showScreenfull: "change_screenfull",
      showNotify: "change_notify"
    })
  }
}
</script>

<style lang="scss" scoped>
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.navigation-bar {
  height: 50px;
  overflow: hidden;
  background: #fff;

  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }

  .breadcrumb {
    float: left;

    // 参考 Bootstrap 的响应式设计 WIDTH = 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }

  .right-menu {
    float: right;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;

    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;

      .right-menu-avatar {
        display: flex;
        align-items: center;

        .el-avatar {
          margin-right: 10px;
        }

        span {
          font-size: 16px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>