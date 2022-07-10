<template>
  <div>
   <div class="d-flex">
     <div >
       <h1 class="d-flex justify-center ma-4 indigo--text">Température des cours d'eau en continu</h1>
       <h3 class="d-flex justify-start ma-8">Température relevées à des fréquences variant de une minute à quelques heures par des capteurs automatiques dans les cours d'eau.</h3>
     </div>

     <div class="ml-auto ma-4">
       <v-btn class="indigo white--text" @click="showDiagramms">Graphiques</v-btn>
     </div>
   </div>
    <data-table/>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable";
export default {
  name: "ShowTable",
  components: {DataTable},
  methods: {
    showDiagramms() {
      this.$router.push({
        path: '/chart'
      })
    }
  }
}
</script>

<style scoped>

</style>