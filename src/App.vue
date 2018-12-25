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
      <Edit :basicInfo="basicInfo" :contact="contact" />
    </Push>
    <div id="page-wrap" class="container">
      <div :class="['body', openMenu && 'move']">
        <div class="resume">
          <Sidebar :basicInfo="basicInfo" :contact="contact" />
          <article>555</article>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
<script>
import { Sidebar, Footer, Edit, Push } from './components'
import content from './resume.json'
const { basicInfo, contact } = content
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
      openMenu: false,
      basicInfo,
      contact
    }
  },
  methods: {
    handleOpenMenu() {
      this.openMenu = true
    },
    handleCloseMenu() {
      this.openMenu = false
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
