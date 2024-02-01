import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
        },
    },
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
        },
        moduleOptions: {
            // styles: { configFile: 'assets/variables.scss'},
            /* nuxt-vuetify module options */
            treeshaking: true,
            useIconCDN: true,

            /* vite-plugin-vuetify options */
            autoImport: true,
            useVuetifyLabs: true,
        },

    },
})
