<template>
  <div id="Experience">
    <h2 :style="{ color: color.sidebar, borderBottomColor: getFadeColor(color.sidebar) }">
      Experience 工作经历
    </h2>
    <div class="content">
      <ul>
        <li v-for="(company, i) in experience" :key="i">
          <div class="company">
            <img
              class="logo"
              v-if="company.companyLogo"
              :src="company.companyLogo"
              alt=""
              crossOrigin="Anonymous"
            />
            <h3 :style="{ color: color.sidebar }">
              {{ company.companyName }} （{{ company.time }}）
            </h3>
          </div>
          <div
            class="project-item"
            :style="{ borderColor: color.sidebar }"
            v-for="(item, i) in company.project"
            :key="i"
          >
            <span class="project-dot" :style="{ background: color.sidebar }"></span>
            <div>
              <span class="project-name"> {{ item.name }} - {{ item.description }} </span>
              <a
                v-if="item.link"
                class="link"
                :style="{ color: color.sidebar, borderColor: color.sidebar }"
                :href="item.link"
                target="_blank"
              >
                产品主页
              </a>
            </div>
            <div>{{ item.summary }}</div>
            <ul class="preview">
              <li v-for="(item, i) in item.previewImage" :key="i">
                <img alt="" :src="item" crossOrigin="Anonymous" />
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Color from 'color'
export default {
  name: 'Experience',
  props: {
    color: {
      type: Object
    },
    experience: {
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
