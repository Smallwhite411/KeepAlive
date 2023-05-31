<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

console.log("dasdaparams", route.params.path)
router.replace({ path: "/" + route.params.path, query: route.query })
// 通过替换历史堆栈中的当前条目，以编程方式导航到新URL
</script>

<template>
  <div />
</template>
