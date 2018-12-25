<template>
  <div class="edit">
    <div class="box">
      <h2>基本信息</h2>
      <ul>
        <li v-for="(item, i) in getBasicInfoList" :key="i">
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// 基本信息
const editBasicInfo = {
  name: '',
  desc: '',
  gender: '',
  birthday: '',
  avatar: '',
  school: '',
  major: '',
  blog: '',
  github: ''
}
export default {
  name: 'Edit',
  props: {
    basicInfo: {
      type: Object
    }
  },
  data() {
    return {
      editBasicinfo: { ...editBasicInfo }
    }
  },
  computed: {
    getBasicInfoList() {
      return Object.keys(this.editBasicinfo).map(k => ({ label: k, value: this.editBasicinfo[k] }))
    }
  },
  created() {
    this.editBasicinfo = { ...this.basicInfo }
  },
  methods: {
    getItem(key) {
      return this.editBasicInfo[key]
    },
    reset() {
      this.editBasicinfo = { ...this.basicInfo }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
