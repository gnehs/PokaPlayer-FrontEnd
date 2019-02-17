<template>
  <div>
    <headerWrapper :title="$t('album')"/>
  </div>
</template>

<script>
import headerWrapper from "@/components/header-wrapper";
export default {
  name: "Album",
  components: {
    headerWrapper
  },
  data() {
    return {};
  }
};
</script>