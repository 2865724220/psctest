<template>
    <div v-show="visible" class="toast-wrap">
      <div class="toast-con">
        <span>{{text}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "toast",
        data () {
          return {
            visible: false,
            text:''
          }
        }
    }
</script>

<style scoped>
  .toast-wrap {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-40%);
    overflow: hidden;
  }
  .toast-con span{
    display: block;
    padding:12px 20px;
    color: #fff;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.5);
    text-align: left;
    border-radius: 4px;
  }
</style>
