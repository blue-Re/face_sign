<template class="tabbar">
  <van-tabbar  active-color="rgb(76,121,240)" v-model="active">
    <van-tabbar-item icon="chart-trending-o" to='/stat'>统计</van-tabbar-item>
    <van-tabbar-item icon="todo-list-o" to="/">签到</van-tabbar-item>
    <van-tabbar-item icon="user-circle-o" to="/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const active = ref(1);
    return {
      active,
    };
  },
};
</script>

<style lang="less">

</style>
