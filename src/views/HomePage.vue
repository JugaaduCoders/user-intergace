<template>
  <v-container>
    <!-- Skeleton loader section -->
    <v-row dense v-if="loading" class="gap-4">
      <v-col v-for="n in 12" :key="n" cols="12" md="4" lg="3">
        <v-skeleton-loader type="image" class="mb-4" height="200" />
        <v-skeleton-loader type="text" class="mt-1" :lines="2" />
      </v-col>
    </v-row>

    <!-- Main Content section -->
    <v-row dense class="gap-2" v-else>
      <v-col v-for="hackathon in hackathons" :key="hackathon.id" cols="12" md="4" lg="3" class="hover-col">
        <v-btn :to="`/hackathon/${hackathon.id}`"
          class="d-flex flex-column align-center justify-center rounded-xl zoom-in-out-element hover-card" elevation="8"
          tile style="
            height: 300px;
            overflow: hidden;
            background-image: url('https://www.kreativdistrikt.com/wp-content/uploads/2024/02/The-Art-of-Successful-Hackathon-Management.webp');
            background-size: cover;
            background-position: center;
          ">
          <!-- Gradient Overlay for Text Readability -->
          <div class="p-4 gradient-overlay">
            <h3 class="text-h6 font-weight-bold">{{ hackathon.name }}</h3>
            <p class="text-body-2 text-muted">
              {{ formattedDate(hackathon.startDate) }}
            </p>
          </div>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { useThemeStore } from "@/store/useThemeStore";
  import { Hackathon } from "@/types";
  import { requestHandler } from "@/utils/request";
  import { computed, onMounted, ref } from "vue";

  const hackathons = ref<Hackathon[]>([]);
  const loading = ref(true);

  onMounted(async () => {
    const res = await requestHandler<Hackathon[]>("GET", "/api/hackathon");
    if (res.success) {
      hackathons.value = res.payload;
    } else {
      console.error("Failed to fetch hackathons");
    }
    loading.value = false;
  });

  const themeStore = useThemeStore();

  const themeClass = computed(() => {
    return themeStore.isDark ? "bg-dark" : "bg-light";
  });

  const formattedDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
</script>

<style scoped>

  .v-skeleton-loader {
    border-radius: 8px;
  }

  .hover-col {
    transition: box-shadow 0.3s ease;
  }

  .hover-col:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .zoom-in-out-element {
    transform: scale(1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .zoom-in-out-element:hover {
    transform: scale(1.15);
    z-index: 2;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  /* Gradient Overlay for Text Readability */
  .gradient-overlay {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
    color: white;
    position: relative;
    z-index: 2;
    margin-top: auto;
  }

  /* Responsive Layout */
  .v-row {
    gap: 14px;
    /* Consistent spacing between cards */
  }

  @media (max-width: 600px) {
    .v-col {
      padding: 4px;
    }
  }
</style>
