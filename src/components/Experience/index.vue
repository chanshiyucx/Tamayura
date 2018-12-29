<template>
  <div id="Experience">
    <h2 :style="{ color: color.h2 }">Experience 工作经历</h2>
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
            <h3 :style="{ color: color.h3 }">{{ company.companyName }} （{{ company.time }}）</h3>
          </div>
          <div class="project-item" v-for="(item, i) in company.project" :key="i">
            <div>
              <span class="project-name"> {{ item.name }} - {{ item.description }} </span>
              <a class="link" v-if="item.link" :href="item.link" target="_blank"> 产品主页 </a>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
