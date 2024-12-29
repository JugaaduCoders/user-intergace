<template>
  <v-btn density="default" :color="color || !themeStore.isDark ? 'primary' : 'default'" @click="clickHandler">{{ label
    || "Submit" }}
  </v-btn>
</template>

<script setup lang="ts">
  import { useThemeStore } from "@/store/useThemeStore";

  defineProps<{
    color?: string;
    label?: string;
    clickHandler: () => void;
  }>();

  const themeStore = useThemeStore();
</script>
