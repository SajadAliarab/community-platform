
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  colorMode: {
    preference: 'dark',
  },
  runtimeConfig: {
    public: {
      apiUrl: 'https://coapi.sajad.uk'
    }
  },
  ssr: false
});