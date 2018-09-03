<template>
  <div id="app">
    <div class="main">
      <!-- :style="keyBordheight?'height:48vh !important':'height:90vh'" -->
      <div class="chatArea" :style="'background: #efefef;height:'+chatHeight">
        <div class="row">
        </div>
        <div>
          <!-- {{screen}} -->
          <div @click="getHistory" class="getmore row center_middle">获取更多</div>
          <div v-for="(item,index) of msgList" :key="index">
            <my-msg v-if="item.content.openid == init.data.openid" :value="item.content"></my-msg>
            <other-msg v-else :value="item.content"></other-msg>
          </div>
        </div>
      </div>
      <div class="navArea">
        <div class="row" style="height: 46px;">
          <!-- <div class="item-2">
            <button>语音</button>
          </div> -->
          <div class="col-7">
            <div class="textareaDiv">
              <textarea rows="1" id="chatTextArea" maxlength="256" contenteditable="true" 
               v-model="postmssage.data.mine.content"  @focus="screenSwitch(true)" @mouseout="screenSwitch(false)"></textarea>
            </div>
          </div>
          <div class="col-3">
            <div class="row center_middle">
              <div class="iconfont icon-jia1" @click="showFooterNav"></div>
              <div>
                <button class="weui-btn weui-btn_mini weui-btn_primary center_middle" @click="postMsg(postmssage.data.mine.content)">发送</button>
              </div>
            </div>
          </div>
        </div>
      </div>
           <FooterMenu v-if="footernav" v-on:postMsg="postMsg">
        </FooterMenu>
    </div>
  </div>
</template>

<script>
import Promise from "promise-polyfill";
import MyMsg from "./componet/myMsg";
import OtherMsg from "./componet/otherMsg";
import FooterMenu from "./componet/swiperNav";

var wsUrl = "wss://wll.tenqent.com:4431"; //必须以ws开头
import "./assets/jquery.js";

var websocket = new WebSocket(wsUrl); //new出一个 websocket 实例
export default {
  name: "app",
  components: {
    MyMsg,
    OtherMsg,
    FooterMenu
  },
  data() {
    return {
      msgList: [],
      chatHeight: "78vh",
      screen: "",
      keyBordheight: false,
      footernav: false,
      page: 0,
      postmssage: {
        type: "chatMessage",
        data: {
          mine: {
            content: ""
          },
          to: {
            type: "other",
            id: 420102001001001
          }
        }
      },
      init: {
        type: "init",
        data: {
          user_id: 3621,
          openid: "oaorM4hjaKt0_zwUOTiS-juvbLNU",
          wangge_id: 420102001001001,
          name: "文虎",
          headimgurl:
            "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJYzCiaicvx24kOTaUlWvOt10kXpFJojlktyzmZf6prr6fzfjfgCDjepcMyaBVRqv1CJibD4UkPrxQicA/132",
          user_gn_type: 1
        }
      },
      postData(content, type) {
        console.log(this.$app.init);
      }
    };
  },

  methods: {
    screenSwitch(value) {
      let SCREEN = this.screen;
      if (!(typeof value == "undefined")) this.keyBordheight = value;
      // console.log(typeof value == "undefined");

      if (SCREEN < 641) {
        this.chatHeight = this.keyBordheight ? "52vh" : "80vh";
      } else if (639 < SCREEN && SCREEN < 701) {
        this.chatHeight = this.keyBordheight ? "48vh" : "78vh";
      } else if (701 < SCREEN && SCREEN < 788) {
        this.chatHeight = this.keyBordheight ? "46vh" : "82vh";
      } else if (788 < SCREEN) {
        this.chatHeight = this.keyBordheight ? "46vh" : "85vh";
      }
      this.pushChat("#app");
      // this.getChatHeight();
      // console.log(parseInt(this.chatHeight));
      // setTimeout(() => {
      //   if (this.keyBordheight && parseInt(this.chatHeight) > 65) {
      //     this.chatHeight = "42vh";
      //   }
      // }, 300);
      // console.log(this.chatHeight);
    },
    postMsg(content, type) {
      this.postmssage.data.mine.content = content;
      let POSTDATA = JSON.stringify(this.postmssage);
      console.log(this.init.data.openid);
      // 检测字符串是否全是空格
      while (content.lastIndexOf(" ") >= 0) {
        content = content.replace(" ", "");
      }
      if (content != 0 && content != null) {
        this.postmssage.data.mine.content = null;
        websocket.send(POSTDATA);
        chatTextArea.style.height = "20px";
      }
      this.pushChat("#app");
    },
    // 从url中获取参数封装的方法
    getHash(value) {
      const HASH = window.location.hash.split("#")[1];
      let hashArr = HASH.split("&").map((value, index) => {
        return value.split("=");
      });
      for (let i of hashArr) {
        if (value === i[0]) return i[1];
      }
    },
    // 封装的调整屏幕位置方法
    pushChat(value) {
      setTimeout(() => {
        document.querySelector(value).scrollTop = document.querySelector(
          value
        ).scrollHeight;
      }, 200);
    },
    getHistory() {
      let that = this;
      that.page++;
      axios({
        url: "https://wechat.tenqent.com/api/wxapp/chat_room/getHistoryLog",
        data: {
          openid: that.init.data.openid,
          wgbm: that.init.data.wangge_id,
          page: that.page
        },
        method: "POST"
      }).then(chatArr => {
        console.log(chatArr.data.data.data);
        let CHATARR = chatArr.data.data.data;
        CHATARR = CHATARR.reverse();
        CHATARR.forEach((value, index) => {
          // that.msgList[index] = value;
          // this.$set(that.msgList, index, value);
          that.msgList.unshift(value);
        });
        console.log(that.msgList);
      });
    },
    // 获取屏幕尺寸
    getChatHeight() {
      let that = this;
      setTimeout(() => {
        this.chatHeight =
          (window.screen.availHeight -
            document.querySelector(".navArea").offsetHeight) /
            window.screen.height *
            100 -
          13 +
          "vh";
      }, 0);
    },
    showFooterNav() {
      this.footernav = !this.footernav;
      this.pushChat("#app");
    }
  },
  mounted() {
    let that = this;
    that.init.data.user_id = this.getHash("id");
    that.init.data.openid = this.getHash("openid");
    that.init.data.wangge_id = this.getHash("wgbm");
    that.init.data.name = this.getHash("name");
    that.init.data.headimgurl = this.getHash("avatar");
    that.init.data.user_gn_type = this.getHash("user_gn_type");
    that.postmssage.data.to.id = this.getHash("wgbm");
    document.title = this.getHash("title");
    // document.title = "武汉微邻里";

    let INITDATA = JSON.stringify(this.init);
    //打开连接websocket
    this.screenSwitch();

    websocket.onopen = function() {
      //发送验证数据

      websocket.send(INITDATA);
      that.getHistory();

      that.pushChat(".chatArea");
      websocket.onmessage = function(evt) {
        //接受返回的数据
        let RESDATA = JSON.parse(evt.data);
        if (RESDATA.type != "ping") {
          that.msgList = that.msgList.concat(RESDATA);
          that.pushChat(".chatArea");
          console.log(RESDATA.type);
        }
      };
      //失败的监控
      websocket.onerror = function(evt) {
        //连接失败或者返回失败处理
        console.log("error", evt);
      };
    };
  },
  created() {
    this.screen = window.screen.availHeight;
    // this.getChatHeight();
  },
  destroyed() {
    socket.close();
  }
};
</script>

<style lang="scss">
@import "../node_modules/tq-layout/main.scss";
@import "../node_modules/weui/dist/style/weui.min";
@import "./scss/iconfont.scss";

#app {
  overflow: scroll;
}

.main {
  height: 100vh;
  /* overflow: hidden; */
}

.chatArea {
  overflow-y: scroll;
  padding-bottom: 81px;
  -div {
    padding: 15px;
  }
}

.navArea {
  z-index: 999;
  background: #ffffff;
  /* height: 8vh; */
  // position: absolute;
  width: 100%;
  bottom: 0;
  padding: 3px 0;
}

textarea {
  width: 100%;
  // margin-top: 4px;
  border: none;
  border-bottom: 1px solid green;
  overflow-y: scroll;
  z-index: 999;
  font-size: 16px;
  outline: none;
}

.textareaDiv {
  margin-top: 10px;
  padding-left: 10px;
}

.navArea .item-2,
.navArea .item-3,
.navArea .item-7 {
  text-align: center;
}

.getmore {
  font-size: 12px;
  color: #999999;
  line-height: 30px;
}

.icon-jia1 {
  font-size: 26px;
  color: #999999;
}

.weui-btn_mini {
  margin-left: 6px;
}
</style>
