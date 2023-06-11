<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <NavigationBar />
            </div>
            <app-main />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue';
import NavigationBar from '@/layout/components/NavigationBar/index.vue'
export default {
    name: "Layout",
    components: {
        AppMain,
        Sidebar,
        NavigationBar
    },
    methods: {
        ...mapActions("app", {
            closeSidebar: "closeSidebar"
        }),
        handleClickOutside() {
            this.closeSidebar(false)
        }
    },
    computed: {
        ...mapState("app", ["sidebar", "device"]),
        ...mapState("settings", ["fixedHeader"]),
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    mounted() {
        console.log("fixedHeader",this.fixedHeader)
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
}

.showGreyMode {
  filter: grayscale(1);
}

.showColorWeakness {
  filter: invert(0.8);
}

.drawer-bg {
  background-color: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 220px;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: 220px !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 210px);
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 58px;
  }
  .sidebar-container {
    width: 58px !important;
  }
  .fixed-header {
    width: calc(100% - 58px);
  }
}

// for mobile response 适配移动端
.mobile {
  .main-container {
    margin-left: 0px;
  }
  .sidebar-container {
    transition: transform 0.28s;
    width: 220px !important;
  }
  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(0px - 220px), 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
