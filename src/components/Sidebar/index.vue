<template>
  <div class="sidebar" :style="{ backgroundColor: color.sidebar }">
    <div class="avatar-wrap">
      <img :src="basicInfo.avatar" alt="" />
      <h1>{{ basicInfo.name }}</h1>
      <p>{{ basicInfo.desc }}</p>
    </div>
    <div class="side">
      <h2>Basic 基本信息</h2>
      <ul>
        <li v-for="(item, i) in getBasicInfoList" :key="i">
          {{ item.label }}：<span>{{ item.value }}</span>
        </li>
      </ul>
    </div>
    <div class="side">
      <h2>Concat 联系方式</h2>
      <ul>
        <li v-for="(item, i) in getContactList" :key="i">
          {{ item.label }}：<a v-if="item.link" :href="item.link" target="_blank">{{
            item.value
          }}</a>
          <span v-else>{{ item.value }}</span>
        </li>
      </ul>
    </div>
    <div class="side" v-if="!hidden.skill">
      <h2>Skills 技能树</h2>
      <ul class="skill">
        <li v-for="(item, i) in skill" :key="i">
          <span class="skill-name">{{ item.name }}</span>
          <vue-slider
            tooltip="false"
            disabled
            :value="item.proficiency"
            :dotSize="0"
            :width="190"
            :processStyle="processStyle"
          ></vue-slider>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import vueSlider from 'vue-slider-component'
export default {
  name: 'Sidebar',
  components: {
    vueSlider
  },
  props: {
    map: {
      type: Object
    },
    hidden: {
      type: Object
    },
    color: {
      type: Object
    },
    basicInfo: {
      type: Object
    },
    contact: {
      type: Object
    },
    skill: {
      type: Array
    }
  },
  data() {
    return {}
  },
  computed: {
    getBasicInfoList() {
      const link = this.map.basicInfo
      return Object.keys(this.basicInfo)
        .filter(k => k !== 'name' && k !== 'desc' && k !== 'avatar' && !!this.basicInfo[k])
        .map(k => ({
          key: k,
          label: link[k].label,
          icon: link[k].icon,
          pack: link[k].pack || 'fas',
          value: this.basicInfo[k]
        }))
    },
    getContactList() {
      const link = this.map.contact
      return Object.keys(this.contact)
        .filter(k => !!this.contact[k])
        .map(k => ({
          key: k,
          label: link[k].label,
          icon: link[k].icon,
          pack: link[k].pack || 'fas',
          link: link[k].link
            ? `${this.contact[k].includes('http') ? '' : link[k].link}${this.contact[k]}`
            : '',
          value: this.contact[k]
        }))
    },
    processStyle() {
      console.log('this.color', this.color)
      const { from, to } = this.color.skill

      return {
        backgroundImage: `-webkit-linear-gradient(left, ${from}, ${to})`,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
