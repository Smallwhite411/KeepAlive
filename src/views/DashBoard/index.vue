<script lang="ts">

import AdminDashboard from "./Admin/index.vue"
import EditorDashboard from "./Editor/index.vue"


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
    mounted() {
      console.log(this.$store.state.sum);
    },


  };

</script>

<template>
  <!-- 使用了component 动态组件 -->
  <component :is="$store.state.user.roles[0] === 'admin' ? 'AdminDashboard' : 'EditorDashboard'" />
</template>
