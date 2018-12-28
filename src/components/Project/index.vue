<template>
  <div id="Project">
    <h2>Project 个人项目</h2>
    <div class="content">
      <ul>
        <li v-for="(item, i) in project" :key="i">
          <div>
            <a :href="item.sourceCode || '/'" target="_blank">
              {{ item.name }} - {{ item.description }}
            </a>
          </div>
          <div v-if="item.demo"><a :href="item.demo || '/'" target="_blank"> 在线预览 </a></div>
          <div>{{ item.content }}</div>
          <ul class="preview">
            <li v-for="(item, i) in item.previewImage" :key="i">
              <img alt="" :src="item" crossOrigin="Anonymous" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Project',
  props: {
    project: {
      type: Array
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
