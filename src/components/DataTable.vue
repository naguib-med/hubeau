<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
          :page="page"
          :pageCount="numberOfPages"
          :headers="headers"
          :items="temperatures"
          :options.sync="options"
          :server-items-length="totalTemperatures"
          :loading="loading"
          :footer-props="{
          showFirstLastPage: true,
           'items-per-page-options': [5, 15, 30, 50, 100, 5000, -1],
            'items-per-page-text':'Chroniques par page',
             firstIcon: 'mdi-skip-previous',
            lastIcon: 'mdi-skip-next',
            prevIcon: 'mdi-chevron-left',
            nextIcon: 'mdi-chevron-right',
          }"
         >

<!--        <template v-slot:[`footer.page-text`]>-->
<!--          <v-pagination-->
<!--              v-model="page"-->
<!--              :length="pageCount">-->
<!--          </v-pagination>-->
<!--        </template>-->
      </v-data-table>
    </v-card>
  </v-container>

</template>

<script>
import axios from "axios";
import {ref} from "vue";

let profondeur  = ref(0)

export default {
  name: "DataTable",
  data() {
    return {
      search: '',
      page: 1,
      totalTemperatures: 0,
      numberOfPages: 0,
      temperatures: [],
      loading: true,
      options: {},
      headers: [
        { text: "Code Station", value: "code_station"},
        { text: "Date mesure", value: "date_mesure_temp"},
        { text: "heure_mesure_temp", value: "heure_mesure_temp"},
        { text: "resultat", value: "resultat", sortable: false  },
        { text: "code_unite", value: "code_unite", sortable: false  },
        { text: "symbole_unite", value: "symbole_unite", sortable: false  }
      ],
    };
  },

  // computed: {
  //   pageCount() {
  //     return parseInt(this.totalPassengers / this.itemsPerPage)
  //   },
  // },
  watch: {
    options: {
      handler() {
        this.readDataFromAPI();
      },
      deep: true,
    },

  },
  methods: {
    //Reading data from API method.
    readDataFromAPI() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      console.log("Page Number ", page, itemsPerPage);

      let pageNumber;
      if (page <= 1) {
        pageNumber = page;
      }
      else  {
        pageNumber = page - 1;
      }

      profondeur.value = pageNumber * itemsPerPage;

      console.log("prof",profondeur.value)

      if (profondeur.value <= 20000) {
        axios
            .get(
                "https://hubeau.eaufrance.fr/api/v1/temperature/chronique?size="+itemsPerPage
                +"&page="+ pageNumber
            )
            .then((response) => {
              this.loading = false;
              this.temperatures = response.data.data;
              this.totalTemperatures = response.data.count;
              this.numberOfPages = this.totalTemperatures / itemsPerPage;
              // this.passengers = response.data.data.map((item) => {
              //   return {
              //     details: {},
              //     ...item
              //   }
              // })
            });
      }



    },
  },
  mounted() {
    this.readDataFromAPI();
  },
}
</script>

<style scoped>

</style>
