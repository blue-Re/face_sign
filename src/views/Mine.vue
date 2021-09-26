<template>
  <div id="mine">
    <van-nav-bar title="我的" />
    <ul class="info-list" v-if="state.myInfo!==null">
      <li class="lists">
        <div class="user-info">
          <div class="username-tag">姓名</div>
          <div class="username">{{ state.myInfo.basicInfo.username }}</div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-ID"></use>
          </svg>
        </div>
        <div class="qualified-count">
          <div class="qualified-text">合格次数</div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dui"></use>
          </svg>
          <div class="count">{{ state.myInfo.upToStandard }}</div>
        </div>
        <div class="not-qualified-count">
          <div class="qualified-text">不合格次数</div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-cuo"></use>
          </svg>
          <div class="count">{{ state.myInfo.downToStandard }}</div>
        </div>
      </li>
      <li class="lists">
        <div class="current-week">
          <div class="qualified-text">当前周</div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhou"></use>
          </svg>
          <i class="iconfont icon-a-rili">
            <div class="count">{{ state.myInfo.currentWeek }}</div>
          </i>
        </div>
        <div class="total-time">
          <div class="qualified-text">累计时长</div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jishiqishiyong"></use>
          </svg>
          <div class="count">{{ totalTimes }}</div>
        </div>
        <div class="ranking">
          <div class="username-tag">排名</div>
          <div class="username">#{{ state.myInfo.basicInfo.ranking }}</div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huangguan"></use>
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, reactive } from "@vue/runtime-core";
import { myAllInfo } from "../api/index";
export default {
  setup() {
    let state = reactive({
      userid: localStorage.getItem("student_number"),
      myInfo: null,
    });
    let totalTimes = computed(() => {
      return (state.myInfo.timeTotal / (1000 * 60 * 60)).toFixed(2)+'h'
    });

    getMyInfo()
    async function getMyInfo() {
      let result = await myAllInfo(state.userid);
      // result.timeTotal = formatDate(result.timeTotal)
      state.myInfo = result;
      //console.log(state.myInfo);
    }

    return {
      state,
      totalTimes,
    };
  },
};
</script>

<style lang="less" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#mine {
  width: 100%;
  .info-list {
    width: 100%;
    height: calc(100vh - 2rem);
    // background-color: yellow;
    display: flex;
    // align-items: center;
    // justify-content: center;
    padding-top: 10%;
    .lists {
      flex: 1;
      .user-info {
        height: 2.2rem;
        width: 3.14rem;
        background-color: white;
        border-radius: 0.3rem;
        box-shadow: 0px 0.1rem 0.05rem rgb(215, 215, 217);
        margin-top: 0.42rem;
        margin-left: 0.38rem;
        position: relative;
        .username-tag {
          font-size: 0.4rem;
          padding-top: 0.42rem;
          padding-left: 0.38rem;
        }
        .username {
          font-size: 0.56rem;
          margin-top: 8%;
          padding-left: 0.38rem;
        }
        .icon {
          font-size: 0.8rem;
          position: absolute;
          right: 5%;
          top: 10%;
        }
      }
      .qualified-count {
        height: 3.46rem;
        width: 3.14rem;
        background-color: white;
        border-radius: 0.3rem;
        box-shadow: 0px 0.1rem 0.05rem rgb(215, 215, 217);
        margin-top: 0.42rem;
        margin-left: 0.38rem;

        position: relative;
        .qualified-text {
          font-weight: bold;
          font-size: 0.4rem;
          padding-top: 0.42rem;
          padding-left: 0.38rem;
        }
        .icon {
          font-size: 0.7rem;
          position: absolute;
          right: 5%;
          top: 10%;
        }
        .count {
          // height: 100%;
          font-size: 1.4rem;
          text-align: center;
          line-height: 2.5rem;
          // margin-left: 30%;
          // margin-top: 20%;
        }
      }
      .not-qualified-count {
        height: 3.46rem;
        width: 3.14rem;
        background-color: white;
        border-radius: 0.3rem;
        box-shadow: 0px 0.1rem 0.05rem rgb(215, 215, 217);
        margin-top: 0.42rem;
        margin-left: 0.38rem;

        position: relative;
        .qualified-text {
          width: 1.5rem;
          font-weight: bold;
          font-size: 0.4rem;
          padding-top: 0.42rem;
          padding-left: 0.38rem;
        }
        .icon {
          font-size: 0.7rem;
          position: absolute;
          right: 5%;
          top: 10%;
        }
        .count {
          font-size: 1.5rem;
          text-align: center;
          // margin-left: 30%;
          // margin-top: 5%;
        }
      }
      .current-week {
        height: 3.46rem;
        width: 3.14rem;
        background-color: white;
        border-radius: 0.3rem;
        box-shadow: 0px 0.1rem 0.05rem rgb(215, 215, 217);
        margin-top: 0.42rem;
        margin-left: 0.38rem;

        position: relative;
        .qualified-text {
          font-size: 0.4rem;
          width: 1.5rem;
          font-weight: bold;
          padding-top: 0.42rem;
          padding-left: 0.38rem;
        }
        .iconfont {
          font-size: 2rem;
          // position: relative;
          // right: 0;
          margin-left: 0.56rem;
          // text-align: center;

          // top: 10%;
          .count {
            position: absolute;
            top: 45%;
            left: 38%;
            font-size: 1.2rem;
            // margin-left: 30%;
            // margin-top: 5%;
          }
        }
        .icon {
          position: absolute;
          top: 10%;
          right: 5%;
          font-size: 0.7rem;
          border-radius: 50%;
        }
      }
      .total-time {
        height: 3.46rem;
        width: 3.14rem;
        background-color: white;
        border-radius: 0.3rem;
        box-shadow: 0px 0.1rem 0.05rem rgb(215, 215, 217);
        margin-top: 0.42rem;
        margin-left: 0.38rem;

        position: relative;
        .qualified-text {
          font-size: 0.4rem;
          // width: 75px;
          font-weight: bold;
          padding-top: 0.42rem;
          padding-left: 0.38rem;
        }
        .icon {
          font-size: 0.7rem;
          position: absolute;
          right: 5%;
          top: 10%;
        }
        .count {
          font-size: 0.6rem;
          text-align: center;
          // margin-left: 10%;
          line-height: 2.4rem;
          // margin-top: 20%;
        }
      }
      .ranking {
        height: 2.2rem;
        width: 3.14rem;
        background-color: white;
        border-radius: 0.3rem;
        box-shadow: 0px 0.1rem 0.05rem rgb(215, 215, 217);
        margin-top: 0.42rem;
        margin-left: 0.38rem;
        position: relative;
        .username-tag {
          font-weight: bold;
          font-size: 0.4rem;
          padding-top: 0.42rem;
          padding-left: 0.38rem;
        }
        .username {
          font-size: 0.56rem;
          margin-top: 8%;
          // padding-left: 19px;
          text-align: center;
        }
        .icon {
          font-size: 0.8rem;
          position: absolute;
          right: 5%;
          top: 10%;
        }
      }
    }
  }
}
</style>
