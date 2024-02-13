<script setup lang="ts">
import axios from "axios";
// isaacshin92@gmail.com
const commonStore = useCommonStore()
const config = useRuntimeConfig();

const email = ref('');
const password = ref('');
const emailLoading = ref(false);
const emailButton = ref('Continue with E-mail');
const emailValid = ref(true);
const emailSent = ref(false);
const emailResend = ref(false);
const resendCount = ref(120);

const registerKey = ref('');
const userInputKey = ref('');
const userInputChecked = ref(true);
const creatingUser = ref(false);
const duplicateEmail = ref(false);

  function emailValidChk(email:any) {
    const pattern = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return pattern.test(email);
  }

const loginWithEmail = () => {
    emailLoading.value = true;
    if(email.value === '' || !emailValidChk(email.value)){
      emailLoading.value = false;
      emailValid.value = false;
    return;
  }

  axios({
    method: 'GET',
    url: `${config.public.API_BASE_URL}user/emailcheck/?email=${email.value}`
  }).then((res)=> {
    console.log('res: ', res);
    if(res.status === 226){
      duplicateEmail.value = true;
      emailLoading.value = false;
      return;
    }
    else if(res.status === 200){
      const formData = new FormData();
      formData.append("email", email.value);

      axios({
        method: 'POST',
        data: formData,
        url: `${config.public.API_BASE_URL}user/send-confirmation/`
      }).then((res:any) => {
        console.log(res.data);
        emailLoading.value = false;
        emailButton.value = 'Create new account';
        emailSent.value = true;
        registerKey.value = res.data.key;
        localStorage.setItem('email', email.value);
      }).catch((err:any) => {
        console.log('err; ', err);
        emailLoading.value = false;
      });
    }
  }).catch((err) => {
    console.log('err; ', err);
  });
}

const login = () =>{
    const formData = new FormData();
    formData.append("email", email.value);
    formData.append("password", password.value);

    axios({
        method: 'POST',
        data: formData,
        url: `${config.public.API_BASE_URL}user/dj-rest-auth/login/`
    }).then((res:any) => {
        console.log(res.data);
        emailLoading.value = false;
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('email', email.value);
        localStorage.setItem('pk', res.data.user.pk);
        commonStore.route_to('/account/profile');
    }).catch((err:any) => {
        console.log('err; ', err);
        emailLoading.value = false;
    });
}

const checkCode = (code:String) => {

  if(userInputKey.value === ''){
    userInputChecked.value = false;
    return;
  }else if(userInputKey.value === registerKey.value){
    commonStore.route_to('/account/register');
  }
  else{
    userInputChecked.value = false;
    return;
  }
}

watch(() => emailResend.value, (val) => {
  if(val){
    const interval = setInterval(() => {
      resendCount.value -= 1;
      if(resendCount.value === 0){
        clearInterval(interval);
        emailResend.value = false;
        resendCount.value = 120;
      }
    }, 1000);
  }
});



</script>

<template>
<div class="inner-wrapper mt-16">
<v-img src="/img/logo.png" class="app-logo-img flex-item"></v-img>
<p class="flex-item text-h4 font-weight-bold mb-4">LOGIN</p>
  <v-btn class="mt-1 btn-flex">
    <span class="px-5">
      <img src="/img/Google__G__logo.svg" alt="google" style="height: 11px !important; margin-right: 5px"></img>
      <span class="py-auto text-subtitle-2">Login with Google</span>
    </span>
  </v-btn>
<v-divider style="width: 20rem" class="my-6"></v-divider>
<v-row style="width: 320px">
  <v-col cols="12" class="text-subtitle-2 pl-1 pb-0">E-mail</v-col>
  <v-text-field density="compact" placeholder="Please enter your E-mail" hide-details="true" v-model="email" class="mt-1"
                :clearable="true" clear-icon="mdi-close-circle-outline" @input="emailValid=true" variant="solo" type="email"
                @keyup.enter="loginWithEmail" :autofocus="true"
  />
  <v-col cols="12" v-show="duplicateEmail" class="text-subtitle-2 text-green-darken-3 text-center py-0">this email is already registered. please login. </v-col>
  <v-col cols="12" v-if="emailSent">
    <v-alert type="success" dense dismissible variant="outlined" class="mb-0">
      <span class="text-subtitle-2">We have sent a confirmation email to
        <span class="font-weight-bold">{{ email }}</span>. <br/>
        Please check your inbox or spam. </span>
      <v-row justify="center" align-content="center" class="mt-1">
        <v-spacer></v-spacer>
        <v-col cols="8">
          <v-btn size="x-small" color="#1B5E20" :width="100" :disabled="emailResend" @click="emailResend=true">resend</v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <p class="text-red-darken-3 mt-1 text-subtitle-2 text-disabled" v-if="emailResend">resending will be available in
        <span class="font-weight-bold text-high-emphasis">{{ resendCount }}</span>
      </p>
    </v-alert>
  </v-col>
  <v-col cols="12" v-if="emailSent" class="text-subtitle-2 pl-1 py-0">Confirmation Code</v-col>
  <v-text-field v-if="emailSent" density="compact" placeholder="Enter validation code" hide-details="true" v-model="userInputKey"
                :clearable="true" clear-icon="mdi-close-circle-outline" variant="solo" class="mt-1" @input="userInputChecked=true"/>
  <v-col v-if="!emailSent" cols="12" class="pb-0">
    <v-btn class="mt-1 btn-flex mb-2" color="#40557C" v-if="!duplicateEmail" :loading="emailLoading" @click="loginWithEmail">
    <span class="px-5"><span class="py-auto text-subtitle-2">Continue with E-mail</span></span>
    </v-btn>
  </v-col>
  <v-col cols="12" v-if="duplicateEmail" class="text-subtitle-2 pl-1 py-0">Password</v-col>
  <v-text-field v-show="duplicateEmail" density="compact" placeholder="Password" hide-details="true" v-model="password"
                type="password" @keyup.enter="login" id="pwd" :autofocus="duplicateEmail"
                :clearable="true" clear-icon="mdi-close-circle-outline" variant="solo" class="mt-1"/>
  <v-col v-if="duplicateEmail">
    <v-btn class="mt-1 btn-flex mb-2" color="#40557C" :loading="emailLoading" @click="login">
      <span class="px-5"><span class="py-auto text-subtitle-2">Continue with E-mail</span></span>
    </v-btn>
  </v-col>
  <v-col v-if="emailSent" cols="12" class="pb-0">
    <v-btn class="mt-1 btn-flex mb-2" color="#40557C" :loading="creatingUser" @click="checkCode">
      <span class="px-5"><span class="py-auto text-subtitle-2">Create new account</span></span>
    </v-btn>
  </v-col>
  <v-col cols="12" v-if="!emailValid" class="text-center pt-0 text-subtitle-2 text-red-darken-3">
    Please enter a valid email address.
  </v-col>
  <v-col cols="12" v-if="!userInputChecked" class="text-center pt-0 text-subtitle-2 text-red-darken-3">
    Please enter a valid code.
  </v-col>

  <v-col cols="12" class="text-center pt-0"><v-btn variant="plain" href="#" :ripple="false" class="text-subtitle-2 grey--text text--darken-2">Forgot password?</v-btn></v-col>
</v-row>
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
}
.btn-flex{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 20rem;
  height: 2.2rem;
  margin: 0.8rem 0;
  cursor: pointer;
  border:1px solid rgba(15, 15, 15, 0.15);
  box-shadow: rgba(15, 15, 15, 0.05) 0px 1px 2px;
  border-radius: 4px;
}

.app-logo-img{
  width: 60px;
  height: 60px;
}


</style>