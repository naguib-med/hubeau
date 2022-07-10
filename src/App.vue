<template>
  <v-app>
    <v-app-bar app color="white" dark height="70">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink ml-5 pa-5"
          contain
          src="./assets/logo-hubeau-blue.png"
          transition="scale-transition"
          width="115"
          height="80"
          @click="goHome"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main style="background-color: #fbfcfc">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import router from "./router/index";
export default {
  name: "App",

  data: () => ({
    //
  }),

  methods: {
    goHome() {
      router.push({
        path: "/",
      });
    },
  },
};
</script>

<style>
html,
body {
  font-family: "Nunito", sans-serif;
}
</style>
