<template>
  <div>
    <div class="ma-4 rounded light-blue pa-md-5">
      <h1 class="mb-5 justify-center d-flex">
        Température des cours d'eau en continu
      </h1>
      <h3 class="white--text">
        Température relevées à des fréquences variant de une minute à quelques
        heures par des capteurs automatiques dans les cours d'eau.
      </h3>
      <div class="d-flex ma-4">
        <v-btn class="warning ms-auto" @click="showDiagramms"
          >Voir graphiques</v-btn
        >
      </div>
    </div>
    <data-table />
  </div>
</template>

<script>
import DataTable from "@/components/DataTable";
export default {
  name: "ShowTable",
  components: { DataTable },
  methods: {
    showDiagramms() {
      this.$router.push({
        path: "/chart",
      });
    },
  },
};
</script>

<style scoped></style>
