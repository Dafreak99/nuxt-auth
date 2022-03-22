import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";

export default function ({ $axios, store, redirect, $helper, req, app }) {
  $axios.onRequest(async (config) => {
    console.log(`%cMaking request to ${config.url}`, "color: #73a9ff");

    if (
      (config.url.indexOf("/auth/login") >= 0) |
      (config.url.indexOf("/auth/refreshToken") >= 0)
    ) {
      return config;
    }

    const cookies = new Cookies(process.browser ? null : req.headers.cookie);
    const token = cookies.get("token");

    if (!token) {
      redirect("/login");
    }

    $axios.setToken(token, "Bearer");

    const { exp } = jwtDecode(token);

    // If expired
    if (exp * 1000 <= Date.now()) {
      console.log("%cExpired! Perform slient refresh", "color: #ffc852");
      
        const {
          data: { accessToken, refreshToken },
        } = await $axios.post("/auth/refreshToken");

        store.commit("auth/setTokens", { accessToken, refreshToken });
        app.$cookies.set("token", accessToken);
        app.$cookies.set("refreshToken", refreshToken);

        $axios.setToken(accessToken, "Bearer");
    } else {
      console.log("%cToken doesn't expire yet", "color: #22f096");
    }
    return config;
  });

  $axios.onError(async (error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      redirect("/login");
    }
  });
}
