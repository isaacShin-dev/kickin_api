<script setup >
import { ref, onMounted, onUnmounted} from 'vue'
import 'public/styles/reset.css'
import 'public/styles/common.css'
import LangSwitcher from "~/components/appLayouts/LangSwitcher.vue";
import { useTheme } from 'vuetify'
const { locale } = useI18n();

const localePath = useLocalePath()
const head = useLocaleHead({
  title: 'Kickin',
  meta: [],
  addSeoAttributes: true,
})
const htmlAttrs = computed(() => head.value.htmlAttrs)
const commonStore = useCommonStore()
const theme = useTheme();
const current_path = ref(useRoute().fullPath)

const drawer = ref(false);
const dialog = ref(false);
const loginStatus = ref(false);
const languages = ref([]);
const lang = ref('en');
const menuItems = ref(commonStore.menus);
const items = [
  { title: 'Profile' },
  { title: 'Logout' },
];
const resetAndSetCurrent = (selectedItem => {
  console.log('selectedItem', selectedItem);
  menuItems.value.forEach(item => {
    item.current = false;
  });
  selectedItem.current = true;
});


const route_to = (path) => {
  commonStore.route_to(path);
};
const toggleTheme = () => {
  const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark';
  theme.global.name.value = newTheme;
  localStorage.setItem('theme', newTheme);
  commonStore.theme = newTheme;
};
const openDialogOnCommandK = (event) => {
  if (event.metaKey && event.key.toLowerCase() === 'k') {
    dialog.value = true;
  }
};

const logout = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('pk');
  loginStatus.value = false;
  commonStore.route_to('/');
};

const menuMouseOver = () => {
  console.log('item');
};

onMounted(() => {
  window.addEventListener('keydown', openDialogOnCommandK);
  const preferTheme = localStorage.getItem('theme');
  if (preferTheme) {
    theme.global.name.value = preferTheme;
    commonStore.theme = preferTheme;
  }
  const item = menuItems.value.find(item => locale + '/' + item.to === current_path.value.substring(3));
  if (item) resetAndSetCurrent(item);
  const email = localStorage.getItem('email');
  loginStatus.value = !!email
});

onUnmounted(() => {
  window.removeEventListener('keydown', openDialogOnCommandK)
});

//watchers

watch(() => useRoute().fullPath, (newPath) => {current_path.value = newPath;});

watch(current_path, (to, from) => {
  // console.log('Path changed to', to);
  // console.log('to.substring(3)', to.substring(3));
  if(to === '/account/login' || to === '/account/register'){
    menuItems.value.forEach(item => {item.current = false;});
  }
  if(to === '/' + locale.value){
    console.log('to === /' + locale.value);
    const item = menuItems.value.find(item => item.to === '/');
    if (item) resetAndSetCurrent(item);

  }
  const item = menuItems.value.find(item => item.to === to.substring(3));
  if (item) resetAndSetCurrent(item);


});
</script>
<template>
  <Html :lang="htmlAttrs.lang">
    <v-app>
      <v-navigation-drawer v-model="drawer" mobile-breakpoint="md" class="height-75" :floating="true"
                           :scrim="true" elevation="0" style="z-index: 1009 !important;"
                           :color="theme.global.name.value === 'dark' ? '#3A3A39' : '#FFFEFC'"

      >
        <v-row align-content="center" justify="center" class="logo-responsive">
          <v-col cols="4" style="cursor: pointer;">
            <v-img src="/img/logo.png" class="app-logo-img"  @click="route_to('/')"/>
          </v-col>
          <v-col cols="8" align-self="center" @click="route_to('/')" style="cursor: pointer;">
            <v-list-item-title class="text-h5 main-title">Kickin.</v-list-item-title>
            <v-list-item-subtitle>kicks Data Api</v-list-item-subtitle>
          </v-col>
        </v-row>
        <v-list-item>
          <v-row align="center">
            <v-col cols="12">
              <v-btn size="small" :width="222" prepend-icon="mdi-magnify" :ripple="false" variant="tonal">
                Jump to<span class="search-btn-k ml-5">⌘</span><span class="search-btn-k">K</span>
                <v-dialog v-model="dialog" activator="parent" width="auto" transition="dialog-top-transition">
                  <v-card width="650">
                    <v-card-text>
                      <v-text-field label="Search" solo-inverted hide-details prepend-inner-icon="mdi-magnify"/>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact">
          <span class=" text-subtitle-1 sub-menu-title mb-13">KICKIN. DATA API</span>
          <v-divider class="w-75 ml-5 border-opacity-100 mb-4"></v-divider>
          <div v-for="(item, idx) in menuItems" :key="item.id" class="">
            <NuxtLink v-if="item.type === 'link'" :to="localePath(item.to)"
               class="link-padding text-subtitle-2 list-item-cursor"  :class="{ 'current': item.current }">
              <v-icon size="x-small" class="ml-1 mr-3">{{item.icon}}</v-icon>{{ $t(`menu.${item.title}`)}}
            </NuxtLink>
            <NuxtLink v-else-if="item.type === 'request'" :to="localePath(item.to)"
               class="link-padding text-subtitle-2 list-item-cursor pl-4" :class="{ 'current': item.current }">
              {{ $t(`menu.${item.title}`)}}
              <v-chip :color="item.color" class="ml-2" size="x-small">{{item.method}}</v-chip>
            </NuxtLink>
            <p v-if="item.type === 'subMenu'" class="text-subtitle-1 sub-menu-title">
              {{ $t(`menu.${item.title}`)}}
            </p>
            <v-divider v-if="item.type === 'subMenu'" class="w-75 ml-5 border-opacity-100 mb-4"/>
          </div>
        </v-list>
      </v-navigation-drawer>
        <v-app-bar :floating="true" elevation="0" style="z-index: 1010 !important;" density="compact"
                   :color="theme.global.name.value === 'dark' ? '#3A3A39' : '#FFFEFC'">
          <lang-switcher/>
          <v-row class="d-md-none d-sm-flex d-lg-none d-xl-none mt-0 mr-8" justify="center" align="center" align-content="center">
          <v-col class="h6 text-center text-decoration-underline text-subtitle-2"
                 style="letter-spacing: 5px !important;">Kickin</v-col>
          </v-row>
          <template v-slot:append>
          <v-btn icon @click="dialog=true" size="small" class="d-none d-md-flex"><v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon @click="toggleTheme" size="small" class="d-none d-md-flex"><v-icon>mdi-theme-light-dark</v-icon></v-btn>
          <v-btn v-if="!loginStatus" icon @click="route_to('/account/login')" size="small" class="d-none d-md-flex"><v-icon>mdi-login</v-icon></v-btn>
            <v-menu v-else>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-account-circle-outline" v-bind="props"></v-btn>
              </template>
              <v-list density="compact">
                <v-list-item>
                  <NuxtLink :to="locale + '/account/profile'">Dashboard</NuxtLink></v-list-item>
                <v-list-item @click="logout"><v-list-item-title>logout</v-list-item-title></v-list-item>
              </v-list>
            </v-menu>
            </template>
        </v-app-bar>
        <v-main class="background-color-light" :class="{'background-color-dark' : theme.global.name.value === 'dark'}">
            <v-container class="xlg-max-w" fluid>
              <NuxtLayout>
              <NuxtPage />
              </NuxtLayout>
            </v-container>
        </v-main>
    </v-app>
  </Html>
</template>
<style>

.background-color-light{
    background-color: #FFFEFC;
}
.background-color-dark{
    background-color: #3A3A39;
}

html {
  scroll-behavior: smooth;
  font-family: SUIT-Regular, sans-serif;
}

.app-logo-img{
  border-radius: 150%;
  width: 48px;
  margin:15px 15px ;
}

.main-title{
  font-weight: bolder !important;
  font-size: 1rem !important;
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
  width: 100%;
  cursor: pointer;
  display: block;
}
.list-item-cursor:hover{
  color: #120d0d;
  background-color: #e1e0e0;
  border-radius: 6px;

}
.sub-menu-title{
  font-family: Pretendardvariable, sans-serif !important;
  margin-top: 26px;
  margin-left: 9px;
  padding-left: 10px;
  padding-bottom: 5px;
  font-size: 0.8rem !important;
  font-weight: 400 !important;
  letter-spacing: .7px !important;
  width: 56%;
}

@media (max-width: 600px) {
}
/*a {
  color: #c02828;
}*/
.height-75{
  z-index: 1 !important;
}

.link-padding{
  width: 90%;
  padding-left:2px;
  margin: 7px 0.2px 0 10px;
  letter-spacing: .2px !important;
  font-family: SUIT-Regular, sans-serif !important;
}
.current{
  border-radius: 6px;
  background-color: rgba(171, 167, 167, 0.53) !important;
}

@media (max-width: 959px) {
  .logo-responsive{
    margin-top: 3.75rem !important;
  }
}
.app-logo-img{
    border-radius: 150%;
    width: 48px;
    margin:15px 15px ;
}
. margin-left{
    margin-left: 10rem;

}
.main-title{
    font-weight: bolder !important;
    font-size: .9rem !important;
    letter-spacing: 5px !important;
}
@media (max-width: 600px) {
    .xlg-max-w{
        max-width: 80% !important;
    }
}
@media (max-width: 959px) {
.logo-responsive{
  margin-top: 3.75rem !important;
    }
}

</style>