<template>
  <div>
    <section class="ChatSwiper swiper-wrappe">
      <section>
        <div class="container">
          <div class="row center_middle">
            <div class="item-3">
              <section>
                <div class="iconBlock">
                  <div class="iconfont icon-zhaopian"></div>
                  <div class="iconfontNav">照片</div>
                  <div>
                  <input type="file" id="postimg" class="inputgroup" accept="image/*" />
                  </div>
                </div>
              </section>
            </div>
            <div class="item-3">
              <section>
                <div class="iconBlock">
                  <div class="iconfont icon-zhaopian1"></div>
                  <div class="iconfontNav">拍摄</div>
                  <div>
                    
                  
                  <input type="file" id="postcamera" class="inputgroup" accept="image/*" capture="camera" />
               </div>
                </div>
              </section>
            </div>
            <div class="item-3">
              <section>
                <div class="iconBlock">
                  <div class="iconfont icon-yuyin1"></div>
                  <div class="iconfontNav">语音输入</div>
                  <div>
                     <input type="file" id="postaudio" class="inputgroup" accept="*" />
                  </div>
                </div>
              </section>
            </div>
            <div class="item-3">
              <section>
                <div class="iconBlock">
                  <div class="iconfont icon-wenjian"></div>
                  <div class="iconfontNav">文件</div>
                  <div>
                  <input type="file" id="postfile" class="inputgroup" accept="*" />
                  </div>
                </div>
              </section>
            </div>
            <div class="item-3">
              <section>
                <div class="iconBlock" @click="toPushThing">
                  <div class="iconfont icon-wenda2"></div>
                  <div class="iconfontNav">我要说事</div>
                </div>
              </section>
            </div>
            <div class="item-3">
              <section>
                <div class="iconBlock" @click="toJonin">
                  <div class="iconfont icon-huabanfuben"></div>
                  <div class="iconfontNav">我要参与</div>
                </div>
              </section>
            </div>
            <div class="item-3">
              <section>
                <div class="iconBlock">
                  <div class="iconfont icon-qiandao-kaoqindaqia"></div>
                  <div class="iconfontNav">党员打卡</div>
                </div>
              </section>
            </div>
            <div class="item-3">
              <section>
                <div class="iconBlock" @click="toClear">
                  <div class="iconfont icon-dajimubiao"></div>
                  <div class="iconfontNav">扫黑除恶</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    postMsg: {}
  },
  data() {
    return {
      image: "",
      camera: "",
      file: "",
      audio: ""
    };
  },
  mounted() {
    this.getValue("#postimg", "image");
    this.getValue("#postcamera", "camera");
    this.getValue("#postfile", "file");
    this.getValue("#postaudio", "audio");
  },
  methods: {
    getValue(dom, type) {
      console.log("ddd");
      let that = this;
      let DOM = document.querySelector(dom);
      let TYPE;
      DOM.addEventListener("change", function() {
        let file = this.files[0];
        let FileName = file.name;

        if (window.FileReader) {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          //监听文件读取结束后事件
          reader.onloadend = function(e) {
            // 获取到的在线链接
            let value = (that[type] = e.target.result);
            console.log(e.target.result);

            switch (type) {
              case "image":
                TYPE = 1;
                break;
              case "file":
                TYPE = 2;
                break;
              case "video":
                TYPE = 3;
                break;
            }
            that.getUrl(FileName, value, TYPE).then(VALUE => {
              that.$emit("postMsg", VALUE, type);
            });
          };
        }
      });
    },

    getUrl(name, value, type) {
      return axios({
        url: "https://wechat.tenqent.com/api/wxapp/chat/wen_upload",
        data: {
          base64: value,
          // 1图片 2文件 3mp3
          type: type,
          name: name
        },
        method: "post"
      }).then(res => {
        return res.data.data;
      });
    },
    toPushThing() {
      wx.miniProgram.navigateTo({
        url: "/pages/pushdeal/index"
      });
    },
    toJonin() {
      wx.miniProgram.navigateTo({
        url: "/pages/wish/index"
      });
    },
    toClear() {
      wx.miniProgram.navigateTo({
        url: "/pages/underworld/index"
      });
    }
  },

  created() {}
};
</script>

<style lang="scss" scoped>
.ChatSwiper {
  padding: 10px;
  height: 230px;
  padding-bottom: 10px;
  background: rgba(0, 0, 0, 0.05);

  .item-3 section {
    color: #999999;

    .iconBlock {
      background: #ffffff;
      padding: 6px;
      margin: 5px;
      border: 1px solid #efefef;
      border-radius: 10px;

      div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .iconfont {
      font-size: 32px;
    }

    .iconfontNav {
      font-size: 12px;
    }
  }
}

.inputgroup {
  width: 100%;
  // margin: -78px 0 0 -32px;
  margin-top: -80px;
  // position: absolute;
  height: 80px;
  opacity: 0;
  display: inline;
  border: 1px solid red;
  background: red;
  color: red;
}
</style>
