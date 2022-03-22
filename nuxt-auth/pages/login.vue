<template>
  <div class="flex items-center justify-center screen">
    <form
      class="bg-white shadow-lg rounded-md py-12 px-8 w-96"
      @submit.prevent="loginUser"
    >
      <h3 class="mb-8 text-xl text-center font-semibold">Login</h3>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          required
          v-model="formData.email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          required
          v-model="formData.password"
        />
      </div>

      <div class="form-group mt-8">
        <button
          class="w-full bg-black text-white outline-none border-none py-2 rounded-md"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: "sl4mdunk1999@gmail.com",
        password: "programmer2211",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        await this.$auth.loginWith("local", {
          data: this.formData,
        });
        this.$toast.success("Login successfully");
        this.$router.push("/private");
      } catch (err) {
        this.$toast.error("Error");
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
.screen {
  height: calc(100vh - 48px);
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  label {
    margin-bottom: 5px;
  }

  input {
    height: 40px;
    outline: none;
    border: 1px solid gray;
    padding: 0 15px;
    font-family: inherit;
    border-radius: 6px;
  }
}
</style>
