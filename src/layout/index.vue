<template>
    <div>
        整体页面
        <div>
            <el-button @click="removetoken">点击删除cookie</el-button>
            <el-button @click="changeAdmin">切换权限</el-button>
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
                    console.log(this.roles)
                    this.changeJurisdiction()
                },
                ...mapActions('user',{
                    changeJurisdiction: "changeJurisdiction"
                })
            },
            computed: {
                ...mapState("user", ["username","roles","token"]),
            }
        }
</script>