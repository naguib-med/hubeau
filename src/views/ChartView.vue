<template>
  <v-container class="pa-md-5 indigo--text">
    <div class="mb-8">
      <h2>Graphiques permettant de consulter les variations des températures d'un cours d'eau sur une période sélectionée.</h2>
    </div>
    <chart/>
  </v-container>
</template>

<script>
import chart from "@/components/Chart";
export default {
  name: "ChartView",
  components: {chart}
}
</script>

<style scoped>

</style>