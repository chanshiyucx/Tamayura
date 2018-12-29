<template>
  <div id="Project">
    <h2 :style="{ color: color.h2 }">Project 个人项目</h2>
    <div class="content">
      <ul>
        <li class="project-item" v-for="(item, i) in project" :key="i">
          <div>
            <a class="project-name" :href="item.sourceCode || '/'" target="_blank">
              {{ item.name }} - {{ item.description }}
            </a>
            <a class="link" v-if="item.link" :href="item.link" target="_blank"> Demo </a>
          </div>
          <div>{{ item.summary }}</div>
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
    color: {
      type: Object
    },
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
