<template>
  <van-nav-bar title="签到" />
  <van-notice-bar
    :scrollable="true"
    v-if="!isSign"
    left-icon="volume-o"
    text="温馨提示：签到时美颜可能会影响人脸的匹配度！！！"
  />
  <van-notice-bar
    scrollable="true"
    v-else
    left-icon="volume-o"
    text="请保持网络通畅且后台运行，否则将会自动签退！！！"
  />
  <div class="signLogo" v-if="!isSign">
    <div class="cooling" v-if="state.cooling">
      <div class="text">结算中</div>
      <div class="timerCount">
        <van-count-down
          :millisecond="true"
          ref="countDown"
          @finish="finish"
          :time="timeCount"
          format="ss:SS"
        />
      </div>
    </div>
    <div class="sign" ref="sign" @click="startSign" :class="{'disabled':state.cooling === true}">
      <div class="logo"><i class="iconfont icon-renlianshibie"></i></div>
      <div class="content">点击签到</div>
    </div>
  </div>
  <div class="siging" v-else>
    <div class="onlineCount">
      <div class="light"></div>
      <!-- v-if="state.serverSendData.length !== 0" -->
      <span class="text">当前在线人数为：{{ state.onlineCount }}人</span>
    </div>
    <div class="sign" ref="sign">
      <div class="logo"><i class="iconfont icon-dangtianshichang"></i></div>
      <div class="content" style="margin: 0.3rem 0">签到时长</div>
      <div class="time">{{ state.hh }}:{{ state.min }}:{{ state.ss }}</div>
    </div>
  </div>
  <footer class="bottom-sign-info">
    <ul class="user-list" v-show="state.serverSendData.length !== 0">
      <li class="lists" v-for="(students, index) in newAllInfo">
        <span class="username">{{ students.username }}</span>
        <span class="signState" v-show="state.serverSendData.length !== 0">
          <span class="sign" v-if="students.tips === '已签到'">
            <i class="iconfont icon-jinchang sign"></i>
            已签到
          </span>
          <span class="nosign" v-else>
            <i class="iconfont icon-chuchang"></i>
            已签退
          </span>
        </span>
        <span class="date">{{ students.time }}</span>
      </li>
    </ul>
  </footer>

  <!-- <van-button type="primary" text="显示遮罩层" @click="state.show = true" /> -->
  <van-overlay :show="state.show" @click="state.show = false">
    <div class="wrapper" @click.stop>
      <div class="block">
        <div class="txt">请输入学号进行授权</div>
        <input type="text" class="stu-num" v-model="state.stu_num" />
        <div class="bottom">
          <span class="tips">*此授权将会绑定你的手机</span>
          <van-button
            class="btn"
            plain
            type="primary"
            size="mini"
            @click="cancleAuth"
            >取消</van-button
          >
          <van-button class="btn" plain type="primary" size="mini" @click="agree"
            >授权</van-button
          >
        </div>
      </div>
    </div>
  </van-overlay>

  <!-- 底部信息 -->
  <div class="designers" v-show="state.designer">开发不易，切勿攻击！！！</div>
</template>

<script>
import { computed, reactive, ref } from "@vue/reactivity";
import {  onUnmounted } from "vue";
import { firstAuth, uploadFace } from "../api/index";
import { formatDate } from "../../public/js/jsonFormatDate";
import { Toast } from "vant";
import { useStore } from "vuex";
import NoSleep from 'nosleep.js/dist/NoSleep.min.js'
// import { websocket } from "../websocket/index";
export default {
  setup() {
    let timeCount = ref(30 * 1000);
    const store = useStore();
    // //console.log(store.state.isSign);
    let isSign = computed(() => {
      return store.state.isSign;
    });
    let state = reactive({
      // isSign: store.state.isSign,
      ss: 0,
      min: 0,
      hh: 0,
      timer: null,
      show: false,
      stu_num: "",
      userid: localStorage.getItem("student_number"),
      imgSrc: "",
      sendTimer: null,
      serverSendData: [],
      onlineCount: 0,
      cooling: false,
      designer:true,
    });

    let newAllInfo = computed(() => {
      return state.serverSendData;
    });

    // 防止屏幕熄灭
    // no_Sleep()
    function no_Sleep() {
      console.log('111');
      const noSleep = new NoSleep()
      document.addEventListener('click',function enableNoSleep() {
        noSleep.enable()
        document.removeEventListener('click',enableNoSleep,false)
      },false)
    // console.log(noSleep);
    }

    // 取消授权的回调
    function cancleAuth() {
      Toast.fail('请您授权后进行其他操作！')
    }

    // 冷却完毕的回调
    function finish() {
      // //console.log("倒计时完毕!");
      state.cooling = false;
    }

    // websocket的连接函数
    function ws() {
      const websocket = new WebSocket(
        // `ws://47.93.229.38:1024/sign?userid=${localStorage.getItem("student_number")}`
        `ws://47.93.229.38:1024/sign?userid=2019215225`
        // `ws://192.168.123.153:7777/hello?userid=${localStorage.getItem("student_number")}`
      );
      // //console.log(websocket);
      websocket.onopen = function (evt) {
        let timer = null;
        //console.log("已经连接到服务器！");
        //console.log("我要发消息了！");
        websocket.send("111");
        // //console.log(websocket);

        // 保持通信
        clearInterval(timer);
        timer = setInterval(function () {
          // //console.log("111");
          websocket.send(`heart`);
        }, 20000);
      };

      websocket.onmessage = (evt) => {
        //console.log("服务端发送过来的消息为： " + evt.data);
        let serveData = JSON.parse(evt.data);
        // state.serverSendData = []
        // for (let i = 0; i < serveData.length; i++) {
        serveData.time = formatDate(serveData.time);
        if (serveData.state === 200) {
          serveData.tips = "已签到";
        } else if (serveData.state === 400) {
          serveData.tips = "已签退";
        }
        //   // 当前在线人数
        state.onlineCount = serveData.onLineNum;
        // state.serverSendData.unshift(serveData[i]);
        // }

        // 将新的数据存储到数组当中
        state.serverSendData.unshift(serveData);
        //console.log(serveData);
        //console.log(state.serverSendData);

        // websocket.close();
      };

      websocket.onclose = (evt) => {
        //console.log("连接关闭！", evt);
        // isSign = false;
        store.commit("changeSignState2");
        // 清空定时器
        clearInterval(state.timer);
        state.ss = 0;
        state.min = 0;
        state.hh = 0;
      };

      // 浏览器关闭之前的回调
      window.onbeforeunload = function (event) {
        /*执行其他程序*/
        websocket.send("222");
        state.cooling = true;
      };
      // 网络改变的回调
      window.addEventListener("offline", function () {
        //console.log("网络改变了", window.navigator.onLine);
        if (window.navigator.onLine === false) {
          state.cooling = true;
          if (state.cooling === true) {
            state.disabled = true
          }
          // state.serverSendData.length = 0
          state.designer = true
          // state.blueSign = false
          store.commit("changeSignState2");
        }
      });
    }

    // 开始签到
    function startSign() {
      // 首先判断用户是否授权，如果没有，应该进行授权
      if (!localStorage.getItem("authCode")) {
        state.show = true;
      } else {
        // 如果有，进行签到
        //console.log("开始签到!");
        // 调用相机
        // getCamera();
        signSuccess()
      }
    }
    // 授权
    async function agree() {
      // 首先进行判空
      if (state.stu_num === "") {
        Toast.fail("请输入学号进行授权!");
      }else if(state.stu_num.length !==10){
        Toast.fail('请检测学号格式是否正确!')
      } else {
        // 开始授权
        const result = await firstAuth(state.stu_num);
        if (result.code === 1002) {
          Toast.fail(result.msg);
        } else {
          // 授权成功，将授权码保存到本地
          Toast.success("授权成功！请使用！");
          localStorage.setItem("authCode", `${result.msg}`);
          // 将学生学号保存到本地
          localStorage.setItem("student_number", `${state.stu_num}`);
          state.show = false;
        }
        //console.log(result);
      }
    }
    // 更换授权码
    // async function changeAuthCode() {
    //   let result = await delAuthCode("2019211324");
    //   //console.log(result);
    // }

    // 每次进入判断本地有没有授权码，如果没有授权码，进行弹窗绑定
    isAuthCode()
    function isAuthCode() {
      //console.log('检测授权');
      if (!localStorage.getItem("authCode")) {
        state.show = true;
      } else {
        state.show = false;
      }
    }

    // 签到成功改变状态
    function signSuccess() {
      // 已经上传图片，改变签到的状态
              // 触发mutations中的方法
              store.commit("changeSignState");
              
              // 隐藏设计者信息
              state.designer = false

              // 显示底部区域
              state.isFooterShow = true;

              // 上传图片成功后，开始计时
              clearInterval(state.timer);
              state.timer = setInterval(() => {
                state.ss++;
                if (state.ss === 60) {
                  state.min++;
                  state.ss = 0;
                  if (state.min === 60) {
                    state.hh++;
                    state.min = 0;
                  }
                }
              }, 1000);
              // 使用websocket进行通信
              ws();
              // 保持屏幕永不熄灭
              no_Sleep()
    }

    onUnmounted(() => {
      window.removeEventListener("offline");

    });

    // 调用相机
    function getCamera() {
      // 获取设备的默认摄像头对象
      const cmr = plus.camera.getCamera(2);
      let res = cmr.supportedImageResolutions[8]; //字符串数组，摄像头支持的拍照分辨率
      const fmt = cmr.supportedImageFormats[0]; //字符串数组，摄像头支持的拍照文件格式

      // 进行拍照
      cmr.captureImage(
        // 拍照成功的回调
        (capturedFile) => {
          // 通过URL参数获取目录对象或文件对象
          plus.io.resolveLocalFileSystemURL(
            // 要操作的文件的URL地址
            capturedFile,
            // 获取操作文件成功后的回调
            (entry) => {
              // 通过entry对象操作刚才的图片文件
              //console.log(111);
              // 压缩图片
              compressIm(entry.toLocalURL(), entry.name);
            },
            (e) => {
              Toast("获取文件失败!");
            }
          );
        },
        // 拍照失败的回调
        () => {
          Toast.fail("取消拍照！");
          //console.log("res------", res);
          //console.log("fmt-----", fmt);
        },
        // 可选参数
        { resolution: res, format: fmt, index: "2" }
      );
    }
    // 压缩图片
    function compressIm(url, filename) {
      let name = "_doc/upload/" + filename;
      plus.zip.compressImage(
        {
          src: url,
          dst: name,
          quality: 25,
          overwrite: true,
          format: "jpg",
          width: "900px",
          heigth: "auto",
        },
        (zip) => {
          let fileReader = new plus.io.FileReader();
          fileReader.readAsDataURL(zip.target);
          fileReader.onloadend = async (e) => {
            Toast.loading({
              message: "加载中...网络繁忙，请稍等！！！",
              forbidClick: true,
            });
            // //console.log(e.target.result);
            // 将base64转成文件
            let myfile = base64ToFiles(e.target.result);
            //console.log(myfile);

            const formData = new FormData();
            formData.append("file", myfile);
            // 上传接口
            let result = await uploadFace(state.userid, formData);
            //console.log(result);
            if (result.code === 1001) {
              Toast.success(result.msg);

              // 人脸匹配成功，改变视觉状态,并且在该方法中使用websocket建立连接
              signSuccess()
              

              
            } else {
              Toast.fail(result.msg);
            }
          };
        }
      );
    }

    // base64转文件的方法
    function base64ToFiles(dataurl, filename = "file") {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      //转换成file对象
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
      });
    }
    return {
      state,
      isSign,
      startSign,
      agree,cancleAuth,
      // changeAuthCode,
      newAllInfo,
      timeCount,
      finish,
    };
  },

};
</script>

<style lang="less" scoped>
.signLogo {
  width: 4.04rem;
  height: 4.04rem;
  background-color: rgb(76, 141, 240);
  border-radius: 50%;
  margin: 2.02rem auto 0 auto;
  text-align: center;
  .cooling {
    width: 4.04rem;
    height: 4.04rem;
    background-color: gray;
    border-radius: 50%;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text {
      font-size: 0.5rem;
    }
    .van-count-down {
      color: white;
      font-size: 0.35rem;
    }
  }
  .disabled{
    pointer-events: none;
  }
  .sign {
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.5rem;
    box-shadow: 0 0.15rem 0.3rem #d5d5d7;
    border-radius: 50%;
    .logo {
      margin-bottom: 2%;
      .iconfont {
        font-size: 1rem;
        font-weight: 200;
      }
    }
    .content {
      margin-bottom: 0.8rem;
    }
  }
}
.siging {
  width: 4.04rem;
  height: 4.04rem;
  background-color: #ff585d;
  border-radius: 50%;
  margin: 0 auto;
  text-align: center;
  margin: 2.02rem auto 0 auto;
  .onlineCount {
    // width: 100%;
    position: absolute;
    top: 13%;
    display: flex;
    .light {
      width: 0.3rem;
      height: 0.3rem;
      background-color: rgb(95, 232, 84);
      border-radius: 50%;
      position: relative;
      top: 0.08rem;
    }
    .text {
      margin: 0 0.2rem;
    }
  }
  .sign {
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.5rem;
    .logo {
      margin-bottom: 2%;
      .iconfont {
        font-size: 1rem;
        font-weight: 200;
      }
    }
  }
}
.bottom-sign-info {
  // background-color: rgb(247, 249, 248);
  // background-color: pink;
  // border-bottom: 3px solid rgb(213, 213, 215);

  // overflow: scroll;
  .user-list {
    width: 6.6rem;
    height: 3.76rem;
    margin: 0.3rem auto 0 auto;
    background: white;
    box-shadow: 0 0.3rem 0.2rem rgb(213, 213, 215);
    border-radius: 0.3rem;
    z-index: 2;
    overflow: scroll;
    .lists {
      text-align: right;
      width: 5.5rem;
      height: 0.66rem;
      padding: 0.14rem 0.18rem 0 0.18rem;
      border-radius: 0.3rem;
      font-size: 0.3rem;
      border: 1px solid rgb(242, 244, 243);
      margin: 0.1rem auto;
      line-height: 0.55rem;
      .signState {
        // margin-left: 0.2rem;
        // margin: 0 0.2rem;
        color: red;
        .signing {
          color: skyblue;
        }
        .sign {
          color: #4c79ef;
        }
        .noSign {
          .nosign {
            color: red;
          }
        }
        .data{
          font-size: 0.03rem;
        }
      }
      
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    width: 6.3rem;
    height: 3.86rem;
    background-color: #fff;

    .txt {
      margin-left: 0.56rem;
      margin-top: 0.6rem;
      font-size: 0.3rem;
      font-weight: bold;
    }
    .stu-num {
      outline: white;
      border: none;
      border-bottom: 0.02rem solid;
      margin-top: 0.4rem;
      margin-left: 0.56rem;
    }
    .bottom {
      margin-top: 1rem;
      margin-left: 0.56rem;
      color: gray;
      font-size: 0.01rem;
      .btn {
        margin-left: 0.6rem;
        font-size: 0.3rem;
        border: none;
      }
      .tips {
        font-size: 0.24rem;
      }
    }
  }
}

.designers{
  font-size: 0.26rem;
  width: 100%;
  color: #cacaca;
  position: absolute;
  bottom: 10%;
  text-align: center;
  margin: 0 auto;
}
</style>
