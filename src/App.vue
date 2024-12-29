<template>
  <v-app>
    <v-container>
      <nav-bar />
      <v-main>
        <router-view />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
  import NavBar from "./components/layout/NavBar.vue";

  export default {
    name: "App",
    components: { NavBar },
  };
</script>
