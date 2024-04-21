// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt3-leaflet"],
  tailwindcss: {
    cssPath: "@/assets/css/main.css",
    configPath: "tailwind.config.ts",
  },
  imports: {
    dirs: ["composables/**"],
  },
  runtimeConfig: {
    public: {
      primaryPolyline: "#FF7431",
      secondaryPolyline: "#31BCFF",
      baseUrl: "http://localhost:3000",
      baseApiUrl: "http://localhost:5000",
      stravaClientId: 0,
    },
  },
});
