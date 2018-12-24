<template>
  <div id="app">
    <div class="container">
      <div class="resume">
        <Sidebar />
        <article>555</article>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { Sidebar, Footer } from './components'
export default {
  name: 'app',
  components: {
    Sidebar,
    Footer
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
