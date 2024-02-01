<script setup lang="ts">

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
  <v-text-field density="compact" placeholder="Please enter your E-mail" hide-details="true"></v-text-field>
  <v-col cols="12" class="pb-0">
    <v-btn class="mt-1 btn-flex" color="#40557C">
    <span class="px-5"><span class="py-auto text-subtitle-2">Continue with E-mail</span></span>
    </v-btn>
  </v-col>
  <v-col cols="12" class="text-center pt-0"><v-btn variant="plain" href="#" :ripple="false" class="text-subtitle-2 grey--text text--darken-2">Forgot password?</v-btn></v-col>
</v-row>
  <div class="grey--text text--darken-2 w-50 text-center mt-6 text-caption">
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