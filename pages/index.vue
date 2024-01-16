<script setup >
import PageHeading from "~/components/common/pageHeading.vue";

const commonStore = useCommonStore()
const route_to = (path) => {commonStore.route_to(path);};
</script>
<template>
    <v-container>
        <page-heading title="Kickin" subtitle="INTRODUCTION"/>

        <v-img src="/img/index_img_01.png"height="300" cover="true" class="imag-filter">
            <h2 class="text-h1 font-weight-black text-center text-size-big mt-16 text-decoration-underline">Welcome.</h2>
            <div class="text-center mt-14">
            <v-btn elevation="10" @click="route_to('/intro')">Let's try NOW</v-btn>
            </div>
        </v-img>
        <p class="mt-6 text-h6 text-center  font-weight-bold">
            Kickin is a <span class="underline-red">community</span> built <span class="underline-red">data API</span> that provides database about sneakers, clothing, and accessories.
            You can contribute to the community by adding new products or updating existing products.
            Kickin API is absolutely free to use all you need is to sign up and get your API key.
        </p>
        <h3 class="text-h5 border-left mt-3 bg-grey-lighten-2 px-3 py-1">Explore millions of sneakers, clothing, and accessories now </h3>
        <div class="h3-container mt-2  ">
            <h3 class="text-h5 border-right mt-1 bg-grey-lighten-2 px-3 py-1">Contribute to the community by adding new products or updating existing products. </h3>
        </div>
    </v-container>

</template>
<style scoped>
.border-left{
    border-left: 7px solid #365486;
    padding-left: 12px;
    display: inline-block;
}
.border-right{
    border-right: 7px solid #365486;
    padding-right: 12px;
    display: inline-block;
}
.imag-filter{
    filter:grayscale(80%)
}
.text-size-big{
    font-size: 9rem !important;
    filter:grayscale(80%);
}
.h3-container {
    display: flex;
    justify-content: flex-end;
}
.underline-red{
border-bottom: solid 2px #dc2828;
}

</style>
