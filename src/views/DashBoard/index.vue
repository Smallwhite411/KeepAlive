<script lang="ts" setup>

import { ref } from "vue";
import AdminDashboard from "./Admin/index.vue"
import EditorDashboard from "./Editor/index.vue"


let currentRole = ref('admin')

</script>

<template>
  <!-- 使用了component 动态组件 -->
  <component :is="currentRole === 'admin' ? AdminDashboard : EditorDashboard" />
</template>
