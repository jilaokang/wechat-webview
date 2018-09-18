<template>
<div>
    <div v-if="value.chat_time" class="timer">
    <span>
        {{value.chat_time}}
      </span>
    </div>
  <div class="MSG">
    <div class="myMsg">
          <div class="icon-qipao-copy iconfont"></div>
      <span class="myMsg__content" v-html="value.content">
      </span>
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
}

.myMsg {
  text-align: right;
  width: 60vw;
  margin: 8px 0;
  // background: #ffffff;
  padding: 1px;
  .myMsg__content {
    text-align: left;
    display: inline-block;
    padding: 8px 12px;
    font-size: 1.1rem;
    border-radius: 2px;
    word-break: break-word;
    background: #95df4b;
    color: #000000;
  }
  .iconfont {
    font-size: 0px;
    margin-top: -9px;
    z-index: 999;
    // float: right;
    margin-right: -10px;
    color: #95df4b;
  }
}

.userInFo {
  width: 55px;
  padding-right: 6px;
  .userInFo__avator {
    margin: 0 auto;
    width: 32px;
    height: 32px;
  }
  img {
    margin: 0 auto;
    width: 36px;
    height: 36px;
    border-radius: 2px;
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
  span {
    padding: 3px 5px;
    background: #d4d4d4;
    color: #ffffff;
    line-height: 2.2;
    border-radius: 2px;
    font-size: 10px;
  }
}
audio {
  width: 100px;
}
</style>
