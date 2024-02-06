<script setup lang="ts">
import axios from "axios";

const name = ref('');
const password = ref('');
const creatingUser = ref(false);

const register = () => {
  creatingUser.value = true;
  console.log('register');
  console.log('email: ', localStorage.getItem('email') as string);
  const formData = new FormData();
  formData.append("email", localStorage.getItem('email') as string);
  formData.append("password1", 'qwer1234!');
  formData.append("password2", 'qwer1234!');

  // axios({
  //   method: 'POST',
  //   data: formData,
  //   url: `${config.public.API_BASE_URL}user/dj-rest-auth/registration/`
  // }).then((res:any) => {
  //   console.log(res.data);
  //   creatingUser.value = false;
  // }).catch((err:any) => {
  //   console.log('err; ', err);
  //   creatingUser.value = false;
  // });
}

</script>

<template>
  <div class="inner-wrapper mt-16">
    <p class="flex-item text-h4 font-weight-bold mb-0">kickin Welcome you </p>
    <p class="text-subtitle-1 font-weight-light">please set your basic information</p>
    <v-avatar color="surface-variant" size="50" class="mt-6 mb-3"></v-avatar>
    <v-btn variant="plain" :ripple="false" size="x-small"><span class="text-caption">set profile picture</span></v-btn>
    <div class="input-flex">
      <p class="text-subtitle-2 font-weight-bold text-disabled">please tell me your name</p>
      <p>
        <v-text-field density="compact" placeholder="EX: Steven Choi, Steven, Choi" hide-details="true" v-model="name"
                      :clearable="true" clear-icon="mdi-close-circle-outline" variant="solo" class="mt-1" style="width: 20rem"/>
      </p>
      <p class="text-subtitle-2 font-weight-bold text-disabled mt-6">Password</p>
      <p>
        <v-text-field density="compact" placeholder="New Password" hide-details="true" v-model="password"
                      :clearable="true" clear-icon="mdi-close-circle-outline" variant="solo" class="mt-1" style="width: 20rem"/>
      </p>
    </div>
    <v-btn class="mt-12 mb-7" color="#40557C" :loading="creatingUser" :width="210" @click="register">
      <span class="px-5"><span class="py-auto text-subtitle-2">Create new account</span></span></v-btn>
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


</style>