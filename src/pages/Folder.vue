<template>
  <div>
    <headerWrapper :title="$t('folder')"/>
  </div>
</template>

<script>
import headerWrapper from "@/components/header-wrapper";
export default {
  name: "Folder",
  components: {
    headerWrapper
  },
  data() {
    return {};
  }
};
</script>