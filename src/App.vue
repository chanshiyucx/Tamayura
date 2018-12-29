<template>
  <div id="app">
    <a
      href="https://github.com/chanshiyucx/Tamayura"
      target="_blank"
      class="github-corner"
      aria-label="View source on Github"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        :style="{
          fill: color.sidebar,
          color:'#fff',
          position: 'absolute',
          top: 0,
          border: 0,
          right: 0,
        }"
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
      :isOpen="openMenu"
      :crossIcon="false"
      @openMenu="handleOpenMenu"
      @closeMenu="handleCloseMenu"
      @readyGetPdf="readyGetPdf"
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
        :about="about"
        :education="education"
        :project="project"
        :experience="experience"
        @handleCloseMenu="handleCloseMenu"
        @reset="reset"
        @saveAll="saveAll"
        @save="save"
        @saveSetting="saveSetting"
        @back="back"
        @setColor="setColor"
        @setAbout="setAbout"
      />
    </Push>
    <div id="page-wrap" class="container">
      <div :class="['body', openMenu && 'move']">
        <div id="pdfDom" class="resume">
          <Sidebar
            :map="map"
            :hidden="hidden"
            :color="color"
            :basicInfo="basicInfo"
            :contact="contact"
            :skill="skill"
            :about="about"
          />
          <div class="main">
            <Education v-if="!hidden.education" :education="education" :color="color" />
            <Project v-if="!hidden.project" :project="project" :color="color" />
            <Experience v-if="!hidden.experience" :experience="experience" :color="color" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
<script>
import { localSave, localRead, deepCopy } from './utils/tool'
import { Footer, Edit, Push, Sidebar, Education, Project, Experience } from './components'
import content from './resume.json'
import map from './map.json'

// 个人信息
const localContent = localRead('resume') ? JSON.parse(localRead('resume')) : deepCopy(content)
const { basicInfo, contact, skill, about, education, project, experience } = localContent
// 基本配置
const setting = localRead('setting') ? JSON.parse(localRead('setting')) : deepCopy(map.setting)
const { hidden, color } = setting

export default {
  name: 'app',
  components: {
    Footer,
    Push,
    Edit,
    Sidebar,
    Education,
    Project,
    Experience
  },
  data() {
    return {
      map,
      openMenu: false,
      hidden,
      color,
      basicInfo,
      contact,
      skill,
      about,
      education,
      project,
      experience
    }
  },
  methods: {
    // 下载 PDF
    readyGetPdf() {
      const title = `${this.basicInfo.name || '百分百'}の简历`
      this.getPdf(title)
    },
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
      const copyContent = deepCopy(content)
      const copySetting = deepCopy(map.setting)
      Object.keys(copyContent).forEach(k => (this[k] = copyContent[k]))
      Object.keys(copySetting).forEach(k => (this[k] = copySetting[k]))
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
      // 剔除空项
      if (type === 'basicInfo' || type === 'contact') {
        this[type] = this[type].filter(o => !!o.type && !!o.value)
      }
      this.saveResume()
    },
    // 还原
    back() {
      this.color = deepCopy(map.setting.color)
      this.saveSetting()
    },
    // 设置颜色
    setColor({ type, color }) {
      if (type.includes('-')) {
        const typeArr = type.split('-')
        this.color[typeArr[0]][typeArr[1]] = color
      } else {
        this.color[type] = color
      }
    },
    // About
    setAbout(about) {
      this.about = about
    },
    // 保存个人信息
    saveResume() {
      // 删除无用冗余信息
      this.skill = this.skill.filter(o => o.type)
      this.skill.forEach(o => delete o.isEdit)

      const resume = {
        basicInfo: this.basicInfo,
        contact: this.contact,
        skill: this.skill,
        about: this.about,
        education: this.education,
        project: this.project,
        experience: this.experience
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
