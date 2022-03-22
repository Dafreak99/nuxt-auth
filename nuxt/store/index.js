import Cookies from "universal-cookie";

export const actions = {
  async nuxtServerInit({ commit }, { req, $axios, error, $error, app }) {
    console.log("nuxtServerInit");

    const token = app.$cookies.get("token");

    $axios.setToken(token, "Bearer");

    try {
      const {
        data: { user },
      } = await this.$axios.get("/auth/user");
      commit("auth/setUser", user);
    } catch (error) {
      console.log("error", error);
    }
  },
};
