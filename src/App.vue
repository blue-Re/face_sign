<template>
  <Tabbar />
  <!-- <keep-alive >
  
  <router-view v-slot="{Component}"/>
  </keep-alive> -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import Tabbar from "./components/Tabbar.vue";
export default {
  components: {
    Tabbar,
  },
};
</script>
<style lang="less">
#app {
  --van-padding-xs: 5px;
  --van-nav-bar-background-color: #4c79ef;
  --van-nav-bar-title-text-color: white;
  // width: 100vw;
  overflow: scroll;
  height: 100vh;
  background-color: rgb(242, 242, 244);
}
</style>
