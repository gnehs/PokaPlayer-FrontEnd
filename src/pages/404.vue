<template>
  <Teleport to="#header-center">
    <p> {{ $t('404.title') }} </p>
  </Teleport>
  <empty-state
    :title="$t('404.title')"
    :description="$t('404.description')">
    <i class='bx bx-error'></i>
  </empty-state>
</template>