const ANONYMOUS_ROUTES = ["/login", "/strava-redirect"];

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = storeToRefs(useAthleteStore());
  console.log("MIDDLEWARE");
  if (isAuthenticated.value && ANONYMOUS_ROUTES.includes(to.path)) {
    return navigateTo("/", { replace: true });
  }

  if (!isAuthenticated.value && !ANONYMOUS_ROUTES.includes(to.path)) {
    return navigateTo("/login", { replace: true });
  }
});
