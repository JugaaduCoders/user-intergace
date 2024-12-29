<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" class="mb-4">
            <v-img
              src="https://i.ibb.co/4fTY6Gx/DALL-E-2024-12-25-11-04-17-A-modern-and-vibrant-hackathon-scene-showing-a-diverse-group-of-people-co.webp"
              alt="Hackathon Image" height="250" cover
              class="rounded-lg transition-all duration-500 ease-in-out transform hover:scale-105"></v-img>
          </v-col>

          <v-col cols="12" md="6" class="d-flex flex-column align-start gap-2">
            <v-col>
              <v-btn color="primary" @click="registerNow"
                class="transition-all duration-300 ease-in-out transform hover:scale-115 max-width-420 pl-20">
                Register Now
              </v-btn>
            </v-col>

            <v-col class="d-flex flex-row">
              <p class="text-body-1 font-weight-bold mr-3">
                Registration End Date :
              </p>
              <p class="text-body-1 font-weight-light text-muted">
                {{ hackathon?.registrationDeadline ? formattedDate(hackathon?.registrationDeadline) : 'No DeadLine' }}
              </p>
            </v-col>
          </v-col>

          <v-col cols="12" md="6">
            <v-col>
              <v-chip v-for="theme in hackathon?.themes?.split(',')" v-bind:key="theme" color="green" dark>{{ theme
                }}</v-chip>
            </v-col>
            <v-col>
              <v-chip color="blue" dark>{{ hackathon?.maxTeamSize }} Team Size</v-chip>
            </v-col>
          </v-col>
        </v-row>

        <v-divider class="my-6"></v-divider>

        <v-row class="gap-2">
          <v-col cols="12">
            <h2 class="display-2 font-weight-bold">{{ hackathon?.name }}</h2>
          </v-col>
          <v-col cols="12">
            <p class="text-body-1 font-weight-light text-muted">
              {{ hackathon?.startDate && formattedDate(hackathon?.startDate) }} -
              {{ hackathon?.endDate && formattedDate(hackathon?.endDate) }}
            </p>
          </v-col>
          <v-col cols="12">
            <p class="text-body-2">{{ hackathon?.overview }}</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6" class="my-4">
            <v-card elevation="5" :class="{ 'v-card-dark': themeStore.isDark }"
              class="transition-all duration-300 ease-in-out hover:shadow-2xl pa-6">
              <h3 class="font-weight-medium">Eligibility</h3>
              <p>{{ hackathon?.requirements }}</p>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" class="my-4">
            <v-card elevation="5" :class="{ 'v-card-dark': themeStore.isDark }"
              class="transition-all duration-300 ease-in-out hover:shadow-2xl pa-6">
              <h3 class="font-weight-medium">Prizes</h3>
              <p>{{ hackathon?.prizes }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { useThemeStore } from "@/store/useThemeStore";
  import { Hackathon } from "@/types";
  import { requestHandler } from "@/utils/request";
  import { formattedDate } from '@/utils/time';
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  const hackathon = ref<Hackathon>();
  const loading = ref(true);
  const themeStore = useThemeStore()


  const route = useRoute();
  const queryParams = route.params.id;


  onMounted(async () => {
    const res = await requestHandler<Hackathon>("GET", "/api/hackathon/" + queryParams);
    console.log(res)

    if (res.success) {
      hackathon.value = res.payload;
    } else {
      console.error("Failed to fetch hackathon");
    }
    loading.value = false;
  });

  const registerNow = () => {
    console.log("Redirect to registration page");
  };


</script>

<style scoped>
  .v-img {
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
  }

  .v-card {
    background-color: var(--v-card-background);
    color: var(--v-card-text);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
  }

  .v-card-dark {
    background-color: #333333;
    color: #e0e0e0;
  }

  .v-chip {
    margin-right: 8px;
  }

  .v-btn {
    transition: background-color 0.3s, transform 0.3s;
  }

  .v-btn:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  .v-card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h2.display-2 {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--v-primary-text-color);
  }

  p.text-body-2 {
    font-size: 1.1rem;
    color: var(--v-secondary-text-color);
  }
</style>
