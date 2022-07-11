<template>
  <div>
    <v-container fluid class="pa-md-8">
      <div class="mb-8 pa-md-5 justify-center blue rounded">
        <h2 class="white--text mb-6">
          Les variations des températures d'un cours d'eau sur une période
          sélectionée.
        </h2>

        <h4 style="font-size: 18px">
          Veuillez renseigner tous les champs et selectionner une période.
        </h4>
      </div>
      <v-btn class="d-flex ms-auto" color="primary" @click="goHome">
        Revenir
      </v-btn>
    </v-container>
    <div class="mb-15">
      <chart />
    </div>
  </div>
</template>

<script>
import chart from "@/components/Chart";
export default {
  name: "ChartView",
  components: { chart },
  methods: {
    goHome() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style scoped></style>
