<template>
  <div>
    <v-container fluid class="pa-md-8">
      <div class="mb-8 pa-md-5 justify-center blue">
        <h2 class="white--text mb-6">
          Les grahiques ci-dessous pour permet de consulter les variations des
          températures d'un cours d'eau sur une période sélectionée.
        </h2>

        <h4 style="font-size: 18px">Veuillez selectionner une période.</h4>
      </div>
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
};
</script>

<style scoped></style>
