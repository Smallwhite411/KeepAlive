<template>
    <div class="notify">
      <el-popover placement="bottom" :width="popoverWidth" trigger="click">
        <template #reference>
          <el-badge :value="badgeValue" :max="badgeMax" :hidden="badgeValue === 0">
            <el-tooltip effect="dark" content="消息通知" placement="bottom">
                <div  class="el-icon-message-solid"></div>
            </el-tooltip>
          </el-badge>
        </template>
        <template #default>
          <el-tabs v-model="activeName" class="demo-tabs" stretch>
            <el-tab-pane v-for="(item, index) in data" :name="item.name" :key="index">
              <template #label>
                {{ item.name }}
                <el-badge :value="item.list.length" :max="badgeMax" :type="item.type" />
              </template>
              <el-scrollbar height="400px">
                <NotifyList :list="item.list" />
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
          <div class="notify-history">
            <el-button link @click="handleHistory">查看{{ activeName }}历史</el-button>
          </div>
        </template>
      </el-popover>
    </div>
  </template>

<script>
import { notifyData, messageData, todoData } from './data'
import NotifyList from './NotifyList.vue'
export default {
    name: "Notify",
    components: {
        NotifyList
    },
    data() {
        return {
            /** 角标最大值 */
            badgeMax: 99,
            /** 面板宽度 */
            popoverWidth: 350,
            /** 当前 Tab */
            activeName: "通知",
            /** 所有数据 */
            data: [
                // 通知数据
                {
                    name: "通知",
                    type: "primary",
                    list: notifyData
                },
                // 消息数据
                {
                    name: "消息",
                    type: "danger",
                    list: messageData
                },
                // 待办数据
                {
                    name: "待办",
                    type: "warning",
                    list: todoData
                }
            ]
        }
    },
    methods: {
        handleHistory() {
            this.$message.success(`跳转到${this.activeName.value}历史页面`)
        }
    },
    computed: {
        /** 角标当前值 */
        badgeValue() {
            let value = 0
            for (let i = 0; i < this.data.length; i++) {
                value += this.data[i].list.length
            }
            return value
        }
    }
}
</script>

<style lang="scss" scoped>
.notify {
  margin-right: 10px;
  color: var(--el-text-color-regular);
}
.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}
</style>