<template>
  <div>
    <div v-if="value.chat_time" class="timer">
    <span>
        {{value.chat_time}}
      </span>
    </div>
    <div class="MSG">
      <div class="userInFo">
        <div class="userInFo__avator">
          <img :src="value.headimgurl" alt="aMsg" />
        </div>
        <div class="userInFo__content">{{value.name}}</div>
      </div>
      <div class="otherMsg">
        <div class="icon-qipao iconfont"></div>
        <span class="otherMsg__content" v-html="value.content"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {}
  },
  created() {
    console.log(this.value);
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/iconfont.scss";

.MSG {
  display: flex;
  margin-top: 12px;
  justify-items: center;
}

.otherMsg {
  width: 60vw;
  padding: 1px;
  .otherMsg__content {
    background: #ffffff;
    padding: 8px 12px;
    font-size: 1.1rem;
    display: inline-block;
    border-radius: 2px;
  }

  .iconfont {
    font-size: 0;
    float: left;
    margin-top: -10px;
    margin-left: -15px;
    color: white;
  }
}

.userInFo {
  width: 55px;

  .userInFo__avator,
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
    color: #999999;
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
