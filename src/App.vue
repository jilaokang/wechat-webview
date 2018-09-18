<template>
  <div id="app">
    <div class="main">
      <div id="header" class="left_middle row container">
        <div class="col-4">
          <div class="left_middle change" style="padding-left:10px">
            <div class="iconfont icon-fanhui1"></div>
            <div class="change_content" @click="toMsgList">
              消息列表
            </div>
            <button @click="jsjdk">扫一扫</button>
          </div>
        </div>
        <div class="col-4">
          <div class="swiper-container">
            <!-- <div class="swiper-content">
              <div class="swiper-slide">武汉微邻里V1.0版本测试上线</div>
              <div class="swiper-slide">欢迎各位领导测试反馈^_^</div>
              <div class="swiper-slide">感谢您的宝贵意见</div>
            </div> -->
          </div>
        </div>
        <div class="col-2 right">
          <span class="iconfont icon-qunzhu" style="padding-right:10px" @click="toDetail"></span>
        </div>
      </div>
      <div class="chatArea" :style="'background: #ececec;height:'+chatHeight">
        <div style="padding:30px 0">
          <div @click="getHistory" class="getmore row center_middle">获取更多</div>
          <!-- <p>{{postmssage}}</p>
          <p>{{init}}</p>
          <p>-------------</p>
          <p>{{init.data.wangge_id}}</p> -->
          {{test}}
          <div v-for="(item,index) of msgList" :key="index">
            <my-msg v-if="item.content.openid == init.data.openid" @mousedown="getPressStart" @mouseover="doNoticeSomeone"
              :value="item.content"></my-msg>
            <other-msg v-else :value="item.content"></other-msg>
          </div>
        </div>
      </div>
      <div class="navArea">
        <div class="row" style="height: 46px;">
          <span class="iconfont icon-yuyin" @click="isBack('voicebutton')" style="padding-left: 3px;"></span>
          <div class="item-8">
            <div class="textareaDiv">
              <textarea v-if="!voicebutton" rows="1" id="chatTextArea" maxlength="256" contenteditable="true" v-model="postmssage.data.mine.content"
                @focus="screenSwitch(true)" @mouseout="screenSwitch(false)"></textarea>
              <button v-if="voicebutton" @touchstart="getButton" @touchend="clearButton" @touchmove="cancelButton"
                class="weui-btn weui-btn_primary weui-btn_mini" style="width:100%;margin-top:-2px">点击录音</button>
            </div>
          </div>
          <span class="iconfont icon-biaoqing" @click="isShowFace"></span>
          <span v-if="!postmssage.data.mine.content" class="iconfont icon-jia1" @click="showFooterNav"></span>
          <span v-if="postmssage.data.mine.content" class="weui-btn weui-btn_primary weui-btn_mini" @click="postMsg(postmssage.data.mine.content)">发送</span>
        </div>
      </div>
      <FooterMenu v-if="footernav" v-on:postMsg="postMsg">
      </FooterMenu>
      <div clas="row center_middle" v-if="facestate">
        <img v-for="(item,index) in face" @click="getFace(index)" :key="index" :src="'https://wechat.tenqent.com/static/face/'+ index+'.gif'"
          style="padding:0 5px;width:25px;" />
      </div>
    </div>
  </div>
</template>

<script>
import Promise from "promise-polyfill";
import MyMsg from "./componet/myMsg";
import OtherMsg from "./componet/otherMsg";
import FooterMenu from "./componet/swiperNav";

var wsUrl = "wss://wechat.tenqent.com:7273";
import "./assets/jquery.js";

var websocket = new WebSocket(wsUrl);
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
      face: [
        "[微笑]",
        "[嘻嘻]",
        "[哈哈]",
        "[可爱]",
        "[可怜]",
        "[挖鼻]",
        "[吃惊]",
        "[害羞]",
        "[挤眼]",
        "[闭嘴]",
        "[鄙视]",
        "[爱你]",
        "[泪]",
        "[偷笑]",
        "[亲亲]",
        "[生病]",
        "[太开心]",
        "[白眼]",
        "[右哼哼]",
        "[左哼哼]",
        "[嘘]",
        "[衰]",
        "[委屈]",
        "[吐]",
        "[哈欠]",
        "[抱抱]",
        "[怒]",
        "[疑问]",
        "[馋嘴]",
        "[拜拜]",
        "[思考]",
        "[汗]",
        "[困]",
        "[睡]",
        "[钱]",
        "[失望]",
        "[酷]",
        "[色]",
        "[哼]",
        "[鼓掌]",
        "[晕]",
        "[悲伤]",
        "[抓狂]",
        "[黑线]",
        "[阴险]",
        "[怒骂]",
        "[互粉]",
        "[心]",
        "[伤心]",
        "[猪头]",
        "[熊猫]",
        "[兔子]",
        "[ok]",
        "[耶]",
        "[good]",
        "[NO]",
        "[赞]",
        "[来]",
        "[弱]",
        "[草泥马]",
        "[神马]",
        "[囧]",
        "[浮云]",
        "[给力]",
        "[围观]",
        "[威武]",
        "[奥特曼]",
        "[礼物]",
        "[钟]",
        "[话筒]",
        "[蜡烛]",
        "[蛋糕]"
      ],
      facestate: false,
      voicebutton: false,
      presstimer: 0,
      chatHeight: "78vh",
      screen: "",
      keyBordheight: false,
      footernav: false,
      page: 0,
      timer: null,
      postmssage: {
        type: "chatMessage",
        data: {
          mine: {
            content: ""
          },
          to: {
            type: "friend",
            id: "oaorM4hjaKt0_zwUOTiS-juvbLNU"
          }
        }
      },
      init: {
        type: "init",
        data: {
          user_id: 3621,
          openid: "oaorM4huIYLMHSygekz5rzxFxaLI",
          wangge_id: 420102001001002,
          name: "文虎",
          headimgurl:
            "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJYzCiaicvx24kOTaUlWvOt10kXpFJojlktyzmZf6prr6fzfjfgCDjepcMyaBVRqv1CJibD4UkPrxQicA/132",
          user_gn_type: 1
        }
      },
      postData(content, type) {
        console.log(this.$app.init);
      },
      test: ""
    };
  },

  methods: {
    isBack(value) {
      this[value] = !this[value];
    },
    getButton() {
      let that = this;
      let value = 0;
      wx.startRecord();
      this.timer = setInterval(() => {
        value++;
        that.test = value + ":dd";
      }, 200);
    },
    clearButton() {
      let that = this;
      wx.stopRecord({
        success: function(res) {
          that.test = res.localId;
          wx.uploadVoice({
            localId: that.test, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              that.test = res.serverId; // 返回音频的服务器端ID
              // alert(res.serverId)
              axios({
                url: "https://wechat.tenqent.com/api/wxapp/chat/mp3",
                data: {
                  media_id: res.serverId
                },
                method: "post"
              }).then(res => {
                // 最终结果
                // alert(res.data.data.data.path)
                let audioclass = "audioicon";

                let audio = (that.postmssage.data.mine.content = `<audio @click="showvoice" class='audio' src='${
                  res.data.data.data.path
                }'>
                        </audio>
                      <span class="iconfont icon-me audioicon"></span>
                        `);
                // let POSTDATA = JSON.stringify(this.postmssage);
                // websocket.send(POSTDATA);
                that.postMsg(audio);
                // that.test = res.data.data.path
              });
            }
          });
        }
      });

      clearInterval(that.timer);
    },
    showvoice() {
      console.log("dd");
    },
    cancelButton() {
      alert("已取消");
      wx.stopRecord({
        success: function(res) {
          that.test = res.localId;
        }
      });
      clearInterval(that.timer);
    },
    getPressStart() {
      let date = new Date();
      this.presstimer = date.getTime();
    },
    doNoticeSomeone() {
      let time = 1;
    },
    isShowFace() {
      this.facestate = !this.facestate;
      if (this.footernav) {
        this.footernav = false;
      }
      this.pushChat("#app");
    },
    jsjdk() {
      let that = this;
      wx.startRecord();
      setTimeout(() => {
        wx.stopRecord({
          success: function(res) {
            that.test = res.localId;
          }
        });
      }, 3000);

      wx.uploadVoice({
        localId: that.test, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          that.test = res.serverId; // 返回音频的服务器端ID
          axios({
            url: "https://wechat.tenqent.com/api/wxapp/chat/mp3",
            data: {
              media_id: res.serverId
            },
            method: "post"
          }).then(res => {
            // 最终结果
            // alert(res.data.data.data.path)
            // that.test = res.data.data.path
          });
        }
      });
    },
    clearState() {
      console.log("ddd");
      this.footernav = false;
      this.facestate = false;
    },
    screenSwitch(value) {
      let SCREEN = this.screen;
      if (value) {
        this.footernav = false;
        this.facestate = false;
      }
      if (!(typeof value == "undefined")) this.keyBordheight = value;

      if (SCREEN < 639) {
        this.chatHeight = this.keyBordheight ? "93vh" : "93vh";
      } else if (639 < SCREEN && SCREEN < 701) {
        this.chatHeight = this.keyBordheight ? "93vh" : "93vh";
      } else if (701 < SCREEN && SCREEN < 788) {
        this.chatHeight = this.keyBordheight ? "93vh" : "93vh";
      } else if (788 < SCREEN) {
        this.chatHeight = this.keyBordheight ? "93vh" : "93vh";
      }
      setTimeout(() => {
        this.pushChat("#app");
        this.pushChat(".navArea");
      }, 0);
    },
    getFace(index) {
      let icon = "face" + this.face[index] + " ";
      if (!this.postmssage.data.mine.content) {
        this.postmssage.data.mine.content = "";
      }
      this.postmssage.data.mine.content += icon;
      this.pushChat(".navArea");
    },
    postMsg(content, type) {
      this.postmssage.data.mine.content = content;
      let POSTDATA = JSON.stringify(this.postmssage);
      this.test = POSTDATA;
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
      const HASH = decodeURI(window.location.hash).split("#")[1];
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
        url:
          "https://wechat.tenqent.com/api/wxapp/chat_room/getShequHistoryLog",
        data: {
          // type: "other",
          type: that.postmssage.data.to.type === "friend" ? "other" : "group",
          openid: that.init.data.openid,
          wgbm: that.postmssage.data.to.id,
          page: that.page
        },
        method: "POST"
      }).then(chatArr => {
        console.log(chatArr.data.data.data);
        let CHATARR = chatArr.data.data.data;
        CHATARR = CHATARR.reverse();
        CHATARR.forEach((value, index) => {
          that.msgList.unshift(value);
        });
        if (that.page == 1) {
          that.pushChat(".chatArea");
        }
      });
    },
    toDetail() {
      wx.miniProgram.navigateTo({
        url: "/pages/chat/roominfo/index"
      });
    },
    toMsgList() {
      wx.miniProgram.navigateTo({
        url: "/pages/chat/chatlist"
      });
    },
    showFooterNav() {
      if (this.facestate) {
        this.facestate = false;
      }
      this.footernav = !this.footernav;
      this.pushChat("#app");
    },
    watting() {
      alert("正在开发中");
    }
  },
  mounted() {
    let that = this;
    // that.postmssage.data.to.type = this.getHash("type");
    // that.init.data.user_id = this.getHash("id");
    // that.init.data.openid = this.getHash("openid");
    // that.init.data.wangge_id = this.getHash("wgbm");
    // that.init.data.name = this.getHash("name");
    // that.init.data.headimgurl = this.getHash("avatar");
    // that.init.data.user_gn_type = this.getHash("user_gn_type");
    // that.postmssage.data.to.id = this.getHash("toid");
    // document.title = this.getHash("title");
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
          if (
            RESDATA.content.type === "friend" &&
            that.postmssage.data.to.id.length === 28
          ) {
            if (
              RESDATA.content.openid === that.postmssage.data.to.id ||
              RESDATA.content.openid === that.init.data.openid
            ) {
              that.msgList = that.msgList.concat(RESDATA);
            }
          }

          if (
            RESDATA.content.type === "other" &&
            that.postmssage.data.to.id.length === 15
          ) {
            that.msgList = that.msgList.concat(RESDATA);
          }

          that.pushChat(".chatArea");
        }
      };
      //失败的监控
      websocket.onerror = function(evt) {
        //连接失败或者返回失败处理
        console.log("error", evt);
      };
    };
    // audioiconarr.map((value, index) => {
    //   item.addEventListener('click', function () {
    //     console.log('i am click', index)
    //   })
    // })
  },
  created() {
    this.screen = window.screen.availHeight;
    // 勿删：顶部轮播消息
    // let length = document.getElementsByClassName("swiper-slide").length;
    // var i = 1;
    // setInterval(() => {
    //   i === 2 ? (i = 0) : (i = i + 1);
    //   document.getElementsByClassName(
    //     "swiper-content"
    //   )[0].style.marginTop = `-${i * 30}px`;
    // }, 3000);
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
  background: #f4f4f4;
}

.main {
  height: 100vh;
}

.chatArea {
  overflow-y: scroll;

  -div {
    padding: 15px;
  }
}

.navArea {
  border-top: 1px solid #e0e0e0;
  z-index: 999;
  background: #f4f4f4;
  width: 100%;
  bottom: 0;
  padding: 3px 0;
}

textarea {
  width: 100%;
  border: none;
  margin-top: 6px;
  border-bottom: 1px solid #f4f4f4;
  background: #f4f4f4;
  overflow-y: scroll;
  z-index: 999;
  font-size: 16px;
  height: 20px;
  outline: none;
  resize: none;
  border-bottom: 1px solid #aaaaaa;

  &:focus {
    border-bottom: 1px solid green;
  }
}

.textareaDiv {
  margin-top: 10px;
  padding-left: 8px;
}

.navArea .item-2,
.navArea .item-3,
.navArea .item-7 {
  text-align: center;
}

#header {
  box-shadow: 1px 1px 10px #d0d0d0;
  height: 48px;
  background: rgb(255, 255, 255);
  position: fixed;
  top: 0;

  .change,
  .iconfont {
    color: #777777;
  }

  .change {
    .iconfont {
      font-size: 15px;
    }

    font-size: 14px;
  }

  .iconfont {
    font-size: 24px;
    text-align: right;
  }
}

.getmore {
  margin-top: 30px;
  font-size: 12px;
  color: #777777;
  line-height: 30px;
}

.icon-jia1,
.icon-yuyin,
.icon-biaoqing {
  font-size: 1.8rem;
  color: #777777;
  margin: auto;
}

.weui-btn_mini {
  padding: 1px 8px !important;
  height: 30px;
  /* line-height: 0 !important; */
  margin: auto;
}

.swiper-container {
  height: 30px;
  overflow: hidden;
}

.swiper-slide {
  line-height: 30px;
}

.swiper-slide {
  font-size: 12px;
  color: #777777;
}

.swiper-container {
  width: 100%;
  text-align: center;
}

.right {
  text-align: right;
}

.col-3 {
  .row {
    flex-wrap: nowrap;
  }
}
</style>
