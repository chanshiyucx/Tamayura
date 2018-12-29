<template>
  <div id="Project">
    <h2 :style="{ color: color.sidebar, borderBottomColor: getFadeColor(color.sidebar) }">
      Project 个人项目
    </h2>
    <div class="content">
      <ul>
        <li class="project-item" v-for="(item, i) in project" :key="i">
          <span class="project-dot" :style="{ background: color.sidebar }"></span>
          <div>
            <a class="project-name" :href="item.sourceCode || '/'" target="_blank">
              {{ item.name }} - {{ item.description }}
            </a>
            <a
              v-if="item.link"
              class="link"
              :style="{ color: color.sidebar, borderColor: color.sidebar }"
              :href="item.link"
              target="_blank"
            >
              Demo
            </a>
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
import Color from 'color'
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
  },
  methods: {
    getFadeColor(color) {
      return Color(color)
        .fade(0.6)
        .string()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
