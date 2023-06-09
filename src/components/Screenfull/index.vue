<template>
    <div @click="click">
        <el-tooltip effect="dark" :content="tips" placement="bottom">
            <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
        </el-tooltip>
    </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
    name: "Screenfull",
    props: {
        /** 全屏的元素，默认是 html */
        element: {
            type: String,
            default: "html"
        },
        /** 打开全屏提示语 */
        openTips: {
            type: String,
            default: "全屏"
        },
        /** 关闭全屏提示语 */
        exitTips: {
            type: String,
            default: "退出全屏"
        }
    },
    data() {
        return {
            isFullscreen: false,
            tips: this.openTips
        }
    },
    methods: {
        change() {
            this.isFullscreen = screenfull.isFullscreen
            this.tips = screenfull.isFullscreen ? this.exitTips : this.openTips
        },
        click() {
            const dom = document.querySelector(this.element) || undefined
            if (!screenfull.isEnabled) {
                this.$message.warning("您的浏览器无法工作")
                return
            }
            screenfull.toggle(dom)
        }
    },
    mounted() {
        screenfull.on("change", this.change)
    },
    unmounted() {
        if (screenfull.isEnabled) {
            screenfull.off("change", this.change)
        }
    },
}
</script>

<style lang="scss" scoped>
.svg-icon {
    font-size: 20px;

    &:focus {
        outline: none;
    }
}
</style>
