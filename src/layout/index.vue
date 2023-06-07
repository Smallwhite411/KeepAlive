<template>
    <div>
        整体页面
        <div>
            <el-button @click="removetoken">点击删除cookie</el-button>
            <el-button @click="changeAdmin">权限admin</el-button>
            <el-button @click="changeRoot">权限root</el-button>
            <div>
                {{ roles }}
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import router from '@/router';
import { removeToken } from '@/utils/cookies';
import { mapActions, mapState } from 'vuex';
// import router from '@/router';
export default {
    name: "Layout",
    methods: {
        removetoken() {
            removeToken()
            this.$router.push("/login")
        },
        changeAdmin() {
            this.changeJurisdiction('admin')
            this.setRoutes(this.roles)
            let dyRoutes = this.dynamicRoutes;
            this.changeRoles({
                id: "admin",
                routes: dyRoutes,
            })
            // this.setRoutes(this.roles)
            this.$router.push("/dashboard")
            console.log("changeAdmin", this.dynamicRoutes)
        },
        changeRoot() {
            this.changeJurisdiction('root')
            this.setRoutes(this.roles)
            let dyRoutes = this.dynamicRoutes;
            this.changeRoles({
                id: "root",
                routes: dyRoutes,
            })
            this.$router.push("/dashboard")
            console.log("changeRoot", this.dynamicRoutes)
        },
        ...mapActions('user', {
            changeJurisdiction: "changeJurisdiction",
            changeRoles: "changeRoles"
        }),
        ...mapActions('permission', {
            setRoutes: "setRoutes",
        })
    },
    computed: {
        ...mapState("user", ["username", "roles", "token"]),
        ...mapState("permission", ["routes", "dynamicRoutes"]),
    },
    updated() {
        console.log("getRoutes", router.getRoutes())
    }
}
</script>