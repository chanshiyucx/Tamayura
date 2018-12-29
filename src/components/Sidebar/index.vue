<template>
  <div class="sidebar" :style="{ backgroundColor: color.sidebar }">
    <div class="avatar-wrap">
      <img :src="personInfo.avatar" alt="" crossOrigin="Anonymous" />
      <h1>{{ personInfo.name }}</h1>
      <p>{{ personInfo.desc }}</p>
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
    <div class="side" v-if="!hidden.about">
      <h2>About 关于我</h2>
      <div class="about">{{ about }}</div>
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
      type: Array
    },
    contact: {
      type: Array
    },
    skill: {
      type: Array
    },
    about: {
      type: String
    }
  },
  data() {
    return {}
  },
  computed: {
    personInfo() {
      const avatar = this.basicInfo.find(o => o.type === 'avatar').value
      const name = this.basicInfo.find(o => o.type === 'name').value
      const desc = this.basicInfo.find(o => o.type === 'desc').value
      return {
        avatar,
        name,
        desc
      }
    },
    getBasicInfoList() {
      const link = this.map.basicInfo
      return this.basicInfo
        .filter(
          o =>
            o.type !== 'name' && o.type !== 'desc' && o.type !== 'avatar' && !!o.type && !!o.value
        )
        .map(o => ({
          label: link[o.type] ? link[o.type].label : o.type,
          value: o.value
        }))
    },
    getContactList() {
      const link = this.map.contact
      return this.contact
        .filter(o => !!o.type && !!o.value)
        .map(o => ({
          label: link[o.type] ? link[o.type].label : o.type,
          value: o.value,
          link:
            link[o.type] && link[o.type].link
              ? `${o.value.includes('http') ? '' : link[o.type].link}${o.value}`
              : ''
        }))
    },
    processStyle() {
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
