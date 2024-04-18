<template>
  <div>
    <Spinner />
  </div>
</template>

<script lang="ts" setup>
const { query } = useRoute();
const router = useRouter();
const athleteStore = useAthleteStore();

const loginErrorRedirect = () => {
  router.replace({
    path: "/login",
    query: { error: "true" },
  });
};

onMounted(async () => {
  if (query.error || !query.code || !(typeof query.code === "string")) {
    return loginErrorRedirect();
  }

  const loginSuccessully = await athleteStore.login(query.code);
  if (loginSuccessully) {
    return router.replace("/");
  }

  loginErrorRedirect();
});

definePageMeta({
  layout: "full-width",
});
</script>
