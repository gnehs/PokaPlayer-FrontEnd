<template>
  <div :is="tag" @click="click">
    <slot />
  </div>
</template>
<script>
const elements = {}

export default {
  name: 'overdrive',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    id: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      duration: 400
    }
  },
  methods: {
    // Get style for cloned element
    getClonedStyles(node) {
      const rect = node.getBoundingClientRect()
      const computedStyle = window.getComputedStyle(node)
      const marginTop = parseInt(computedStyle.marginTop, 10)
      const marginLeft = parseInt(computedStyle.marginLeft, 10)
      return {
        top: `${rect.top + marginTop}px`,
        left: `${rect.left + marginLeft}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        borderRadius: computedStyle.borderRadius,
        position: 'absolute'
      }
    },

    // Save element position and dom
    saveElement() {
      elements[this.id] = {
        el: this.$slots.default,
        pos: this.getClonedStyles(this.$el.firstChild),
        time: null
      }
    },

    //
    cloneAndAppend() {
      const { el, pos } = elements[this.id]
      const oldClone = document.querySelector(`[data-clone="${this.id}"]`)
      if (oldClone) {
        document.body.removeChild(clone)
      }
      const clone = el[0].elm.cloneNode(true)
      clone.setAttribute('data-clone', this.id)
      Object.assign(clone.style, pos)
      document.body.appendChild(clone)
    },

    // Animate
    async animate() {
      let clonedElement = document.querySelector(`[data-clone="${this.id}"]`)
      let targetElement = this.$el.firstChild
      let clonedPosition = this.getClonedStyles(clonedElement)
      let targetPosition = this.getClonedStyles(targetElement)
      targetElement.style.opacity = 0
      clonedElement.style.width = targetPosition.width
      clonedElement.style.height = targetPosition.height
      clonedElement.style.minHeight = '100px'
      clonedElement.style.top = targetPosition.top
      clonedElement.style.left = targetPosition.left
      clonedElement.style.transition = this.duration / 1000 + 's cubic-bezier(1,.14,0,.95)'

      let i = setInterval(_ => {
        clonedPosition = this.getClonedStyles(clonedElement)
        targetPosition = this.getClonedStyles(targetElement)
        clonedElement.style.top = targetPosition.top
        clonedElement.style.left = targetPosition.left
        clonedElement.style.width = targetPosition.width
        clonedElement.style.height = targetPosition.height
      }, 20)
      setTimeout(_ => {
        clearInterval(i)
        targetElement.style.opacity = 1
      }, this.duration)
    },

    handleMatch() {
      this.cloneAndAppend()
      this.$nextTick(() => {
        this.animate()
        const clone = document.querySelector(`[data-clone="${this.id}"]`)
        setTimeout(_ => {
          document.body.removeChild(clone)
        }, this.duration)
      })
    },
    click() {
      elements[this.id].time = new Date().getTime()
    }
  },
  mounted() {
    const matchElement = elements[this.id]
    // If element matched and doesn't exceed 500ms
    if (matchElement && new Date().getTime() - matchElement.time < 300 && matchElement.time != null) {
      this.handleMatch()
    } else {
      this.saveElement()
    }
  }
}
</script>
