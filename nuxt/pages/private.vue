<template>
  <div class="w-full h-screen overflow-hidden bg-gray-900">
    <div class="w-8/12 mx-auto py-12">
      <h3 class="text-3xl text-white">
        Private page. Authenticated user only !!!
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["custom-auth"],
};
</script>

<style>
body {
  overflow: hidden;
}
</style>
