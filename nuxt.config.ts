
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  runtimeConfig: {
    public: {
      apiUrl: 'http://api-community.sajad.uk'
    }
  }
  
});