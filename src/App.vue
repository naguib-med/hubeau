<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
      height="70"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink ml-5 pa-5"
          contain
          src="./assets/logo-hubeau-blue.png"
          transition="scale-transition"
          width="115"
          height="80"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <show-table/>
    </v-main>
  </v-app>
</template>

<script>

import ShowTable from "@/views/ShowTable";
export default {
  name: 'App',

  components: {
    ShowTable
  },

  data: () => ({
    //
  }),
};
</script>
