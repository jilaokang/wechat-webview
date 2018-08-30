<template>
  <div class="MSG">
    <div class="myMsg">
          <div class="icon-qipao-copy iconfont"></div>
      <div class="myMsg__content">{{value.content}}</div>
    </div>
    <div class="userInFo">
      <div class="userInFo__avator">
          <img :src="value.headimgurl" />
      </div>
      <div class="userInFo__content">{{value.name}}</div>
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
    background: #2e94b9;
    color: #fff;
  }
  .iconfont {
    font-size: 30px;
    z-index: 999;
    float: right;
    margin-right: -16px;
    color: #2e94b9;
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
    color: #999999;
  }
}
</style>
