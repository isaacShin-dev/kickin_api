export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
      '@invictus.codes/nuxt-vuetify',
      '@pinia/nuxt',
  ],
    pinia: {
        storesDirs: ['./stores/**'],
    },
    vuetify: {
        vuetifyOptions: {
            // @TODO: list all vuetify options
        },
        moduleOptions: {
            /* nuxt-vuetify module options */
            treeshaking: true,
            useIconCDN: true,

            /* vite-plugin-vuetify options */
            styles: true,
            autoImport: true,
            useVuetifyLabs: true,
        },
    },
})
