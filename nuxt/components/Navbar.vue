<template>
  <nav class="h-12 bg-gray-500 px-12 flex justify-between items-center">
    <nuxt-link to="/">
      <h3 class="text-xl font-bold text-white uppercase font-sans">Auth</h3>
    </nuxt-link>
    <div class="flex">
      <div v-if="loggedIn" class="flex">
        <p class="text-white mr-4">Hi, {{ user.username }} |</p>
        <nuxt-link to="/private" href="" class="px-2 text-white"
          >Private</nuxt-link
        >
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
import { mapState } from "vuex";
import Cookies from "universal-cookie";

export default {
  name: "navbar",
  computed: {
    ...mapState({
      loggedIn: (state) => state.auth.loggedIn,
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    logout() {
      const cookies = new Cookies();

      cookies.remove("token");
      this.$axios.setToken(false);
      this.$store.commit("auth/clearUser");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
