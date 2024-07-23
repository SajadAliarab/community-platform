
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    public: {
      apiUrl: 'https://api-community.sajad.uk'
    }
  }
  
});