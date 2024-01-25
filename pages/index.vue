<script setup >
import PageHeading from "~/components/common/pageHeading.vue";
import PageContent from "~/components/common/PageContent.vue";
import CalloutBlock from "~/components/common/CalloutBlock.vue";

const commonStore = useCommonStore()
const titles = ref([
    "Conventions",
    "JSON conventions",
    "Code samples",
    "Supported endpoints",
    "Responses",
])
const calloutContent = ref('The API is currently in beta. Although you still need to be a member in order to use The API.' +
    ' Also it may change without notice.' +
    'If you have any questions, please contact us via email.')
const route_to = (path) => {commonStore.route_to(path);};
</script>
<template>
    <v-container>
        <page-heading title="Introduction" subtitle="Kickin"/>

        <v-img src="/img/index_img_01.png" height="300" :cover="true" class="imag-filter mt-2">
            <h2 class="text-h1 font-weight-black text-center text-size-big mt-16 text-decoration-underline">Welcome.</h2>
            <div class="text-center mt-14">
            <v-btn elevation="20" @click="route_to('/intro')">Let's try NOW</v-btn>
            </div>
        </v-img>
        <p class="mt-6 text-body-1">The guide is essential for a thorough grasp of the API.</p>
        <p class="mt-6 text-body-1">Kickin is a data API that provides information on sneakers, clothing, and accessories.
            In order to use the API, you must first register as a member. After registering, you can use the API by issuing a token.
            The API is completely free to use since it's community-driven. You can contribute to the community by adding new products or updating existing products.
        </p>
        <v-sheet
            width="100%"
            class="bg-blue-grey-lighten-4 left-border mt-6">
            <v-row justify="space-around">
                <v-col class="flex-grow-0 pr-0">
                    <v-icon size="small" color="blue-grey-lighten-1">mdi-account-hard-hat-outline</v-icon>
                </v-col>
                <v-col cols="11" class="pl-0">
                    <p class="">The API is currently in beta. Although you still need to be a member in order to use The API. if this is the first time visiting, <a href="http://localhost:3000/intro">http://localhost:3000/intro</a> will be helpful Also it may change without notice. If you have any questions, please contact us via email.</p>
                </v-col>
            </v-row>
        </v-sheet>
        <h4 class="mt-6 text-h4" id="Conventions">Conventions</h4>
        <p class="mt-6 text-body-1">The API is RESTful and uses JSON as its data format. The API is designed to be simple and easy to use.
            The base URL for the API is <span class="bg-grey-lighten-5 method-pad">https://kickin.kr/api/v1</span>. All endpoints are prefixed with this URL.
            HTTPS is required for all API requests. it's following the RESTful conventions at all times and using the appropriate HTTP methods for each action.
            <span class="bg-grey-lighten-5 method-pad">GET</span>, <span class="bg-grey-lighten-5 method-pad">POST</span>, <span class="bg-grey-lighten-5 method-pad">PUT</span> and <span class="bg-grey-lighten-5 method-pad">PATCH</span> are used in the API.
            request and response bodies are formatted in JSON. The API uses the <span>application/json</span> content type for all requests and responses.
        </p>
        <h4 class="mt-6 text-h4" id="JSON conventions">JSON conventions</h4>
        <ul class="mt-6 ml-5 text-body-1">
            <li><span class="bg-grey-lighten-5 method-pad">Basic Identifiers</span>: Each sneaker is uniquely identified with an <span class="bg-grey-lighten-5 method-pad">id</span> and <span class="bg-grey-lighten-5 method-pad">uuid</span>, allowing for individual product distinction.</li>
            <li><span class="bg-grey-lighten-5 method-pad">Product Information</span>: Detailed information about the product is provided through fields such as <span class="bg-grey-lighten-5 method-pad">name</span>, <span class="bg-grey-lighten-5 method-pad">category</span> (e.g., 'shoes'), <span class="bg-grey-lighten-5 method-pad">product_type</span> (e.g., 'sneakers'), <span class="bg-grey-lighten-5 method-pad">colorway</span>, and <span class="bg-grey-lighten-5 method-pad">sku</span>.</li>
            <li><span class="bg-grey-lighten-5 method-pad">Release Information</span>: The <span class="bg-grey-lighten-5 method-pad">releaseDate</span> field indicates the release date of each product. This date is provided in the YYYY-MM-DD format.</li>
            <li><span class="bg-grey-lighten-5 method-pad">Pricing Information</span>: The <span class="bg-grey-lighten-5 method-pad">retailPrice</span> and <span class="bg-grey-lighten-5 method-pad">retailPriceKrw</span> fields represent the retail price in USD and KRW, respectively.</li>
            <li><span class="bg-grey-lighten-5 method-pad">Image Resources</span>: Fields like <span class="bg-grey-lighten-5 method-pad">imageUrl</span> and <span class="bg-grey-lighten-5 method-pad">local_imageUrl</span> provide images of each sneaker. This allows users to view the appearance of the product.</li>
        </ul>
        <h4 class="mt-6 text-h4" id="Code samples">Code samples</h4>
        <p class="mt-6 text-body-1">Example requests and responses are provided for each endpoint. These examples facilitate effortless copying, pasting, and adjusting as you develop your application.</p>
        <v-sheet
            width="100%"
            class="bg-blue-grey-lighten-4 left-border mt-6">
            <v-row justify="space-around">
                <v-col class="flex-grow-0 pr-0">
                    <v-icon size="small" color="blue-grey-lighten-1">mdi-xml</v-icon>
                </v-col>
                <v-col cols="11" class="pl-0">
                    <p class="">the Javascript SDK and Python package will be updated shortly</p>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
<page-content :titles="titles"/>
</template>
<style scoped>
.imag-filter{
    filter:grayscale(80%)
}
.text-size-big{
    font-size: 9rem !important;
    filter:grayscale(80%);
}
.method-pad{
    padding: 0.03rem 0.03rem;
}
.left-border{
    border-left: 5px solid rgb(157, 178, 191);
}
</style>
