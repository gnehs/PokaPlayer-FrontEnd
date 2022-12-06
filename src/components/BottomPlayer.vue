<template>
  <div class="bottom-player">
    <div class="track-info">
      <div class="cover">
        <img src="/img/cover.jpg" alt="cover" />
      </div>
      <div class="track-info-text">
        <div class="track-name">Track Name</div>
        <div class="track-artist">Track Artist</div>
      </div>
    </div>
    <div class="track-control">track-control</div>
    <div class="player-control">player-control</div>
  </div>
</template>
<style lang="sass" scoped>
.bottom-player
  padding: calc(var(--padding) / 2)
  display: grid
  grid-template-columns: 1fr 250px 1fr
  @media screen and (max-width: 768px)
    grid-template-columns: 1fr auto
    .player-control
      display: none
  .track-info
    display: flex
    .cover
      display: flex
      align-items: center
      justify-content: center

      --cover-size: 64px
      width: var(--cover-size)
      height: var(--cover-size)
      img
        width: var(--cover-size)
        height: var(--cover-size)
        border-radius: var(--border-radius)
        object-fit: cover
      display: flex
      flex-direction: column
      justify-content: center
      margin-left: calc(var(--padding) / 2)
    .track-info-text
      margin-left: var(--padding)
      display: flex
      flex-direction: column
      justify-content: center
      .track-name
        font-size: 18px
        font-weight: 700
      .track-artist
        font-size: 18px
        color: var(--text-color)
        opacity: .75
  .track-control
  .player-control
</style>