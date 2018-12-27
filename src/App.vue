<template>
  <div id="app">
    <a
      v-if="!isReady"
      href="https://github.com/chanshiyucx/Tamayura"
      target="_blank"
      class="github-corner"
      aria-label="View source on Github"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        style="fill:#8d9cd2; color:#fff; position: absolute; top: 0; border: 0; right: 0;"
        aria-hidden="true"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          style="transform-origin: 130px 106px;"
          class="octo-arm"
        ></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"
          class="octo-body"
        ></path>
      </svg>
    </a>
    <Push
      v-if="!isReady"
      :isOpen="openMenu"
      :crossIcon="false"
      @openMenu="handleOpenMenu"
      @closeMenu="handleCloseMenu"
      @handleReady="handleReady"
      noOverlay
      pageWrapId="page-wrap"
      outerContainerId="app"
      width="400"
    >
      <Edit
        :map="map"
        :hidden="hidden"
        :color="color"
        :basicInfo="basicInfo"
        :contact="contact"
        :skill="skill"
        @handleCloseMenu="handleCloseMenu"
        @reset="reset"
        @saveAll="saveAll"
        @save="save"
        @saveSetting="saveSetting"
        @back="back"
        @setColor="setColor"
      />
    </Push>
    <div id="page-wrap" :class="['container', !isReady && 'show']">
      <div :class="['body', openMenu && 'move']">
        <div class="resume">
          <Sidebar
            :map="map"
            :hidden="hidden"
            :color="color"
            :basicInfo="basicInfo"
            :contact="contact"
            :skill="skill"
          />
          <article>555</article>
        </div>
        <Footer v-if="!isReady" />
      </div>
    </div>
  </div>
</template>
<script>
import { localSave, localRead } from './tool'
import { Sidebar, Footer, Edit, Push } from './components'
import content from './resume.json'
import map from './map.json'

const { basicInfo, contact, skill } = content
const localContent = localRead('resume') ? JSON.parse(localRead('resume')) : {}
const setting = localRead('setting') ? JSON.parse(localRead('setting')) : {}
const { hidden = { skill: false }, color } = setting

export default {
  name: 'app',
  components: {
    Push,
    Sidebar,
    Footer,
    Edit
  },
  data() {
    return {
      isReady: false,
      map,
      openMenu: false,
      hidden,
      color: color || map.setting.color,
      basicInfo: localContent.basicInfo || basicInfo,
      contact: localContent.contact || contact,
      skill: localContent.skill || skill
    }
  },
  methods: {
    // 打开菜单
    handleOpenMenu() {
      this.openMenu = true
    },
    // 关闭菜单
    handleCloseMenu() {
      this.openMenu = false
    },
    // 准备打印
    handleReady() {
      if (!this.isReady) {
        this.$dialog.confirm({
          title: '提示',
          message:
            '右键页面，选择打印，在<b>更多设置</b>里设置<b>页面边距为无</b>，勾选<b>背景图案</b>，即可保存或打印。',
          cancelText: '取消',
          confirmText: '确定',
          type: 'is-primary',
          iconPack: 'fas',
          icon: 'exclamation-circle',
          hasIcon: true,
          onConfirm: () => {
            this.isReady = true
          }
        })
      }
    },
    // 重置
    reset() {
      this.basicInfo = basicInfo
      this.contact = contact
      this.skill = skill
      this.saveAll()
    },
    // 保存所有
    saveAll() {
      this.saveResume()
      this.saveSetting()
    },
    // 保存或还原快照
    save({ type, data }) {
      this[type] = data || this[type]
      this.saveResume()
    },
    //还原
    back() {
      this.color = { ...map.setting.color }
      this.saveSetting()
    },
    // 设置颜色
    setColor({ type, color }) {
      this.color[type] = color
    },
    // 保存个人信息
    saveResume() {
      const resume = {
        basicInfo: this.basicInfo,
        contact: this.contact,
        skill: this.skill
      }
      localSave('resume', JSON.stringify(resume))
    },
    // 保存设置
    saveSetting() {
      const setting = {
        hidden: this.hidden,
        color: this.color
      }
      localSave('setting', JSON.stringify(setting))
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
