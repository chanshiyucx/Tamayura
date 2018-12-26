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
    <!-- 主题设置 Theme -->
    <b-collapse class="card" :open.sync="isOpen.theme">
      <div class="card-header" slot="trigger">
        <p class="card-header-title">
          <b-icon pack="fas" icon="palette" size="is-small"> </b-icon>主题设置
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="isOpen.theme ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <ul>
          <li class="setting-item">
            <span>背景色：</span>
            <span class="color-box" :style="{ backgroundColor: color.sidebar }"></span>
          </li>
        </ul>

        <Sketch v-model="pickColor" />
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="saveSetting">保存</a>
        <a class="card-footer-item" @click="back">还原</a>
      </footer>
    </b-collapse>
    <!-- 基本信息 BasicInfo -->
    <b-collapse class="card" :open.sync="isOpen.basicInfo">
      <div class="card-header" slot="trigger">
        <p class="card-header-title">
          <b-icon pack="fas" icon="user" size="is-small"> </b-icon>基本信息
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="isOpen.basicInfo ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div v-for="(item, i) in getBasicInfoList" :key="i">
          <b-field>
            <b-input
              v-model="basicInfo[item.key]"
              :placeholder="`${item.label}（不填则不显示该栏）`"
              :icon-pack="item.pack"
              :icon="item.icon"
              :disabled="!isEdit.basicInfo"
            >
            </b-input>
          </b-field>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('basicInfo')">保存</a>
        <a class="card-footer-item" @click="edit('basicInfo')">
          {{ isEdit.basicInfo ? '取消' : '编辑' }}
        </a>
      </footer>
    </b-collapse>
    <!-- 联系方式 Contact -->
    <b-collapse class="card" :open.sync="isOpen.contact">
      <div class="card-header" slot="trigger">
        <p class="card-header-title">
          <b-icon pack="fas" icon="mobile-alt" size="is-small"> </b-icon>联系方式
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="isOpen.contact ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div v-for="(item, i) in getContactList" :key="i">
          <b-field>
            <b-input
              v-model="contact[item.key]"
              :placeholder="`${item.label}（不填则不显示该栏）`"
              :icon-pack="item.pack"
              :icon="item.icon"
              :disabled="!isEdit.contact"
            >
            </b-input>
          </b-field>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('contact')">保存</a>
        <a class="card-footer-item" @click="edit('contact')">
          {{ isEdit.contact ? '取消' : '编辑' }}
        </a>
      </footer>
    </b-collapse>
    <!-- 技能树 Skill -->
    <b-collapse class="card" :open.sync="isOpen.skill">
      <div class="card-header" slot="trigger">
        <p class="card-header-title">
          <b-icon pack="fab" icon="empire" size="is-small"> </b-icon>技能树
        </p>
        <a class="card-header-icon">
          <b-icon pack="fas" :icon="isOpen.skill ? 'angle-down' : 'angle-up'" size="is-small">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="skill-item" v-for="(item, i) in skill" :key="i">
          <div class="skill-name">{{ item.name }}</div>
          <vue-slider
            v-if="isOpen.skill"
            v-model="item.proficiency"
            tooltip="hover"
            :width="190"
            :disabled="!isEdit.skill"
            :formatter="formatter"
            :processStyle="{
              backgroundImage: '-webkit-linear-gradient(left, #ff8dde, #3498db)'
            }"
            :tooltipStyle="{
              backgroundColor: 'rgba(200, 82, 235, 0.6)',
              borderColor: 'rgba(200, 82, 235, 0.6)',
              borderWidth: 0
            }"
          ></vue-slider>
          <div class="skill-precent">{{ item.proficiency }}%</div>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="save('skill')">保存</a>
        <a class="card-footer-item" @click="edit('skill')">
          {{ isEdit.skill ? '取消' : '编辑' }}
        </a>
        <a class="card-footer-item" @click="toggleHidden('skill')">
          {{ hidden.skill ? '显示' : '隐藏' }}
        </a>
      </footer>
    </b-collapse>
  </div>
</template>
<script>
import vueSlider from 'vue-slider-component'
import { Sketch } from 'vue-color'

export default {
  name: 'Edit',
  components: {
    vueSlider,
    Sketch
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
    return {
      isEdit: {
        basicInfo: false,
        contact: false,
        skill: false
      },
      isOpen: {
        theme: false,
        basicInfo: false,
        contact: false,
        skill: false
      },
      colorType: 'sidebar',
      pickColor: {
        hex: '#8d9cd2',
        hsl: { h: 227, s: 0.43, l: 0.69, a: 1 },
        hsv: { h: 227, s: 0.33, v: 0.82, a: 1 },
        rgba: { r: 141, g: 156, b: 210, a: 1 },
        a: 1
      },
      // 快照
      snapshot: {}
    }
  },
  computed: {
    getBasicInfoList() {
      const link = this.map.basicInfo
      return Object.keys(this.basicInfo).map(k => ({
        key: k,
        label: link[k].label,
        icon: link[k].icon,
        pack: link[k].pack || 'fas',
        value: this.basicInfo[k]
      }))
    },
    getContactList() {
      const link = this.map.contact
      return Object.keys(this.contact).map(k => ({
        key: k,
        label: link[k].label,
        icon: link[k].icon,
        pack: link[k].pack || 'fas',
        value: this.contact[k]
      }))
    }
  },
  watch: {
    pickColor(val) {
      // console.log('val-->', val, shadeBlendConvert(-0.5, val.hex, 'c'))
      this.$emit('setColor', { type: this.colorType, color: val.hex8 })
    }
  },
  created() {
    const props = ['basicInfo', 'contact', 'skill']
    props.forEach(k => this.takeSnapShot(k))
  },
  methods: {
    // 保存快照
    takeSnapShot(type) {
      this.snapshot[type] = JSON.parse(JSON.stringify(this[type]))
    },
    // 关闭编辑菜单
    handleClose() {
      this.$emit('handleCloseMenu')
    },
    // 重置信息
    reset() {
      this.dialog({
        message: '是否将所有信息重置为 <b>初始状态</b> 喵？若如此则将清空已保存信息。',
        callback: () => {
          this.$emit('reset')
          this.$toast.open({
            message: '重置成功!',
            type: 'is-success'
          })
        }
      })
    },
    // 保存所有信息
    saveAll() {
      this.$emit('saveAll')
    },
    // 保存
    save(type) {
      this.$emit('save', { type })
      this.isEdit[type] = false
      this.snackbarMsg()
    },
    // 保存设置
    saveSetting() {
      this.$emit('saveSetting')
      this.snackbarMsg()
    },
    // 还原
    back() {
      this.dialog({
        message: '是否将所有主题配置还原为 <b>初始状态</b> 喵？若如此则将清空已保存设置。',
        callback: () => {
          this.$emit('back')
          this.$toast.open({
            message: '还原成功!',
            type: 'is-success'
          })
        }
      })
    },
    // 编辑
    edit(type) {
      this.isEdit[type] = !this.isEdit[type]
      if (!this.isEdit[type]) {
        // 还原上一次快照
        this.$emit('save', { type, data: this.snapshot[type] })
      } else {
        this.takeSnapShot(type)
      }
    },
    // 显示/隐藏
    toggleHidden(type) {
      this.hidden[type] = !this.hidden[type]
      if (type !== 'basicInfo' && type !== 'contact') {
        this.$emit('saveSetting')
      }
    },
    // 技能进度格式化
    formatter(value) {
      let tip = ''
      if (value < 20) tip = '萌新'
      else if (value >= 20 && value < 40) tip = '了解'
      else if (value >= 40 && value < 60) tip = '入门'
      else if (value >= 60 && value < 80) tip = '熟悉'
      else if (value >= 80) tip = '精通 '
      return tip
    },
    // 消息提示
    snackbarMsg() {
      this.$snackbar.open({
        duration: 2000,
        message: '保存成功！o(*￣▽￣*)ブ',
        type: 'is-success',
        position: 'is-bottom-left',
        actionText: 'OK',
        queue: false
      })
    },
    // 确认弹窗
    dialog({ message, callback }) {
      this.$dialog.confirm({
        title: '提示',
        message,
        cancelText: '取消',
        confirmText: '确定',
        type: 'is-danger',
        iconPack: 'fas',
        icon: 'exclamation-circle',
        hasIcon: true,
        onConfirm: callback
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './index.less';
</style>
