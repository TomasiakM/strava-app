<template>
  <div>
    <Spinner />
  </div>
</template>

<script lang="ts" setup>
const { query } = useRoute();
const router = useRouter();

const { data, error, execute } = useApiFetch("auth/login", {
  method: "POST",
  body: { code: query.code },
  immediate: false,
  credentials: "include",
});

const loginErrorRedirect = () => {
  router.replace({
    path: "/login",
    query: { error: "true" },
  });
};

onMounted(async () => {
  if (query.error || !query.code || !(typeof query.code === "string")) {
    loginErrorRedirect();
    return;
  }

  await execute();

  if (data.value) {
    console.log("[TODO]: Set user data with access token to store");

    router.replace("/");
    return;
  }

  loginErrorRedirect();
});

definePageMeta({
  layout: "full-width",
});
</script>
