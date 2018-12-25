<template>
  <div class="edit">
    <div class="btn-group">
      <div>
        <a class="button is-primary is-focused is-rounded" @click="saveAll">
          <span class="icon is-small"> <i class="fas fa-check"></i> </span> <span>保存</span>
        </a>
        <a class="button is-success is-focused is-rounded" @click="reset">
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
          <b-field>
            <b-input
              v-model="editBasicinfo[item.key]"
              :placeholder="`${item.label}（不填则不显示该栏）`"
              :icon-pack="item.pack"
              :icon="item.icon"
              :disabled="!status.basicInfo.edit"
            >
            </b-input>
          </b-field>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('basicInfo')">保存</a>
        <a class="card-footer-item" @click="edit('basicInfo')">
          {{ status.basicInfo.edit ? '取消' : '编辑' }}
        </a>
        <a class="card-footer-item" @click="changeStatus('basicInfo')">
          {{ status.basicInfo.hidden ? '显示' : '隐藏' }}
        </a>
      </footer>
    </b-collapse>
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
  // 基本信息 BasicInfo
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
      link,
      status: {
        basicInfo: {
          edit: false,
          hidden: false
        }
      },
      editBasicinfo: { ...editBasicInfo }
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
    // 保存所有信息
    saveAll() {},
    // 重置信息
    reset() {
      this.editBasicinfo = { ...this.basicInfo }
    },
    //关闭编辑菜单
    handleClose() {
      this.$emit('closeMenu')
    },
    // 保存
    save(type) {
      // this.status[type]
      // this.$snackbar.open(`Default, positioned bottom-left with a green 'OK' button`)
      this.$snackbar.open({
        duration: 2000,
        message: '保存成功！o(*￣▽￣*)ブ',
        type: 'is-success',
        position: 'is-bottom-left',
        actionText: 'OK',
        queue: false
      })
    },
    // 编辑
    edit(type) {
      this.status[type].edit = !this.status[type].edit
    },
    changeStatus(type) {
      this.status[type].hidden = !this.status[type].hidden
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
