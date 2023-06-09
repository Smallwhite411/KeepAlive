<template>
    <div :class="{'has-logo':showSidebarLogo}">
      <SidebarLogo v-if="showSidebarLogo" :collapse="isCollapse" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          background-color="#001428"
          text-color="#c0c4cc"
          :unique-opened="false"
          active-text-color="#ffffff"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
      </el-scrollbar>
    </div>
  </template>


<script>
import { mapState } from 'vuex';
import SidebarItem from './SidebarItem.vue';
import SidebarLogo from './SidebarLogo.vue';

export default {
    name: "SidebarModule",
    components: {
        SidebarItem,
        SidebarLogo
    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        ...mapState("settings",["showSidebarLogo"]),
        ...mapState("app",["sidebar"]),
        ...mapState("permission",["routes"]),

        //当前激活的菜单项是通过检查当前路由的 meta 属性获得的，如果不存在，则使用路由路径。侧边栏的折叠状态通过检查 appStore 中的 sidebar 对象的 opened 属性来确定。
        activeMenu() {
            const {meta, path} = this.$route;
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path
        },

        isCollapse() {
            return !this.sidebar.opened;
        }
    }
}



</script>

<style>
</style>