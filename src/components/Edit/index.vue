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
              v-model="editBasicInfo[item.key]"
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
    <!-- 联系方式 Contact -->
    <b-collapse class="card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
          <b-icon pack="fas" icon="mobile-alt" size="is-small"> </b-icon>联系方式
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div v-for="(item, i) in getContactList" :key="i">
          <b-field>
            <b-input
              v-model="editContact[item.key]"
              :placeholder="`${item.label}（不填则不显示该栏）`"
              :icon-pack="item.pack"
              :icon="item.icon"
              :disabled="!status.contact.edit"
            >
            </b-input>
          </b-field>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('contact')">保存</a>
        <a class="card-footer-item" @click="edit('contact')">
          {{ status.contact.edit ? '取消' : '编辑' }}
        </a>
        <a class="card-footer-item" @click="changeStatus('contact')">
          {{ status.contact.hidden ? '显示' : '隐藏' }}
        </a>
      </footer>
    </b-collapse>
    <!-- 技能树 Skill -->
    <b-collapse class="card">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">
          <b-icon pack="fab" icon="empire" size="is-small"> </b-icon>技能树
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="props.open ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="skill-item" v-for="(item, i) in editSkill" :key="i">
          <div class="skill-name">{{ item.name }}</div>
          <vue-slider
            v-model="item.proficiency"
            tooltip="hover"
            :width="190"
            :disabled="!status.skill.edit"
            :formatter="formatter"
            :processStyle="{
              backgroundImage: '-webkit-linear-gradient(left, #ff8dde, #3498db)'
            }"
            :tooltipStyle="tooltipStyle"
          ></vue-slider>
          <div class="skill-precent">{{ item.proficiency }}%</div>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('skill')">保存</a>
        <a class="card-footer-item" @click="edit('skill')">
          {{ status.skill.edit ? '取消' : '编辑' }}
        </a>
        <a class="card-footer-item" @click="changeStatus('skill')">
          {{ status.skill.hidden ? '显示' : '隐藏' }}
        </a>
      </footer>
    </b-collapse>
  </div>
</template>
<script>
import vueSlider from 'vue-slider-component'
export default {
  name: 'Edit',
  components: {
    vueSlider
  },
  props: {
    map: {
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
    return {
      status: {
        basicInfo: {
          edit: false,
          hidden: false
        },
        contact: {
          edit: false,
          hidden: false
        },
        skill: {
          edit: false,
          hidden: false
        }
      },
      editBasicInfo: {},
      editContact: {},
      editSkill: [],
      tooltipStyle: {
        backgroundColor: 'rgba(200, 82, 235, 0.6)',
        borderColor: 'rgba(200, 82, 235, 0.6)',
        borderWidth: 0
      }
    }
  },
  computed: {
    getBasicInfoList() {
      const link = this.map.basicInfo
      return Object.keys(this.editBasicInfo).map(k => ({
        key: k,
        label: link[k].label,
        icon: link[k].icon,
        pack: link[k].pack || 'fas',
        value: this.editBasicInfo[k]
      }))
    },
    getContactList() {
      const link = this.map.contact
      return Object.keys(this.editContact).map(k => ({
        key: k,
        label: link[k].label,
        icon: link[k].icon,
        pack: link[k].pack || 'fas',
        value: this.editContact[k]
      }))
    }
  },
  watch: {
    basicInfo(val) {
      this.editBasicInfo = { ...val }
    },
    contact(val) {
      this.editContact = { ...val }
    },
    skill(val) {
      this.editSkill = { ...val }
    }
  },
  created() {
    this.editBasicInfo = { ...this.basicInfo }
    this.editContact = { ...this.contact }
    // TODO: 技能树可以直接修改，BUG or Feature?
    this.editSkill = [...this.skill]
  },
  methods: {
    // 保存所有信息
    saveAll() {},
    // 重置信息
    reset() {
      this.$dialog.confirm({
        title: '提示',
        message: '是否将所有信息重置为 <b>初始状态</b> 喵？若如此则将清空已保存信息。',
        cancelText: '取消',
        confirmText: '确定',
        type: 'is-danger',
        iconPack: 'fas',
        icon: 'exclamation-circle',
        hasIcon: true,
        onConfirm: () => {
          this.$emit('reset')
          this.$toast.open('重置成功!')
        }
      })
    },
    //关闭编辑菜单
    handleClose() {
      this.$emit('closeMenu')
    },
    // 保存
    save(type) {
      let data
      switch (type) {
        case 'basicInfo':
          data = this.editBasicInfo
          break
        case 'contact':
          data = this.editContact
      }
      this.$emit('save', { type, data })
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
    },
    // 技能进度格式化
    formatter(value) {
      let text = ''
      if (value < 20) text = '萌新'
      else if (value >= 20 && value < 40) text = '了解'
      else if (value >= 40 && value < 60) text = '入门'
      else if (value >= 60 && value < 80) text = '熟悉'
      else if (value >= 80) text = '精通 '
      return text
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
