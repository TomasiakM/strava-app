<template>
  <div class="max-w-[350px] bg-white w-full rounded shadow-md p-4">
    <h3 class="text-xl font-semibold text-primary mb-3">Dołącz do nas!</h3>

    <div class="text-sm mb-3">
      By zacząć korzystać z aplikacji, zaloguj się do niej przy użyciu swojego
      konta Strava!
    </div>

    <div class="mb-3">
      <div class="flex justify-center">
        <NuxtLink :to="stravaLoginUrl">
          <SvgConnectWithStrava />
        </NuxtLink>
      </div>
      <div v-if="error" class="text-center text-sm font-semibold text-danger">
        Wystąpił błąd podczas logowania. Spróbuj ponownie
      </div>
    </div>

    <div class="text-center text-sm mb-2">
      Możesz też sprawdzić wersję demonstacyjną.
    </div>

    <div class="flex justify-center">
      <button
        @click="demo"
        class="blcok bg-secondary w-[185px] h-[40px] rounded-sm text-sm text-white"
      >
        Tryb demo
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {
  public: { stravaClientId, baseUrl },
} = useRuntimeConfig();

const {
  query: { error },
} = useRoute();
const router = useRouter();
const demoStore = useDemoStore();

const redirect = `${baseUrl}/strava-redirect`;
const stravaLoginUrl = `http://www.strava.com/oauth/authorize?client_id=${stravaClientId}&response_type=code&redirect_uri=${redirect}&approval_prompt=force&scope=read,activity:read,activity:read_all`;

const demo = () => {
  demoStore.setPageToDemoMode();
  router.push("/strava-redirect?code=demo_code");
};

definePageMeta({
  layout: "full-width",
});
</script>
