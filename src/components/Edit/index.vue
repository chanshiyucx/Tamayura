<template>
  <div class="edit">
    <div class="btn-group">
      <div>
        <a class="button is-primary is-focused is-rounded">
          <span class="icon is-small"> <i class="fas fa-check"></i> </span> <span>保存</span>
        </a>
        <a class="button is-success is-focused is-rounded">
          <span class="icon is-small"><i class="fas fa-undo"></i> </span> <span>重置</span>
        </a>
      </div>
      <a class="button is-small is-danger is-focused is-rounded">
        <span class="icon is-small"> <i class="fas fa-times"></i> </span>
      </a>
    </div>
    <Collapse :open="false">
      <button class="button is-primary" slot="trigger">Click me!</button>
      <div class="box">
        <h2>基本信息</h2>
        <ul>
          <li v-for="(item, i) in getBasicInfoList" :key="i">
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </Collapse>
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
