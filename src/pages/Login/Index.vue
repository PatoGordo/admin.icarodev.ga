<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import auth from "../../shared/auth";

const router = useRouter();

const key = ref("");

async function handleSubmit() {
  try {
    await auth.SignIn(key.value);

    router.push("/");
  } catch (err) {}
}

onBeforeMount(() => {
  if (auth.UserData()?.id) {
    router.push("/");
  }
});
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit()">
      <input type="text" v-model="key" placeholder="Your access key" required />
      <button type="submit">SignIn</button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
