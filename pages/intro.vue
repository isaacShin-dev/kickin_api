<script setup>
import PageHeading from "~/components/common/pageHeading.vue";

const commonStore = useCommonStore();
const route_to = (path) => {commonStore.route_to(path);};
</script>

<template>
<v-container>
<page-heading title="How to Kickin" subtitle="API DOCS"/>
</v-container>
</template>

<style scoped>

</style>