<template>
    <!-- 使用了component 动态组件 -->
    <component :is="currentRole === 'admin' ? AdminDashboard : EditorDashboard" />
  </template>
  

<script>
</script>

<style scoped>
</style>