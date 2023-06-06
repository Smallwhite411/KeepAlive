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
    import { removeToken } from '@/utils/cookies';
import { mapActions, mapState } from 'vuex';
        export default {
            name: "Layout",
            methods: {
                removetoken() {
                    removeToken()
                    this.$router.push("/login")
                },
                changeAdmin() {
                    this.changeJurisdiction('admin')
                    this.changeRoles({
                        routes: this.dynamicRoutes,
                        id: "admin"
                    })
                    this.setRoutes(this.roles)
                    this.$router.push("/dashboard")
                    console.log(this.roles)
                },
                changeRoot() {
                    this.changeJurisdiction('root')
                    this.setRoutes(this.roles)
                    this.changeRoles({
                        routes: this.dynamicRoutes,
                        id: "root"
                    })
                    this.$router.push("/dashboard")
                    console.log(this.roles)
                },
                ...mapActions('user',{
                    changeJurisdiction: "changeJurisdiction",
                    changeRoles: "changeRoles"
                }),
                ...mapActions('permission',{
                    setRoutes: "setRoutes",
                })
            },
            computed: {
                ...mapState("user", ["username","roles","token"]),
                ...mapState("permission", ["dynamicRoutes"]),
            }
        }
</script>