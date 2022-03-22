# NuxtJs + NodeJs Authentication

- Access Token, Refresh Token
- Perform slient Refresh
- Handle cases when either or both access token and refresh token are expired

# Lesson Learned

### 1. Request error in `nuxtServerInit` will not pass to axios plugin (interceptor)

```javascript
async nuxtServerInit({ commit }, { req, $axios, error }) {
    try {
      const {
        data: { user },
      } = await this.$axios.get("/auth/user");

      commit("auth/setUser", user);
    } catch (err) {
      console.log(err.response.data.message);
    }
}
```

### 2. Token: In `nuxtServerInit` we can't access to localStorage so cookie is a better place to store JWT token

```javascript
async nuxtServerInit({ commit }, { req, $axios, error }) {
    const cookies = new Cookies(req.headers.cookie);
    const token = cookies.get("token");

    $axios.setToken(token, "Bearer");
}
```

### 3. Plugin mode

https://nuxtjs.org/docs/directory-structure/plugins/#client-or-server-side-only

```javascript
export default {
  plugins: [
    '~/plugins/foo.client.js', // only in client side
    '~/plugins/bar.server.js', // only in server side
    '~/plugins/baz.js' // both client & server,
    { src: "~/plugins/axios.js", ssr: true }, // only in server side
  ]
}
```

- If `ssr` set to true then avoid to use client only API (localStorage)

```javascript
// plugin/axios.js
export default function ({ $axios, redirect, $helper, req }) {
  $axios.onRequest((config) => {
    // Avoid to use localStorage or window...if plugin runs on server mode
    // $axios.setToken($helper.getLocalStorage("token"), "Bearer");
  });
}
```

- When set axios plugin mode to run on server we can catch `nuxtServerInit` request

### 4. Cookie

- Cookie will be sent by default (without any CORs, domain's issues) when SSR (refresh the page)
- If you want to send cookie on client request, you need to enable axio `withCredential: true` and set cors origin and allow credentials in the backend

```javascript
// nuxt.config.js
axios: {
    baseURL: "http://localhost:5000/api",
    credentials: true,
},

// backend/index.js
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
```
