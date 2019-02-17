<template>
  <div>
    <headerWrapper :title="$t('composer')"/>
  </div>
</template>

<script>
import headerWrapper from "@/components/header-wrapper";
export default {
  name: "Composer",
  components: {
    headerWrapper
  },
  data() {
    return {};
  }
};
</script>