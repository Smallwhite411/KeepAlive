<template>
    <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
        <slot />
        <!-- 增加的外链侧边栏 -->
    </a>
    <router-link v-else :to="to">
        <slot />
    </router-link>
</template>

<script>
import { isExternal } from '@/utils/validate';
export default {
    name: "SidebarItemLink",
    props: {
        to: {
            type: String,
            required: true
        }
    },
    methods: {
        isExternal(to) {
            isExternal(to)
        }
    }
}
</script>

<style></style>