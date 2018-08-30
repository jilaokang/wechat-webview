<template>
  <div id="app">
    <div class="main">
      <div class="chatArea" style="background: #efefef;height: 90vh;">
        <div>
        <div v-for="(item,index) of msgList" :key="index">
          <my-msg v-if="item.content.openid == init.data.openid" :value="item.content"></my-msg>
          <other-msg v-else :value="item.content"></other-msg>
        </div>
        </div>
      </div>
      <div class="navArea row center_middle">
          <div class="item-2">
            <button>button</button>
          </div>
          <div class="item-7">
            <textarea id="chatTextArea" maxlength="256" @scroll="setHeight(this)" v-model="postmssage.data.mine.content"></textarea>
          </div>
          <div class="item-3">
            <button class="weui-btn weui-btn_mini weui-btn_primary" @click="postMsg">发送</button>
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
      }
    };
  },
  watch: {
    msgList() {
      console.log(this.msgList[this.msgList.length - 1]);
      this.pushChat();
    }
    //  that.pushChat();
  },
  methods: {
    postMsg() {
      let POSTDATA = JSON.stringify(this.postmssage);
      console.log(this.init.data.openid);
      if (this.postmssage.data.mine.content != null) {
        this.postmssage.data.mine.content = null;
        websocket.send(POSTDATA);
        chatTextArea.style.height = "30px";
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
      console.log(textarea);
      if (textarea.scrollHeight < 168) {
        textarea.style.height = textarea.scrollHeight + "px";
      }
    },
    pushChat() {
      document.querySelector(".chatArea").scrollTop = document.querySelector(
        ".chatArea"
      ).scrollHeight;
    }
  },
  created() {
    let that = this;
    // this.init.data.user_id = this.getHash("id");
    // this.init.data.openid = this.getHash("openid");
    // this.init.data.wangge_id = this.getHash("wgbm");
    // this.init.data.name = this.getHash("name");
    // this.init.data.headimgurl = this.getHash("avatar");
    // this.init.data.user_gn_type = this.getHash("user_gn_type");
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
          console.log(RESDATA.type);
        }
      };
      //失败的监控
      websocket.onerror = function(evt) {
        //连接失败或者返回失败处理
        console.log("error", evt);
      };
    };
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
</style>
