<script setup lang="ts">
const localePath = useLocalePath()
const commonStore = useCommonStore()
const sectionVisibility = reactive({});

</script>

<template>
  <section class="gap-20 inner-wrapper" data-id="section1">
    <div class="main-intro">
      <v-icon size="x-large">mdi-laptop</v-icon>
      <div class="h2 text-center">
        {{ $t('page.home.section1.title') }}
      </div>
      <p class="h5 text-center">{{ $t('page.home.section1.content')}}</p>
      <v-btn color="#40557C" width="122" :to="localePath('/introduction')">
        {{ $t('common.start')}}</v-btn>
    </div>
    <v-img src="/img/home-banner.png" class="banner-img"/>
  </section>
  <v-divider class="my-6 mx-14"/>
  <section class="gap-20 inner-wrapper-reverse" data-id="section2" :class="['fade-in', { 'visible': sectionVisibility['section2'] }]">
    <div class="main-intro">
      <v-icon size="x-large">mdi-teddy-bear</v-icon>
      <p class="h2 text-center">{{ $t('page.home.section2.title') }}</p>
      <p class="h5 text-center">{{ $t('page.home.section2.content')}}</p>
    </div>
    <v-img src="/img/baby.png" :width="222" :height="220"></v-img>
  </section>
  <v-divider class="my-6 mx-14"/>
  <section class="gap-20 inner-wrapper" data-id="section2" :class="['fade-in', { 'visible': sectionVisibility['section2'] }]">
    <div class="main-intro">
      <v-icon size="x-large">mdi-hand-heart</v-icon>
      <p class="h2 text-center">{{ $t('page.home.section3.title')}}</p>
      <p class="h5 text-center">{{ $t('page.home.section3.content')}}</p>
    </div>
    <v-img src="/img/contribute.png" class="banner-img shadow-img"/>
  </section>
</template>

<style scoped>
.inner-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}
.inner-wrapper-reverse{
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  margin-top: 3.5rem;
}
.main-intro{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin-right: 20px;
}
.banner-img{
  width: 50%;
  height: 100%;
  border-radius: 10px;
}
.start-btn{
  position: fixed;
  bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}


/*.fade-in {
  opacity: 0;
  transform: translateY(-20px); !* 위에서 아래로 효과를 주기 위해 *!
  transition: opacity 1s ease-out, transform 1s ease-out;
}
.visible {
  opacity: 1;
  transform-style: preserve-3d;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  !*  opacity: 1;
    transform: translateY(0);*!
}*/


@media (max-width: 768px) {
  .inner-wrapper{
    flex-direction: column-reverse;
  }
  .inner-wrapper-reverse{
    flex-direction: column-reverse;
  }
  .gap-20{
    gap: 30px;
  }
  .main-intro{
    width: 100%;
    margin-right: 0;
  }
  .banner-img{
    width: 75%;
    height: 50%;
  }
}
@media (max-width: 425px) {
  .banner-img{
    width: 100%;
    height: 50%;
  }
  .h1{
    font-size: 1.5rem;
  }
  .h5{
    font-size: .99rem;
  }
}





</style>