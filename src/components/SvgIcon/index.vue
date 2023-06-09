<template>
    <!-- <svg class="svg-icon" aria-hidden="true">
      <use :href="symbolId" />
    </svg> -->
    <div :class="symbolId"></div>
  </template>

<script>
export default {
    name: "SvgIcon",
    props: {
        prefix: {
            type: String,
            default: "icon"
        },
        name: {
            type: String,
            required: true
        }
    },
    computed: {
        symbolId() {
            return `el-${this.prefix}-${this.name}`
        }
    }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>