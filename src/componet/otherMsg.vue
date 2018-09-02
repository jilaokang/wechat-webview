<template>
  <div>
  <div class="MSG">
    <div class="userInFo">
      <div class="userInFo__avator">
        <img :src="value.headimgurl" alt="aMsg" />
      </div>
      <div class="userInFo__content">{{value.name}}</div>
    </div>
    <div class="otherMsg">
      <div class="icon-qipao iconfont"></div>
      <div class="otherMsg__content" v-html="value.content"></div>
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
  margin-top: 12px;
  margin-left: 9px;
  justify-items: center;
}
.otherMsg {
  width: 60vw;
  .otherMsg__content {
    padding: 9px 12px;
    border-radius: 4px;
    word-break: break-word;
    background: #fff;
  }

  .iconfont {
    font-size: 30px;
    float: left;
    margin-top: 7px;
    margin-left: -17px;
    color: white;
  }
}

.userInFo {
  width: 75px;
  .userInFo__avator,
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
    color: #999999;
  }
}
</style>
