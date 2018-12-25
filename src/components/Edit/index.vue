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
      <a class="button is-small is-danger is-focused is-rounded" @click="handleClose">
        <span class="icon is-small"> <i class="fas fa-times"></i> </span>
      </a>
    </div>
    <!-- 基本信息 BasicInfo -->
    <b-collapse class="card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
          <b-icon pack="fas" icon="user" size="is-small"> </b-icon>基本信息
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div v-for="(item, i) in getBasicInfoList" :key="i">
          <b-icon :pack="item.pack" :icon="item.icon" size="is-small"> </b-icon
          ><span>{{ item.label }}</span>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item">Save</a> <a class="card-footer-item">Edit</a>
        <a class="card-footer-item">Delete</a>
      </footer>
    </b-collapse>
    <b-collapse class="card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
          <b-icon pack="fas" icon="user" size="is-small"> </b-icon>基本信息
        </p>
        <a class="card-header-icon">
          <b-icon pack="fab" :icon="props.open ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          <a>#buefy</a>.
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item">Save</a> <a class="card-footer-item">Edit</a>
        <a class="card-footer-item">Delete</a>
      </footer>
    </b-collapse>
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

const link = {
  name: {
    label: '姓名',
    icon: 'user-tie'
  },
  desc: {
    label: '格言',
    icon: 'paper-plane'
  },
  gender: {
    label: '性别',
    icon: 'transgender'
  },
  birthday: {
    label: '生日',
    icon: 'birthday-cake'
  },
  avatar: {
    label: '头像',
    icon: 'user-circle'
  },
  school: {
    label: '学校',
    icon: 'graduation-cap'
  },
  major: {
    label: '职业',
    icon: 'briefcase'
  },
  blog: {
    label: '博客',
    icon: 'rss'
  },
  github: {
    label: 'Github',
    icon: 'github',
    pack: 'fab'
  }
}

export default {
  name: 'Edit',
  props: {
    basicInfo: {
      type: Object
    },
    closeMenu: {
      type: Function
    }
  },
  data() {
    return {
      editBasicinfo: { ...editBasicInfo },
      link
    }
  },
  computed: {
    getBasicInfoList() {
      return Object.keys(this.editBasicinfo).map(k => ({
        key: k,
        label: link[k].label,
        icon: link[k].icon,
        pack: link[k].pack || 'fas',
        value: this.editBasicinfo[k]
      }))
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
    },
    handleClose() {
      this.$emit('closeMenu')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
