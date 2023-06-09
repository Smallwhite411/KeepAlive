<template>
    <!-- 这里的hidden 应该是将侧边栏收缩和开放的 -->
    <div v-if="!item.meta?.hidden" :class="{ 'simple-mode': isCollapse, 'first-level': isFirstLevel }">
        <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
            <!-- 侧边栏的名称？ -->
            <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
                <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
                    <svg-icon v-if="theOnlyOneChild.meta.svgIcon" :name="theOnlyOneChild.meta.svgIcon" />
                    <component v-else-if="theOnlyOneChild.meta.elIcon" :is="theOnlyOneChild.meta.elIcon" class="el-icon" />
                    <template v-if="theOnlyOneChild.meta.title" #title>
                        {{ theOnlyOneChild.meta.title }}
                    </template>
                </el-menu-item>
            </SidebarItemLink>
        </template>
        <el-submenu v-else :index="resolvePath(item.path)" teleported>
            <!-- 遍历侧边栏列表的名字 -->
            <template #title>
                <svg-icon v-if="item.meta && item.meta.svgIcon" :name="item.meta.svgIcon" />
                <component v-else-if="item.meta && item.meta.elIcon" :is="item.meta.elIcon" class="el-icon" />
                <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
            </template>
            <!-- v-for 遍历子组件 这个组件还是SidebarItem 递归-->
            <template v-if="item.children">
                <!-- 每个路由的path都是唯一的，所以拿这个当成key很合适 -->
                <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :is-collapse="isCollapse"
                    :is-first-level="false" :base-path="resolvePath(child.path)" />
            </template>
        </el-submenu>
    </div>
</template>
  
<script>
// import path from 'path-browserify'
import { isExternal } from "@/utils/validate"
import path from 'path-browserify'
import SvgIcon from '@/components/SvgIcon/index.vue'
import SidebarItemLink from "./SidebarItemLink.vue"
export default {
    name: "SidebarItem",
    components: {
        SidebarItemLink,
        SvgIcon
    },
    props: {
        item: {
            type: Object,
            required: true
        },
        isCollapse: {
            type: Boolean,
            default: false
        },
        isFirstLevel: {
            type: Boolean,
            default: true
        },
        basePath: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            onlyOneChild: null
        }
    },
    methods: {
        resolvePath(routePath) {
            if (isExternal(routePath)) {
                return routePath
            }
            if (isExternal(this.basePath)) {
                return this.basePath
            }
            return path.resolve(this.basePath, routePath)
        },
    },
    computed: {
        // 只有一个子组件的时候
        theOnlyOneChild() {
            if (this.showingChildNumber.value > 1) {
                return null
            }
            if (this.item.children) {
                for (const child of this.item.children) {
                    if (!child.meta || !child.meta.hidden) {
                        return child
                    }
                }
            }
            // 如果没有子组件，就把它自己移除，
            // 因为这个。basePath已经包含了item的路径信息
            return { ...this.item, path: "" }
        },
        alwaysShowRootMenu() {
            return this.item.meta && this.item.meta.alwaysShow
        },

        showingChildNumber() {
            if (this.item.children) {
                const showingChildren = this.item.children.filter((item) => {
                    return !(item.meta && item.meta.hidden)
                })
                return showingChildren.length
            }
            return 0
        }
    }
}
</script>
