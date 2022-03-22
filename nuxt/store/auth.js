export const state = () => ({
  user: null,
  loggedIn: false,
  accessToken: null,
  refreshToken: null,
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
    state.loggedIn = !!user;
  },
  clearUser(state, user) {
    state.user = null;
    state.loggedIn = false;
    state.accessToken = null;
    state.refreshToken = null;
  },
  setTokens(state, { accessToken, refreshToken }) {
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
  },
};
