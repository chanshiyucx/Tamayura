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
        <Sidebar />
        <article>555</article>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { Push } from 'vue-burger-menu'
import { Sidebar, Footer } from './components'
export default {
  name: 'app',
  components: {
    Push,
    Sidebar,
    Footer
  },
  data() {
    return {
      openMenu: false
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
