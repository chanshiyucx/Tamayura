<template>
  <div id="app">
    <Push
      :isOpen="openMenu"
      :crossIcon="false"
      @openMenu="handleOpenMenu"
      @closeMenu="handleCloseMenu"
      noOverlay
      pageWrapId="page-wrap"
      outerContainerId="app"
      width="400"
    >
      <Edit
        :map="map"
        :hidden="hidden"
        :basicInfo="basicInfo"
        :contact="contact"
        :skill="skill"
        @closeMenu="handleCloseMenu"
        @save="save"
        @reset="reset"
        @toggleHidden="toggleHidden"
      />
    </Push>
    <div id="page-wrap" class="container">
      <div :class="['body', openMenu && 'move']">
        <div class="resume">
          <Sidebar
            :map="map"
            :hidden="hidden"
            :basicInfo="basicInfo"
            :contact="contact"
            :skill="skill"
          />
          <article>555</article>
        </div>
        <Footer />
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

export default {
  name: 'app',
  components: {
    Push,
    Sidebar,
    Footer,
    Edit
  },
  data() {
    const localContent = localRead('resume') ? JSON.parse(localRead('resume')) : {}
    const setting = localRead('setting') ? JSON.parse(localRead('setting')) : {}
    const { hidden = { skill: false } } = setting
    return {
      map,
      openMenu: false,
      hidden,
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
    // 重置
    reset() {
      this.basicInfo = basicInfo
      this.contact = contact
      this.saveAll()
    },
    // 保存所有
    saveAll() {
      const resume = {
        basicInfo: this.basicInfo,
        contact: this.contact
      }
      localSave('resume', JSON.stringify(resume))
    },
    // 保存
    save({ type, data }) {
      this[type] = data
      this.saveAll()
    },
    // 显示/隐藏
    toggleHidden({ type, hidden }) {
      this.hidden[type] = hidden
      this.saveSetting()
    },
    // 保存设置
    saveSetting() {
      const setting = {
        hidden: this.hidden
      }
      localSave('setting', JSON.stringify(setting))
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
