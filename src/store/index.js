import Vue from "vue";
import Vuex from 'vuex'
import person from "./modules/person";
import permission from "./modules/permission";
import user from "./modules/user";

Vue.use(Vuex)//Vuex的应用必须在要在new一个Store实例对象之前

export default new Vuex.Store({
    modules: {
        person,
        permission,
        user
    }
})