<template>
    <div>
        <div class='bg'>
            <div class='login_card'>
                <el-tabs type="card" v-model="activeKey" tab-position="top" >
                    <el-tab-pane label="账户密码登录"  >
                        <el-form ref="form" name="normal_login" :model="form" :rules="rules" >
                            <el-form-item name="username" prop="username">
                                <el-input placeholder="请输入手机号 / 用户名" v-model="form.username"
                                class="input_password" clearable/>
                            </el-form-item>
                            <el-form-item  name="password" prop="password">
                                <el-input class="input_password"  v-model="form.password"
                                 placeholder="请输入密码"  show-password />
                            </el-form-item>


                            <el-form-item>
                                <router-link style="color: #8C8D9B; text-decoration: none;" to="/">创建账号</router-link>
                            </el-form-item>

                            <el-form-item name="login">
                                <el-button type="primary" style="height: 56px; border-radius: 12px; width: 100%;"
                                :loading="false" @click="messageD">
                                    登录
                                </el-button>
                            </el-form-item>
                        </el-form>

                    </el-tab-pane>

                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
// import store from '@/store';

export default {
    name: "Login",
    components: {

    },
    data() {
        return {
            form: {
                username: 'admin',
                password: '123',
            },
            activeKey: 0,
            rules: {
                username: [{
                    required: true, 
                    message: '请输入手机号 / 用户名!'
                }],
                password: [{
                    required: true, 
                    message: '请输入密码!'
                }]
            }
        }
    },
    methods: {
        messageD(){
            this.$refs.form.validate((valid)=> {
                if (valid) {
                    this.login({
                        data: {
                            username: this.form.username,
                            password: this.form.password,
                            code:1
                        }
                    })

                console.log("我点击了",valid,this.form,this.username)


                }

            })
        },
        ...mapMutations("person", { //命名空间的名字
            increment: "JIA",
            decrement: "JIAN",
        }),
        // ***************************************

        ...mapActions("user", {
            login: "login",
        }),
    },
    computed: {
        ...mapState("user", ["username","roles","token"]),
    },
    mounted() {
        console.log(this.username)
    }
}



</script>

<style scoped>
.bg {
    height: 100vh;
    background: linear-gradient(180deg, #a0d7e7, #6c5dd3);
    margin: auto;
    /* // padding: 200px; */
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
}
::v-deep .el-tabs__nav-scroll {
    display: flex !important;
    justify-content: center !important;
}

::v-deep .el-input__inner {
    background-color: #f2f3f7;
    border: none;
    box-shadow: none;
}

::v-deep .el-tabs__nav {
    background-color: white;
}

::v-deep .el-tabs--card>.el-tabs__header .el-tabs__nav {
    border: none;
}

::v-deep .el-tabs--card>.el-tabs__header {
    border: none;
}

.input_password {
    border-bottom: 1px solid #DCDCDC !important;
}
.el-input_inner {
    background-color: #151830;
}
.login_card {
    width: 520px;
    height: 450px;
    background: #f2f3f7;
    border-radius: 20px;
    margin: auto;
    text-align: center;
    justify-content: center;
    padding: 51px 60px;
}

.weixin-img {
    width: 39px;
    border-radius: 50%;
    position: absolute;
    translate: -50% -50%;
}

.img1 {
    width: 90px;
    height: 80px;
    translate: 0 -16%;
    z-index: 1;
    /* position: absolute; */
}

.img2 {
    /* width: 40px;
    height: 40px; */
    position: absolute;
    z-index: 10;
    width: 70px;
    translate: -114% 142%;
}

.login-button {
    width: 400px;
    height: 56px;
    background: #6c5dd3;
    border-radius: 12px;
}

.heard {
    position: absolute;
    display: flex;
    top: 10px;
}

.title {
    width: 315px;
    font-size: 30px;
    font-family: Arial;
    font-weight: bold;
    color: #151830;
}

.cloud {
    width: 100px;
    height: 72px;
    line-height: 72px;
    /* background-image: url("../../assets/cloud.png"); */
}


.footer {
    width: 100%;
    height: 12px;
    font-size: 10px;
    font-family: Microsoft YaHei;
    font-weight: 300;
    color: #151830;
    background: none;
    bottom: 34px;
    left: 0;
    position: absolute;
}
</style>