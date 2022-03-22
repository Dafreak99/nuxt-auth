export default (app) => ({
  localStorage(key, value) {
    localStorage.setItem(key, value);
  },
  getLocalStorage(key) {
    return localStorage.getItem(key);
  },
});
