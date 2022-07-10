<template>
  <div>
    <div >
      <h1 class="d-flex justify-center ma-4 indigo--text">Température des cours d'eau en continu</h1>
      <h3 class="d-flex justify-start ma-8">Température relevées à des fréquences variant de une minute à quelques heures par des capteurs automatiques dans les cours d'eau.</h3>
    </div>
    <data-table/>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable";
export default {
  name: "ShowTable",
  components: {DataTable}

}
</script>

<style scoped>

</style>