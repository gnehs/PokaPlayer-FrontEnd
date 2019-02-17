<template>
  <div>
    <headerWrapper :title="$t('artist')"/>
  </div>
</template>

<script>
import headerWrapper from "@/components/header-wrapper";
export default {
  name: "Artist",
  components: {
    headerWrapper
  },
  data() {
    return {};
  }
};
</script>