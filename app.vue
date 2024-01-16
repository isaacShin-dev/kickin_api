<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" mobile-breakpoint="md">
                <v-row align-content="center" justify="center">
                    <v-col cols="4">
                        <v-img src="/img/logo.png" class="app-logo-img"></v-img>
                    </v-col>
                    <v-col cols="8" align-self="center">
                        <v-list-item-title class="text-h5 main-title">Kickin.</v-list-item-title>
                        <v-list-item-subtitle>kicks Data Api</v-list-item-subtitle>
                    </v-col>
                </v-row>
            <v-list-item class="">
                <v-row align="center">
                    <v-col cols="9">
                        <v-btn size="small"
                               prepend-icon="mdi-magnify"
                               :ripple="false"
                               variant="tonal">Search req... <span class="search-btn-k">⌘</span> <span class="search-btn-k">K</span>
                            <v-dialog
                                v-model="dialog"
                                activator="parent"
                                width="auto"
                            >
                                <v-card width="650">
                                    <v-card-text>
                                        <v-text-field
                                            label="Search"
                                            solo-inverted
                                            hide-details
                                            prepend-inner-icon="mdi-magnify"
                                        ></v-text-field>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-btn>
                    </v-col>
                    <v-col cols="3">
                        <v-btn
                            @click="toggleTheme"
                            size="x-small"
                            icon="mdi-theme-light-dark"
                            variant="plain"
                            class="mb-1"/>
                    </v-col>
                </v-row>
            </v-list-item>
            <v-divider></v-divider>
            <v-list v-model:opened="open">
                <v-list-item @click="route_to('/')" title="What is Kickin?">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-lightbulb-question-outline"></v-icon>
                    </template>
                </v-list-item>
                <v-list-group value="Api Docs">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon="mdi-api"
                            title="Api Docs"
                        ></v-list-item>
                    </template>
                        <v-list-item @click="route_to('intro')">Getting started</v-list-item>
                        <v-list-group value="Requests">
                            <template v-slot:activator="{ props }">
                                <v-list-item
                                    v-bind="props"
                                    title="Requests"
                                ></v-list-item>
                            </template>
                            <v-list-item
                                v-for="([title, icon], i) in cruds"
                                :key="i"
                                :value="title"
                                :title="title"
                                :prepend-icon="icon"
                                class="list-child"
                            ></v-list-item>

                        </v-list-group>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar class=" d-flex d-md-none">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-nav-icon><img src="/img/logo.png" style="height: 50px; border-radius: 100%"></img></v-app-bar-nav-icon>
            <v-app-bar-title class="text-h5 main-title">Kickin.</v-app-bar-title>
            <v-spacer></v-spacer>

            <v-btn icon @click="dialog=true">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon @click="toggleTheme">
                <v-icon>mdi-theme-light-dark</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
            <NuxtPage />
        </v-main>
        <v-footer  elevation="5" class="d-none d-md-flex" >
            <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="9" align-self="center">
                    <v-row>
                        <v-col>
                            <v-list>
                                <v-list-item-title class="font-weight-black">What is Kickin?</v-list-item-title>
                                <v-list-item ><span class="footer-list-item">About Kickin</span></v-list-item>
                                <v-list-item ><span class="footer-list-item">Contact</span></v-list-item>
                                <v-list-item ><span class="footer-list-item">APIs</span></v-list-item>
                            </v-list>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col>
                            <v-list>
                                <v-list-item-title class="font-weight-black">What is Kickin?</v-list-item-title>
                                <v-list-item ><span class="footer-list-item">About Kickin</span></v-list-item>
                                <v-list-item ><span class="footer-list-item">Contact</span></v-list-item>
                                <v-list-item ><span class="footer-list-item">APIs</span></v-list-item>
                            </v-list>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col>
                            <v-list>
                                <v-list-item-title class="font-weight-black">What is Kickin?</v-list-item-title>
                                <v-list-item ><span class="footer-list-item">About Kickin</span></v-list-item>
                                <v-list-item ><span class="footer-list-item">Contact</span></v-list-item>
                                <v-list-item ><span class="footer-list-item">APIs</span></v-list-item>
                            </v-list>
                        </v-col>
                        <v-col cols="4">
                            <v-list-item-title class="text-h5 main-title">Kickin.</v-list-item-title>
                            <v-list-item-subtitle>kicks Data Api</v-list-item-subtitle>
                            <v-list-item-media>
                                <v-img src="/img/logo.png" class="app-logo-img"></v-img>
                            </v-list-item-media>
                            <v-list-item-action>
                                <v-btn size="small" color="#365486" class="">Join Now</v-btn>
                            </v-list-item-action>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>
<script setup >
import { ref, onMounted, onUnmounted} from 'vue'
import { useTheme } from 'vuetify'

const commonStore = useCommonStore()
const theme = useTheme();
const router = useRouter();
const drawer = ref(null);
const dialog = ref(false);
const open = ref(['Users']);
const cruds = ref(
    [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
    ]
);

const route_to = (path) => {commonStore.route_to(path);};
const openDialogOnCommandK = (event) => {
    if (event.metaKey && event.key.toLowerCase() === 'k') {
        dialog.value = true
    }
};
const toggleTheme = () => {
    const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    localStorage.setItem('theme', newTheme);
    commonStore.theme = newTheme;
};
onMounted(() => {
    window.addEventListener('keydown', openDialogOnCommandK)
    const preperTheme = localStorage.getItem('theme');
    if (preperTheme) {
        theme.global.name.value = preperTheme;
        commonStore.theme = preperTheme;
    }
});

onUnmounted(() => {
    window.removeEventListener('keydown', openDialogOnCommandK)
});
</script>

<script>
export default {
    data: () => ({ drawer: null }),
}
</script>

<style>

.app-logo-img{
    border-radius: 150%;
    width: 50px;
    margin:15px 15px ;
}
.main-title{
    font-weight: bolder !important;
    font-size: 1.5rem !important;
    letter-spacing: 5px !important;
}
.search-btn-k{
    font-size: 0.8rem !important;
    font-weight: bolder !important;
    letter-spacing: 1px !important;
    border-radius: 10%;
    padding: 1px 1px;
    background-color: #b5b5b5;
    margin: 0 3px;
}
.footer-list-item{
    cursor: pointer  ;
}
.footer-list-item:hover{
    color: #b5b5b5;
}
.list-child{
    padding-left: 104px !important;
}
</style>