import Vue from "vue";
import Vuex from 'vuex'
import person from "./modules/person";
import permission from "./modules/permission";
import user from "./modules/user";
import settings from "./modules/settings";
import app from "./modules/app";

Vue.use(Vuex)//Vuex的应用必须在要在new一个Store实例对象之前

export default new Vuex.Store({
    modules: {
        person,
        permission,
        user,
        settings,
        app
    }
})