export default async function ({ app, store, redirect }) {
  if (!store.state.auth.loggedIn) {
    redirect("/login");
  }
}
