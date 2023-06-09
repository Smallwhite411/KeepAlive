import { getSidebarStatus, setSidebarStatus } from "@/utils/localStorage"
const app = {
    state : {
        sidebar: {
            opened: getSidebarStatus() !== "closed",
            withoutAnimation: false
        },
        device: 1,

    },
    actions: {
        toggleSidebar({ commit }, value) {
            commit("CHANGE_TOGGLESIDEBAR", value)
        },
        closeSidebar({ commit }, value) {
            commit("CHANGE_CLOSESIDEBAR", value)
        },
        toggleDevice({ commit }, value) {
            commit("CHANGE_CLOSESIDEBAR", value)
        },
    },
    mutations: {
        CHANGE_TOGGLESIDEBAR(state, withoutAnimation) {
            state.sidebar.opened = !state.sidebar.opened;
            state.sidebar.withoutAnimation = withoutAnimation;
            if (state.sidebar.opened) {
                setSidebarStatus("opened")
            } else {
                setSidebarStatus("closed")
            }
        },
        CHANGE_CLOSESIDEBAR(state, withoutAnimation) {
            state.sidebar.opened = false;
            state.sidebar.withoutAnimation = withoutAnimation;
            setSidebarStatus("closed");
        },
        CHANGE_TOGGLEDEVICE(state, value) {
            state.device = value
        }
    }
}


export default app;