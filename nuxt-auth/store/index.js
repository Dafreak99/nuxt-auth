export const actions = {
  clearUser({ commit }) {
    commit("CLEAR_USER");
  },
};

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  },
};

export const mutations = {
  CLEAR_USER(state) {
    state.auth = {
      ...state.auth,
      user: null,
      loggedIn: false,
    };
  },
};
