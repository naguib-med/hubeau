<template>
  <div>
    <v-container fluid class="pa-md-8">
      <div class="mb-8">
        <h2 class="indigo--text">
          Les grahiques ci-dessous pour permet de consulter les variations des
          températures d'un cours d'eau sur une période sélectionée.
        </h2>
      </div>
    </v-container>
    <div>
      <chart />
    </div>
  </div>
</template>

<script>
import chart from "@/components/Chart";
export default {
  name: "ChartView",
  components: { chart },
};
</script>

<style scoped></style>
