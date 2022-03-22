<template>
  <nav class="h-12 bg-gray-500 px-12 flex justify-between items-center">
    <nuxt-link to="/">
      <h3 class="text-xl font-bold text-white uppercase font-sans">Auth</h3>
    </nuxt-link>
    <div class="flex">
      <nuxt-link to="/private" href="" class="px-2 text-white"
        >Private</nuxt-link
      >
      <div v-if="isAuthenticated" class="flex">
        <p class="text-white">
          {{ $auth.user.email }}
        </p>
        <a href="" class="px-2 text-white" @click.prevent="logout">Logout</a>
      </div>

      <div v-else>
        <nuxt-link to="/login" href="" class="px-2 text-white">Login</nuxt-link>
        <nuxt-link to="/register" href="" class="px-2 text-white"
          >Register</nuxt-link
        >
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "navbar",
  methods: {
    logout() {
      this.$auth.setUserToken(false);
      this.$store.dispatch("clearUser");
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
};
</script>

<style></style>
