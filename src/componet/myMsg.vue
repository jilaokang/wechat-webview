<template>
<div>
    <div class="timer">
      <div>
        {{value.chat_time}}
      </div>
    </div>
  <div class="MSG">
    <div class="myMsg">
          <div class="icon-qipao-copy iconfont"></div>
      <div class="myMsg__content" v-html="value.content"></div>
    </div>
    <div class="userInFo">
      <div class="userInFo__avator">
          <img :src="value.headimgurl" />
      </div>
      <div class="userInFo__content">{{value.name}}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    value: {}
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/iconfont.scss";
.MSG {
  display: flex;
  justify-items: center;
  justify-content: flex-end;
  margin-top: 12px;
  margin-right: 9px;
}

.myMsg {
  width: 60vw;
  .myMsg__content {
    padding: 9px 12px;
    border-radius: 4px;
    word-break: break-word;
    background: #a1e85a;
    color: #000000;
    img {
      width: 50px !important;
    }
  }
  .iconfont {
    font-size: 30px;
    z-index: 999;
    float: right;
    margin-right: -16px;
    color: #a1e85a;
  }
}

.userInFo {
  width: 60px;
  padding-right: 6px;
  .userInFo__avator {
    margin: 0 auto;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
  }
  img {
    margin: 0 auto;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .userInFo__content {
    margin-top: 6px;
    text-align: center;
    font-size: 12px;
    color: #7c8187;
  }
}
.timer {
  text-align: center;
  margin: 24px auto 16px auto;
  width: 32%;
  div {
    background: #d5d5d5;
    color: #ffffff;
    line-height: 2.2;
    text-align: center;
    border-radius: 8px;
    font-size: 10px;
  }
}
</style>
