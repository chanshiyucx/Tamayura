<template>
  <div id="Education">
    <h2 :style="{ color: color.sidebar, borderBottomColor: getFadeColor(color.sidebar) }">
      Education 教育经历
    </h2>
    <div class="content">
      <ul>
        <li v-for="(item, i) in education" :key="i">
          <div>毕业院校：{{ item.school }} （{{ item.time }}）</div>
          <div>修习专业：{{ item.major }}</div>
          <div>修习课程：{{ item.course.join('、') }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Color from 'color'
export default {
  name: 'Education',
  props: {
    color: {
      type: Object
    },
    education: {
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
