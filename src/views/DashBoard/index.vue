<script>

import AdminDashboard from "./Admin/index.vue"
import EditorDashboard from "./Editor/index.vue"
import router from "@/router";
export default {
    name: "App",
    components:{
    AdminDashboard,
    EditorDashboard
},  
  data(){
    return{
      currentRole: "admin"
    }
  },
    updated() {
      console.log("dashboard", router.getRoutes())
    }


  };

</script>

<template>
  <!-- 使用了component 动态组件 -->
  <component :is="$store.state.user.roles[0] === 'admin' ? 'AdminDashboard' : 'EditorDashboard'" />
</template>
