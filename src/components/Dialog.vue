<template>
  <Teleport to="body">
    <transition name="modal">
      <div class="modal-mask" v-if="modelValue" @click="$emit('update:modelValue', false)">
        <div class="modal-wrapper">
          <div class="modal-container" @click.stop="">
            <div class="close" @click="$emit('update:modelValue', false)" v-if="showClose">
              <i class="bx bx-x"></i>
            </div>
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script >
export default {
  props: {
    modelValue: {
      type: Boolean
    },
    showClose: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass">

.modal-mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  overflow: hidden
  background-color: rgba(0, 0, 0, 0.75)
  display: table
  transition: opacity 0.3s ease
  font-size: 14px
  color: #000
  cursor: pointer
.modal-wrapper
  display: grid
  place-content: center
  height: 100vh
  height: 100svh
  line-break: anywhere
.modal-container
  max-height: calc(100svh - 60px)
  overflow-y: auto
  overflow-x: hidden
  cursor: default
  width: 600px
  max-width: min(700px, calc(100vw - 60px))
  margin: 0px auto
  padding: calc(var(--padding) * 2)
  background-color: var(--background-layer-1)
  border-radius: var(--border-radius)
  box-shadow: var(--box-shadow)
  transition: all var(--transition)
  position: sticky
  top: 0
  position: relative
  .modal-iframe
    height: 100%
    height: calc(100svh - 80px)
    width: calc(100% + 16px * 2)
    margin: -16px
  .close
    position: sticky
    cursor: pointer
    --size: 36px
    transition: all .2s ease
    font-size: var(--size)
    z-index: 1
    // width: var(--size)
    height: var(--size)
    display: flex
    justify-content: flex-end
    align-items: center
    margin-bottom: calc(var(--size) * -1 )
    i
      background: #333
      color: #fff
      border-radius: 100em
    @media screen and (max-width: 768px)
      --size: 24px
    &:hover
      cursor: pointer
      opacity: .8
    &:active
      opacity: .6

// animation
.modal-enter-from, .modal-leave-to
  opacity: 0

.modal-enter-active .modal-container

  transform: scale(.9)
.modal-leave-active .modal-container
  transform: scale(1.1)
</style>