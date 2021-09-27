<script setup lang="ts">
import { nextTick, onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRouter } from "vue-router";
import auth from "../../shared/auth";

interface IContact {
  id: number;
  name: string;
  email: string;
  message: string;
}

const apiUrl = "https://contact-me-api.vercel.app";
const router = useRouter();
const contacts = ref<IContact[]>([]);
const renderList = ref(true);

function handleSignOut() {
  auth.SignOut();
}

async function handleDelete(id: number, index: number) {
  try {
    const res = await axios.get(
      `${apiUrl}/contacts/delete/${auth.UserData()?.id}/${id}`
    );

    contacts.value.splice(index, 1);

    reRenderList();

    alert(res.data.message);
  } catch (err) {
    alert("An unexpected error occurred, try again!");
  }
}

function reRenderList() {
  renderList.value = false;
  nextTick(() => {
    renderList.value = true;
  });
}

onMounted(async () => {
  const res = await axios.get(
    `${apiUrl}/contacts/get/all/${auth.UserData()?.id}`
  );

  contacts.value = res.data.contacts;
});

onBeforeMount(() => {
  if (!auth.UserData()?.id) {
    router.push("/login");
  }
});
</script>

<template>
  <div>
    <button @click="handleSignOut">Sign Out</button>

    <div class="contacts" v-if="renderList">
      <div
        class="contact"
        v-for="(contact, index) in contacts"
        :key="contact.id"
      >
        <h3>{{ contact.name }} - {{ contact.id }}</h3>
        <p>
          <strong>{{ contact.email }}</strong>
        </p>

        <p>{{ contact.message }}</p>

        <button @click="handleDelete(contact.id, index)">Delete Contact</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
