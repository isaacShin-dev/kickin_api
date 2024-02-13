<script setup lang="ts">
import axios from "axios";
import {tr} from "vuetify/locale";
import {onMounted} from "vue";

const name = ref('');
const password = ref('');
const creatingUser = ref(false);
const config = useRuntimeConfig();
const commonStore = useCommonStore();

const passwordValidation = ref(false);
const pwdValidMsg = ref('Password must be at least 8 characters (letters, numbers)');
const nameValidation = ref(false);
const nameValidMsg = ref('Please enter your name');

const register = () => {
  if(name.value.length == 0){
    nameValidation.value = true;
    return;
  }
  if(password.value.length == 0 || password.value.length < 8){
    console.log('password.value.length: ', password.value.length)
    passwordValidation.value = true;
    return;
  }

  creatingUser.value = true;

  const formData = new FormData();
  formData.append("email", localStorage.getItem('email') as string);
  formData.append("password1", password.value);
  formData.append("password2", password.value);

  axios({
    method: 'POST',
    data: formData,
    url: `${config.public.API_BASE_URL}user/rest-auth/registration/`
  }).then((res:any) => {
    console.log(res.data); // 201 created
    creatingUser.value = false;
    localStorage.setItem('access_token', res.data.access_token);
    localStorage.setItem('refresh_token', res.data.refresh_token);
    localStorage.setItem('pk', res.data.user.pk);
    commonStore.route_to('/account/profile');
  }).catch((err:any) => {
    console.log('register err; ', err);
    passwordValidation.value = true;
    creatingUser.value = false;
  });
}

const pwdValid = computed(() => {
  if(password.value.length == 0){
    return true;
  }
  return password.value.length >= 8;
})

onMounted(() => {
  console.log('localStorage.getItem(email): ', localStorage.getItem('email'));
  const email = localStorage.getItem('email') as string;
  name.value = email.substring(0, email.indexOf('@'));
  if(localStorage.getItem('email') == null){
    commonStore.route_to('/account/login');
  }
})
</script>

<template>
<!--  <v-img src="/img/index_img_01.png" :height="150" :cover="true" class="banner-img"/>-->
  <div class="inner-wrapper mt-16">
    <v-img src="/img/logo.png" class="app-logo-img"></v-img>
    <p class="flex-item text-h4 font-weight-bold mb-0">Welcome</p>
    <p class="text-subtitle-2 font-weight-light">please set your basic information</p>
    <div class="input-flex">
      <p class="text-subtitle-2 font-weight-bold text-disabled">name</p>
      <p>
        <v-text-field density="compact" placeholder="EX: Peter Parker, Peter, parker" hide-details="true" v-model="name"
                      :clearable="true" clear-icon="mdi-close-circle-outline" variant="solo" class="mt-1" style="width: 20rem"/>
      </p>
      <span v-show="nameValidation" class="text-subtitle-2 text-red-darken-3">{{ nameValidMsg }}</span>
      <p class="text-subtitle-2 font-weight-bold text-disabled mt-4">Password</p>
      <p>
        <v-text-field density="compact" placeholder="New Password" hide-details="true" @input="passwordValidation=false"
                      v-model="password" type="password" :clearable="true" clear-icon="mdi-close-circle-outline"
                      variant="solo" class="mt-1" style="width: 20rem"/>
      </p>
      <span v-show="passwordValidation" class="text-subtitle-2 text-red-darken-3">{{ pwdValidMsg }}</span>
<!--      <span v-show="!passwordValidation" class="text-subtitle-2" >must be at least 8 letters with a special character</span>-->

    </div>
    <v-btn class="mt-12 mb-7" color="#40557C" :loading="creatingUser" :width="210" @click="register">
      <span class="px-5"><span class="py-auto text-subtitle-2">Create new account</span></span></v-btn>

    <div class="grey--text text--darken-2 w-75 text-center mt-6 text-caption">
      if you click the button, it will be considered that you understand and agree to the
      <v-btn variant="plain" href="#" :ripple="false" size="x-small" class="text-subtitle-2 px-0">Terms of Service</v-btn> and
      <v-btn href="#" variant="plain" :ripple="false" size="x-small" class="text-subtitle-2 px-0">Privacy Policy</v-btn> of
      <span class="font-weight-bold">Kickin.</span>
    </div>
  </div>

</template>

<style scoped>
  .inner-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 99;
  }
  .input-flex{
    display: flex;
    flex-direction: column;
    justify-content: center !important;
    align-items: flex-start !important;
    margin-top: 2.4rem;
  }
.banner-img{
  width: 100%;
  position: relative;
  top: -10px;
}
  .app-logo-img{
    width: 60px;
    height: 60px;
  }

</style>