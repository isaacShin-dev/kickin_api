<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" mobile-breakpoint="md"
                             class="height-75" :floating="true" :scrim="false" elevation="0" >
                <v-row align-content="center" justify="center" class="logo-responsive">
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
                    <v-col cols="8">
                        <v-btn size="small"
                               prepend-icon="mdi-magnify"
                               :ripple="false"
                               variant="tonal">Jump to <span class="search-btn-k ml-5">⌘</span> <span class="search-btn-k">K</span>
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
                    <v-col cols="2">
                        <v-btn
                            @click="toggleTheme"
                            size="x-small"
                            icon="mdi-theme-light-dark"
                            variant="plain"
                            :ripple="false"
                            class="mb-1"/>
                    </v-col>
                    <v-col cols="1">
                        <v-btn
                            size="x-small"
                            icon="mdi-login"
                            variant="plain"
                            :ripple="false"
                            class="mb-1"/>
                    </v-col>
                </v-row>
            </v-list-item>
            <v-divider></v-divider>
            <v-list  density="compact">
                <span class="ml-4 text-subtitle-2" style="border-bottom: #979595 1px solid">KICKIN. DATA API</span>
                <div v-for="(item, idx) in menuItems" :key="item.id" class="">
                    <p v-if="item.type === 'link'" @click="route_to(item.to); resetAndSetCurrent(item)"
                       class="link-padding text-body-2  list-item-cursor"  :class="{ current: item.current }">
                        <v-icon size="x-small" class="mx-1">{{item.icon}}</v-icon>{{item.title}}</p>
                    <div v-else-if="item.type==='toggle'" class="toggle-margin mr-1 text-body-2">
                        <p @click="toggleSubMenu(item)" class="list-item-cursor" :class="{ current: item.current }">
                            <v-icon v-if="item.opened">mdi-chevron-down</v-icon>
                            <v-icon v-else>mdi-chevron-right</v-icon>{{item.title}}</p>
                        <div v-if="item.opened">
                            <p v-for="(subItem, idx) in item.subMenu" :key="subItem.id"
                               @click="route_to(subItem); resetAndSetCurrent(subItem, item)"
                               class="list-item-cursor sub-group-wrapper" :class="{ current: subItem.current }">
                                <span class=" text-body-2">{{ subItem.title }}</span>
                                <v-chip size="x-small" tonal class="mr-1 font-weight-bold"
                                        :color="subItem.color">{{ subItem.method }}</v-chip>
                            </p>
                        </div>
                    </div>
                </div>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar :floating="true" elevation="0">
          <v-app-bar-nav-icon @click="drawer = !drawer" density="compact" :slim="true" :ripple="false" class="d-flex d-md-none"></v-app-bar-nav-icon>
          <v-row align-content="start" justify="start" class="d-flex d-md-none">
            <v-col cols="2" class="d-none d-flex-sm">
              <v-img src="/img/logo.png" class="app-logo-img"></v-img>
            </v-col>
            <v-col cols="4" sm="6" align-self="center" class="d-none d-flex-sm">
              <v-list-item-title class="text-h5 main-title">Kickin.</v-list-item-title>
              <v-list-item-subtitle>kicks Data Api</v-list-item-subtitle>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog=true" size="small"><v-icon>mdi-magnify</v-icon></v-btn>
          <v-btn icon @click="toggleTheme" size="small"><v-icon>mdi-theme-light-dark</v-icon></v-btn>
          <v-btn v-if="!loginStatus" icon @click="route_to('/account/login')" size="small"><v-icon>mdi-login</v-icon></v-btn>
<!--          <v-btn icon v-else @click="route_to('/account/profile')"><v-icon>mdi-account-circle-outline</v-icon></v-btn>-->
          <v-menu v-else>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-account-circle-outline" v-bind="props"></v-btn>
            </template>

            <v-list density="compact">
              <v-list-item @click="route_to('/account/profile')"><v-list-item-title>profile</v-list-item-title></v-list-item>
              <v-list-item @click="logout"><v-list-item-title>logout</v-list-item-title></v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
        <v-main>
            <v-container class="xlg-max-w">
            <NuxtPage />
            </v-container>
        </v-main>
        <v-footer  class="d-none d-md-flex" style="z-index: 999;">
            <v-row justify="space-between" align="center" class="">
              <v-col cols="1" sm="2">
                <v-spacer></v-spacer>
              </v-col>
                <v-col class="my-5" cols="3">
                  <div align="center" justify="center">
                    <p class="text-overline">Kickin.</p>
                    <p class="text-overline">kicks Data Api</p>
                    <v-img src="/img/logo.png" class="app-logo-img"></v-img>
                    <v-btn size="small" color="#365486" class="text-button">Join Now</v-btn>
                  </div>
                </v-col>
                <v-col>
                    <v-list-item-title class="text-h6 mt-9">Kickin API</v-list-item-title>
                    <v-list-item-subtitle class="text-body-2 list-item-cursor mt-3">Getting started</v-list-item-subtitle>
                    <v-list-item-subtitle class="text-body-2 list-item-cursor mt-2">End Points</v-list-item-subtitle>
                    <v-list-item-subtitle class="text-body-2 list-item-cursor mt-2">Requests</v-list-item-subtitle>
                </v-col>
                <v-col>
                    <v-list-item-title class="text-h6 mt-9">Kickin API</v-list-item-title>
                    <v-list-item-subtitle class="text-body-2 list-item-cursor mt-3">Getting started</v-list-item-subtitle>
                    <v-list-item-subtitle class="text-body-2 list-item-cursor mt-2">End Points</v-list-item-subtitle>
                    <v-list-item-subtitle class="text-body-2 list-item-cursor mt-2">Requests</v-list-item-subtitle>
                </v-col>
                <v-col>
                    <v-list-item-title class="text-h6 mt-9">Kickin API</v-list-item-title>
                    <v-list-item-subtitle class="text-body-2 list-item-cursor mt-3">Getting started</v-list-item-subtitle>
                    <v-list-item-subtitle class="text-body-2 list-item-cursor mt-2">End Points</v-list-item-subtitle>
                    <v-list-item-subtitle class="text-body-2 list-item-cursor mt-2">Requests</v-list-item-subtitle>
                </v-col>
                <v-col cols="1">
                    <v-spacer></v-spacer>
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
const drawer = ref(null);
const dialog = ref(false);
const loginStatus = ref(false);
const menuItems = ref(
    [
        {
            id: 1,
            title: 'Introduction',
            type: 'link',
            to: '/',
            icon:'mdi-home-outline',
            current: true
        },
        {
            id: 2,
            title: 'Getting started',
            type: 'link',
            to: '/intro',
            icon:'mdi-book-open-page-variant-outline',
            current: false
        },
        {
            id: 3,
            title: 'Authentication',
            type: 'link',
            to: 'auth',
            icon:'mdi-account-key-outline',
            current: false
        },
        {
            id: 4,
            title: 'Requests',
            type: 'toggle',
            opened: false,
            current: false,
            subMenu: [
                {id: 's1', parentId: 4, title: 'lists', type: 'link',  method: 'GET', color: 'primary', current: false},
                {id: 's2', parentId: 4, title: 'details', type: 'link', method: 'GET', color: 'primary', current: false},
                {id: 's3', parentId: 4, title: 'rank', type: 'link', method: 'GET', color: 'primary', current: false},
                {id: 's4', parentId: 4, title: 'Add to Favorite', type: 'link', method: 'POST', color: 'success', current: false},
                {id: 's5', parentId: 4, title: 'Remove from Favorite', type: 'link', method: 'DELETE', color: 'error', current: false},
            ]
        }
    ]
);
const items = [
    { title: 'Profile' },
    { title: 'Logout' },
];
const resetAndSetCurrent = (selectedItem, parentItem = null) => {
    menuItems.value.forEach(item => {
        item.current = false;
        if (item.subMenu) {
            item.subMenu.forEach(sub => {
                sub.current = false;
            });
        }
    });

    selectedItem.current = true;
    if (parentItem) {
        parentItem.current = true;
    } else if (selectedItem.subMenu && selectedItem.subMenu.length > 0) {
        selectedItem.subMenu[0].current = true;
    }
};
const toggleSubMenu = (item) => {
    item.opened = !item.opened;
    resetAndSetCurrent(item);
};
const route_to = (path) => {
    commonStore.route_to(path);
};
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

const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('pk');
    loginStatus.value = false;
    commonStore.route_to('/');
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

const menuToggle = computed(() => {
    return drawer.value ? 'mdi-close' : 'mdi-menu'
});

onMounted(() => {
const email = localStorage.getItem('email');
loginStatus.value = !!email
});
</script>

<script>
export default {
    data: () => ({ drawer: null }),
}
</script>

<style>
html { scroll-behavior: smooth; }
.app-logo-img{
    border-radius: 150%;
    width: 48px;
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
.list-item-cursor{
    cursor: pointer  ;
}
.list-item-cursor:hover{
    color: #b5b5b5;

}
.list-child{
    padding-left: 104px !important;
}
@media (max-width: 600px) {
    .xlg-max-w{
        max-width: 80% !important;
    }
}
a {
    color: #c02828;
}
.height-75{
    z-index: 1 !important;
}
.v-list-item-title{
 font-size: 0.875rem !important;
}
.sub-group-wrapper{
    display: grid;
    grid-template-columns: 3.1fr 1fr;
    padding: 1px 0 1px 1rem ;
    margin: 4px 0.2px 4px 0.2px;
}
.v-chip{
    justify-content: center !important;
}
.toggle-margin{
    margin-left: 10px;
    margin-top: 7px;
}
.link-padding{
    padding-left:2px;
    margin: 7px 0.2px 0 10px;
}
.current{
    border-radius: 6px;
    background-color: rgba(171, 167, 167, 0.11) !important;
}
.v-navigation-drawer__content{
    z-index: 9999;
}
.v-container {
    max-width: 100% !important;
}
@media (max-width: 959px) {
.logo-responsive{
  margin-top: 3.75rem !important;
    }
}

</style>