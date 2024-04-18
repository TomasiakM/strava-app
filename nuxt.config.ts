// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  tailwindcss: {
    cssPath: "@/assets/css/main.css",
    configPath: "tailwind.config.ts",
  },
  runtimeConfig: {
    public: {
      baseUrl: "http://localhost:3000",
      baseApiUrl: "http://localhost:5000",
      stravaClientId: 0,
    },
  },
});
