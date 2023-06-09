import layoutSettings from "@/config/layout";

const settings = {
    namespaced: true,
    state: {
        fixedHeader: layoutSettings.fixedHeader ,
        showSettings: layoutSettings.showSettings ,
        showTagsView: layoutSettings.showTagsView ,
        showSidebarLogo: layoutSettings.showSidebarLogo ,
        showNotify: layoutSettings.showNotify ,
        showThemeSwitch: layoutSettings.showThemeSwitch ,
        showScreenfull: layoutSettings.showScreenfull ,
        showGreyMode: layoutSettings.showGreyMode ,
        showColorWeakness: layoutSettings.showColorWeakness
    },
    actions: {
        change_header({ commit }, value) {
            commit('CHANGE_HEADER', value)
        },
        change_settings({ commit }, value) {
            commit('CHANGE_SETTINGS', value)
        },
        change_tagsview({ commit }, value) {
            commit('CHANGE_TAGSVIEW', value)
        },
        change_sidebarlogo({ commit }, value) {
            commit('CHANGE_SIDEBARLOGO', value)
        },
        change_notify({ commit }, value) {
            commit('CHANGE_NOTIFY', value)
        },
        change_themeswitch({ commit }, value) {
            commit('CHANGE_THEMESWITCH', value)
        },
        change_screenfull({ commit }, value) {
            commit('CHANGE_SCREENFULL', value)
        },
        change_greymode({ commit }, value) {
            commit('CHANGE_GREYMODE', value)
        },
        change_colorweakneww({ commit }, value) {
            commit('CHANGE_COLORWEAKNEWW', value)
        },
    },
    mutations: {
        CHANGE_HEADER(state, value){
            state.fixedHeader = value;
        },
        CHANGE_SETTINGS(state, value){
            state.showSettings = value;
        },
        CHANGE_TAGSVIEW(state, value){
            state.showTagsView = value;
        },
        CHANGE_SIDEBARLOGO(state, value){
            state.showSidebarLogo = value;
        },
        CHANGE_NOTIFY(state, value){
            state.showNotify = value;
        },
        CHANGE_THEMESWITCH(state, value){
            state.showThemeSwitch = value;
        },
        CHANGE_SCREENFULL(state, value){
            state.showScreenfull = value;
        },
        CHANGE_GREYMODE(state, value){
            state.showGreyMode = value;
        },
        CHANGE_COLORWEAKNEWW(state, value){
            state.showColorWeakness = value;
        },
    }
}

export default settings;