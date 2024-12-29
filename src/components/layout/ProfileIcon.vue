<template>
  <v-menu rounded>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="brown" size="small">
          <v-img src="https://avatar.iran.liara.run/public"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar color="brown">
            <v-img src="https://avatar.iran.liara.run/public"></v-img>
          </v-avatar>
          <h3>{{ userStore.user.firstName }}</h3>
          <p class="text-caption mt-1">
            {{ userStore.user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn variant="text" rounded to="/create-hackathon">
            Create Hackathon
          </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn variant="text" rounded to="/" @click="userStore.logout">
            Log Out
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/useUserStore";

const userStore = useUserStore();
</script>
