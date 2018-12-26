<template>
  <div class="sidebar">
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
          {{ item.label }}：<a v-if="item.type === 'link'" :href="item.value" target="_blank">{{
            item.value
          }}</a>
          <span v-else>{{ item.value }}</span>
        </li>
      </ul>
    </div>
    <div class="side" v-if="!hidden.skill">
      <h2>Skill 技能树</h2>
      <ul class="skill">
        <li v-for="(item, i) in skill" :key="i">
          <ProgressBar
            :startColor="map.skill[item.name].color"
            :stopColor="map.skill[item.name].color"
            innerStrokeColor="#bee3f7"
            :completed-steps="item.proficiency"
          >
            <p>{{ item.name }}</p>
            <p>{{ item.proficiency }}%</p>
          </ProgressBar>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ProgressBar from '../ProgressBar'
export default {
  name: 'Sidebar',
  components: {
    ProgressBar
  },
  props: {
    map: {
      type: Object
    },
    hidden: {
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
          type: link[k].type || 'text',
          value: this.contact[k]
        }))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
