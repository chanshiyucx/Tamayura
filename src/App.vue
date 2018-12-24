<template>
  <div id="app">
    <Push
      :isOpen="openMenu"
      @openMenu="handleOpenMenu"
      @closeMenu="handleCloseMenu"
      noOverlay
      pageWrapId="page-wrap"
      outerContainerId="app"
      width="400"
    />
    <div id="page-wrap" class="container">
      <div :class="['resume', openMenu && 'move']">
        <Sidebar :basicInfo="basicInfo" :contact="contact" />
        <article>555</article>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script>
import { Push } from 'vue-burger-menu'
import { Sidebar, Footer } from './components'
import content from './resume.json'
const { basicInfo, contact } = content
export default {
  name: 'app',
  components: {
    Push,
    Sidebar,
    Footer
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
