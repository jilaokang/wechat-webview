<template>
  <div id="app">
    <div class="main">
      <div class="chatArea" style="background: #efefef;height:90vh"  :style="keyBordheight?'height:45vh !important':'height:90vh'" >
        <div>
          {{init.data.user_id}}{{init.data.openid}}{{init.data.headimgurl}}
          <div @click="getHistory" class="getmore row center_middle" >获取更多</div>
        <div v-for="(item,index) of msgList" :key="index">
          <my-msg v-if="item.content.openid == init.data.openid" :value="item.content"></my-msg>
          <other-msg v-else :value="item.content"></other-msg>
        </div>
        </div>
      </div>
      <div class="navArea">
        <div class="row center_middle">
          <div class="item-2">
            <button>语音</button>
          </div>
          <div class="item-7">
            <textarea id="chatTextArea" maxlength="256" @focus="keyBordheight = true" @mouseout="keyBordheight = false" @scroll="setHeight(this)" v-model="postmssage.data.mine.content"></textarea>
          </div>
          <div class="item-3">
            <button class="weui-btn weui-btn_mini weui-btn_primary" @click="postMsg">发送</button>
          </div>
      </div>
              </div>
    </div>
  </div>
</template>

<script>
import MyMsg from "./componet/myMsg";
import OtherMsg from "./componet/otherMsg";
var wsUrl = "wss://wll.tenqent.com:4431"; //必须以ws开头

var websocket = new WebSocket(wsUrl); //new出一个 websocket 实例
export default {
  name: "app",
  components: { MyMsg, OtherMsg },
  data() {
    return {
      msgList: [],
      page: 0,
      keyBordheight: false,
      postmssage: {
        type: "chatMessage",
        data: {
          mine: {
            content: ""
          },
          to: {
            type: "other",
            id: null
          }
        }
      },
      init: {
        type: "init",
        data: {
          user_id: null,
          openid: null,
          wangge_id: null,
          name: null,
          headimgurl: null,
          user_gn_type: null
        }
      }
    };
  },
  watch: {
    msgList() {
      setTimeout(() => {
        this.pushChat("bottom");
      }, 0);
    }
  },
  methods: {
    postMsg() {
      let POSTDATA = JSON.stringify(this.postmssage);
      console.log(this.init.data.openid);
      if (this.postmssage.data.mine.content != null) {
        this.postmssage.data.mine.content = null;
        websocket.send(POSTDATA);
        chatTextArea.style.height = "30px";
        this.getHash("bottom");
      }
    },
    getHash(value) {
      const HASH = window.location.hash.split("#")[1];
      let hashArr = HASH.split("&").map((value, index) => {
        return value.split("=");
      });
      for (let i of hashArr) {
        if (value === i[0]) return i[1];
      }
    },
    setHeight(obj) {
      var textarea = document.getElementById("chatTextArea");
      if (textarea.scrollHeight < 168) {
        textarea.style.height = textarea.scrollHeight + "px";
      }
    },
    pushChat() {
      document.querySelector(".chatArea").scrollTop = document.querySelector(
        ".chatArea"
      ).scrollHeight;
    },
    getHistory() {
      // let that = this;
      // that.page++;
      //   console.log("aaa");
      //   axios({
      //     url: "https://wechat.tenqent.com/api/wxapp/chat_room/getHistoryLog",
      //     data: {
      //       openid: that.init.data.openid,
      //       wgbm: that.init.data.wangge_id,
      //       page: that.page
      //     },
      //     method: "POST"
      //   }).then(chatArr => {
      //     console.log(chatArr.data.data.data);
      //     let CHATARR = chatArr.data.data.data;
      //     CHATARR = CHATARR.reverse();
      //     CHATARR.forEach((value, index) => {
      //       // that.msgList[index] = value;
      //       // this.$set(that.msgList, index, value);
      //       that.msgList.unshift(value);
      //     });
      //     console.log(that.msgList);
      //   });
      // }
    }
  },
  created() {
    let that = this;
    that.getHistory();
    that.init.data.user_id = this.getHash("id");
    that.init.data.openid = this.getHash("openid");
    that.init.data.wangge_id = this.getHash("wgbm");
    that.init.data.name = this.getHash("name");
    that.init.data.headimgurl = this.getHash("avatar");
    that.init.data.user_gn_type = this.getHash("user_gn_type");
    that.postmssage.data.to.id = this.getHash("wgbm");
    console.log(name);

    let INITDATA = JSON.stringify(this.init);
    //打开连接websocket
    websocket.onopen = function() {
      //发送验证数据
      websocket.send(INITDATA);
      websocket.onmessage = function(evt) {
        //接受返回的数据
        let RESDATA = JSON.parse(evt.data);
        if (RESDATA.type != "ping") {
          that.msgList = that.msgList.concat(RESDATA);
          this.pushChat("bottom");
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
  destroyed() {
    socket.close();
  }
};
</script>

<style lang="scss">
@import "../node_modules/tq-layout/main.scss";
@import "../node_modules/weui/dist/style/weui.min";
@import "./scss/iconfont.scss";

.main {
  height: 100vh;
  overflow: hidden;
}

.chatArea {
  overflow: scroll;
  -div {
    padding: 15px;
  }
}

.navArea {
  height: 10vh;
  display: absolute;
  padding: 3px 0;
}

textarea {
  width: 100%;
  border: none;
  border-bottom: 1px solid #efefef;
  padding: 3px 4px;
  border-radius: 3px;
  overflow-y: scroll;
  z-index: 999;
  font-size: 16px;
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
</style>
