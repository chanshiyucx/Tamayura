<template>
  <div class="sidebar">
    <div class="avatar-wrap">
      <img :src="basicInfo.avatar" alt="" />
      <h1>{{ basicInfo.name }}</h1>
      <p>{{ basicInfo.desc }}</p>
    </div>
    <div class="side">
      <h2>联系方式</h2>
      <ul>
        <li v-if="contact.tel">
          电话：<span>{{ contact.tel }}</span>
        </li>
        <li v-if="contact.email">
          邮箱：<span>{{ contact.email }}</span>
        </li>
      </ul>
    </div>
    <div class="side"><h2></h2></div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    basicInfo: {
      type: Object
    },
    contact: {
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
