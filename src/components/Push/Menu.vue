<template>
  <div>
    <div id="sideNav" class="bm-menu">
      <nav class="bm-item-list"><slot></slot></nav>
      <span class="bm-cross-button cross-style" @click="closeMenu" :class="{ hidden: !crossIcon }">
        <span
          v-for="(x, index) in 2"
          :key="x"
          class="bm-cross"
          :style="{
            position: 'absolute',
            width: '3px',
            height: '14px',
            transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)'
          }"
        >
        </span>
      </span>
    </div>

    <div class="bm-burger-button" @click="openMenu" :class="{ hidden: !burgerIcon }">
      <a class="button is-primary is-focused is-rounded">
        <span class="icon is-small"><i class="fas fa-user-edit"></i> </span> <span>编辑</span>
      </a>
    </div>

    <div class="bm-burger-ready" @click="handleReady">
      <a class="button is-info is-focused is-rounded is-success">
        <span class="icon is-small"><i class="fas fa-download"></i> </span> <span>打印</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menubar',
  data() {
    return {
      isSideBarOpen: false
    }
  },
  props: {
    isOpen: {
      type: Boolean,
      required: false
    },
    right: {
      type: Boolean,
      required: false
    },
    width: {
      type: [String],
      required: false,
      default: '300'
    },
    disableEsc: {
      type: Boolean,
      required: false
    },
    noOverlay: {
      type: Boolean,
      required: false
    },
    onStateChange: {
      type: Function,
      required: false
    },
    burgerIcon: {
      type: Boolean,
      required: false,
      default: true
    },
    crossIcon: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    openMenu() {
      this.$emit('openMenu')
      this.isSideBarOpen = true
      if (!this.noOverlay) {
        document.body.className += 'bm-overlay'
      }
      if (this.right) {
        document.querySelector('.bm-menu').style.left = 'auto'
        document.querySelector('.bm-menu').style.right = '0px'
      }
      this.$nextTick(function() {
        document.getElementById('sideNav').style.width = this.width ? this.width + 'px' : '300px'
      })
    },
    closeMenu() {
      this.$emit('closeMenu')
      this.isSideBarOpen = false
      document.body.className = document.body.className.replace('bm-overlay', '')
      document.getElementById('sideNav').style.width = '0px'
    },
    closeMenuOnEsc(e) {
      e = e || window.event
      if (e.key === 'Escape' || e.keyCode === 27) {
        document.getElementById('sideNav').style.width = '0px'
        document.body.style.backgroundColor = 'inherit'
        this.isSideBarOpen = false
      }
    },
    handleReady() {
      this.$emit('handleReady')
    }
  },
  mounted() {
    if (!this.disableEsc) {
      document.addEventListener('keyup', this.closeMenuOnEsc)
    }
  },
  destroyed: function() {
    document.removeEventListener('keyup', this.closeMenuOnEsc)
  },
  watch: {
    isOpen: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (!oldValue && newValue) {
          this.openMenu()
        }
        if (oldValue && !newValue) {
          this.closeMenu()
        }
      }
    },
    right: {
      deep: true,
      immediate: true,
      handler(oldValue, newValue) {
        if (oldValue) {
          this.$nextTick(() => {
            document.querySelector('.bm-burger-button').style.left = 'auto'
            document.querySelector('.bm-burger-button').style.right = '36px'
            document.querySelector('.bm-menu').style.left = 'auto'
            document.querySelector('.bm-menu').style.right = '0px'
          })
        }
        if (newValue) {
          if (document.querySelector('.bm-burger-button').hasAttribute('style')) {
            document.querySelector('.bm-burger-button').removeAttribute('style')
            document.getElementById('sideNav').style.right = 'auto'
          }
        }
      }
    }
  }
}
</script>

<style>
@import './index.less';
</style>
