<template id="stat">
  <van-nav-bar title="统计" />
  <van-notice-bar
    left-icon="volume-o"
    text="签到规则：每天至少签到1小时为今日合格，每周至少签到5次为本周合格！！！"
  />
  <div class="title">上周签到未合格</div>
  <div class="last-week-failed">
    <ul class="students-list">
      <li class="info-title">
        <div class="username-title">姓名</div>
        <div class="time-title">合格天数</div>
      </li>
      <li class="students" v-for="(item, index) in state.lastWeekData">
        <div class="username">{{ item.username }}</div>
        <div class="timer">{{ item.number }}天</div>
      </li>
      <!-- <li class="students">
        <div class="username">张三</div>
        <div class="timer">1次</div>
      </li>
      <li class="students">
        <div class="username">张三</div>
        <div class="timer">1次</div>
      </li>
      <li class="students">
        <div class="username">张三</div>
        <div class="timer">1次</div>
      </li>
      <li class="students">
        <div class="username">张三</div>
        <div class="timer">1次</div>
      </li>
      <li class="students">
        <div class="username">张三</div>
        <div class="timer">1次</div>
      </li>
      <li class="students">
        <div class="username">张三</div>
        <div class="timer">1次</div>
      </li>
      <li class="students">
        <div class="username">张三</div>
        <div class="timer">1次</div>
      </li> -->
    </ul>
  </div>
  <div class="title">本周签到时长</div>
  <ul class="this-week-time">
    <van-grid class="grid-title" :column-num="8">
      <van-grid-item text="姓名" class="name" />
      <van-grid-item text="周一" />
      <van-grid-item text="周二" />
      <van-grid-item text="周三" />
      <van-grid-item text="周四" />
      <van-grid-item text="周五" />
      <van-grid-item text="周六" />
      <van-grid-item text="周日" />
    </van-grid>
    <van-grid class="grid" v-for="(item, index) in state.students" :column-num="8">
      <van-grid-item :text="item.username" class="name" />
      <van-grid-item :text="item.monday" class="week" />
      <van-grid-item :text="item.tuesday" class="week" />
      <van-grid-item :text="item.wednesday" class="week" />
      <van-grid-item :text="item.thursday" class="week" />
      <van-grid-item :text="item.friday" class="week" />
      <van-grid-item :text="item.saturday" class="week" />
      <van-grid-item :text="item.sunday" class="week" />
    </van-grid>
  </ul>
  <div class="block" style="height:60px; "></div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { currentSignTime, lastWeekFailed } from "../api/index";
export default {
  setup() {
    (async function () {
      // 获取本周签到时长
      let currentWeekTime = await currentSignTime();
      state.students = currentWeekTime.tswkSignInfo;
      for (let i = 0; i < state.students.length; i++) {
        state.students[i].monday =
          (state.students[i].monday / (1000 * 60 * 60)).toFixed(1) + "h";
        state.students[i].tuesday =
          (state.students[i].tuesday / (1000 * 60 * 60)).toFixed(1) + "h";
        state.students[i].wednesday =
          (state.students[i].wednesday / (1000 * 60 * 60)).toFixed(1) + "h";
        state.students[i].thursday =
          (state.students[i].thursday / (1000 * 60 * 60)).toFixed(1) + "h";
        state.students[i].friday =
          (state.students[i].friday / (1000 * 60 * 60)).toFixed(1) + "h";
        state.students[i].saturday =
          (state.students[i].saturday / (1000 * 60 * 60)).toFixed(1) + "h";
        state.students[i].sunday =
          (state.students[i].sunday / (1000 * 60 * 60)).toFixed(1) + "h";
      }
      // //console.log(state.students);
      //   //console.log(state.currentWeekData);

      // 获取上周签到未合格
      let lastWeekTime = await lastWeekFailed();
      //console.log(lastWeekTime);
      state.lastWeekData = lastWeekTime.lastWeekDownToStandard;
      for (let i = 0; i < state.lastWeekData.length; i++) {
        if (!state.lastWeekData[i].number) {
          state.lastWeekData[i].number = 0;
        }
      }
      // //console.log(state.lastWeekData);
    })();
    let state = reactive({
      students: [],
      lastWeekData: [],
      currentWeekData: [],
    });
    return {
      state,
    };
  },
};
</script>

<style lang="less">
.title {
  font-weight: bold;
  font-size: 0.56rem;
  margin-left: 0.52rem;
  margin-top: 0.25rem;
}
.last-week-failed {
  width: 6.5rem;
  height: 158px;
  background-color: white;
  border-radius: 15px;
  border-bottom: 3px solid rgb(213, 213, 215);
  box-shadow: 0 3px 5px rgb(213, 213, 215);
  margin: 0.03rem auto 0 auto;
  overflow: scroll;
  margin-top: 0.24rem;

  .students-list {
    height: 112px;
    margin-top: 3%;
    .info-title {
      display: flex;
      justify-content: space-around;
      height: 0.56rem;
      padding: 0 0.6rem;
      align-items: center;

      .username-title {
        margin-left: 0.55rem;
      }
      .time-title {
        position: relative;
        margin-left: 0.6rem;
      }
    }
    .students {
      display: flex;
      justify-content: space-around;
      padding: 0 0.18rem;
      height: 0.66rem;
      width: 5.3rem;
      align-items: center;
      overflow: hidden;
      border: 1px solid rgb(242, 244, 243);
      border-radius: 15px;
      margin: 0.12rem auto;
      .username{
        width: 0.9rem;
        text-align: center;
      }
    }
  }
}
.this-week-time {
  // height: 300px;
  // background-color: pink;
  width: 6.46rem;
  // height: 9.13rem;
  border-radius: 15px;
  // border-bottom: 3px solid rgb(213, 213, 215);
  box-shadow: 0px 0px 10px rgb(213, 213, 215);
  // border-left:3px solid rgb(213, 213, 215);
  // border-right:  3px solid rgb(213, 213, 215);
  margin: 0.15rem auto 0 auto;
  overflow: scroll;
  .title {
    font-weight: bold;
    font-size: 28px;
    padding-top: 0.2rem;
    // margin-left: 8%;
  }

  .grid {
    .name {
      // background-color: red;
      div {
        padding: 0;
        margin: 0;
      }
    }
    .week {
      div {
        padding: 16px 5px;
      }
    }
  }
}
</style>
