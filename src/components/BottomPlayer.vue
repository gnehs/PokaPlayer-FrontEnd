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

      --cover-size: calc(var(--padding) * 5 + 24px)
      width: var(--cover-size)
      height: var(--cover-size)
      display: flex
      flex-direction: column
      justify-content: center
      margin-left: calc(var(--padding) / 2)

      @media (max-width: 768px)
        --cover-size: calc(var(--padding) * 3.5 + 24px)
      img
        width: var(--cover-size)
        height: var(--cover-size)
        border-radius: var(--border-radius)
        object-fit: cover
    .track-info-text
      margin-left: var(--padding)
      display: flex
      flex-direction: column
      justify-content: center
      font-size: 18px
      @media (max-width: 768px)
        font-size: 16px
      .track-name
        font-weight: 700
      .track-artist
        color: var(--text-color)
        opacity: .75
  .track-control
  .player-control
</style>