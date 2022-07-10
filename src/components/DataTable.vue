<template>
  <v-container fluid
  >

    <v-alert
        dense
        outlined
        type="error"
        v-if="errorProfondeur"
        id="alertPro"
    >
      La profondeur d'accès aux résultats est  <strong>: 20000</strong>
    </v-alert>

    <div class="elevation-2 pa-md-5">
      <v-data-table
          :page="page"
          :pageCount="numberOfPages"
          :headers="headers"
          :items="temperatures"
          :options.sync="options"
          :server-items-length="totalTemperatures"
          :loading="loading"
          :search="filterTemp"
          :footer-props="{
          showFirstLastPage: true,
           'items-per-page-options': [5, 15, 30, 50, 100, 1000, 5000, -1],
            'items-per-page-text':'Chroniques par page',
             firstIcon: 'mdi-skip-previous',
            lastIcon: 'mdi-skip-next',
            prevIcon: 'mdi-chevron-left',
            nextIcon: 'mdi-chevron-right',
          }"
      >

        <template v-slot:[`item.uri_station`]="{ item }">
          <a :href="item.uri_station">{{ item.uri_station }}</a>
        </template>

        <template v-slot:[`item.uri_cours_eau`]="{ item }">
          <a :href="item.uri_cours_eau">{{ item.uri_cours_eau }}</a>
        </template>

        <template v-slot:top>
          <v-row class="d-flex">
            <v-col cols="2" class="mr-auto">
              <v-text-field
                  v-model="filterTemp"
                  label="Rechercher par département"
                  class="mx-4"
                  solo
              ></v-text-field>
            </v-col>

            <v-col cols="2" >
              <v-select
                  :items="itemsDepart"
                  label="Code département"
                  solo
                  v-model="codeDepart"
              ></v-select>
            </v-col>

            <v-col cols="2" >
              <v-select
                  :items="itemsStation"
                  label="Code station"
                  solo
                  v-model="codeStation"
              ></v-select>
            </v-col>

            <v-col cols="1">
              <v-select
                  :items="items"
                  label="Order"
                  solo
                  v-model="toggleSort"
              ></v-select>
            </v-col>

            <v-col cols="1" >
              <v-menu
                  offset-y
              >
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                      color="green"
                      large
                      class="white--text"
                      v-bind="attrs"
                      v-on="on"
                      @click="exportCSV"
                  >
                    Export CSV
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                      v-for="item in items"
                      :key="item"
                      link
                  >
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
<!--              <v-btn color="green" class="white&#45;&#45;text" large @click="exportCSV">-->
<!--                Export CSV-->
<!--              </v-btn>-->
            </v-col>
          </v-row>


        </template>
      </v-data-table>
    </div>


    <div class="d-flex mt-5" v-if="errorProfondeur">
      <div class="pa-2 mx-auto" >
        <span class="error--text"  ><strong>Something is wrong ! go to the top of the page</strong></span>
      </div>
      <div class="pa-2 mx-auto" >
        <v-btn color="primary" @click="scrollToElement" >
          Top
        </v-btn>
      </div>
    </div>
<!--    <v-row class="d-flex ma-6">-->
<!--        <v-col>-->
<!--        </v-col>-->
<!--        <v-col>-->
<!--        </v-col>-->
<!--    </v-row>-->


  </v-container>

</template>

<script>
import axios from "axios";
import {ref} from "vue";
import { saveAs } from 'file-saver'


let profondeur  = ref(0)
// let currentPage = ref(1)

export default {
  name: "DataTable",
  components: {
  },
  data() {
    return {
      toggleSort: 'asc',
      items: ['asc', 'desc'],
      itemsDepart: [
          45,
          33
      ],
      itemsStation : [],
      codeStation: '',
      // sortBy: "resultat",
      // sortAsc: false,
      errorProfondeur: false,
      filterTemp: '',
      page: 1,
      codeDepart: '',
      totalStations: 0,
      stations: [],
      totalTemperatures: 0,
      numberOfPages: 0,
      temperatures: [],
      loading: true,
      options: {},
      headers: [
        { text: "Code Station", value: "code_station"},
        { text: "libelle_station", value: "libelle_station", sortable: false  },
        { text: "uri_station", value: "uri_station", sortable: false  },
        { text: "longitude", value: "longitude", sortable: false  },
        { text: "latitude", value: "latitude", sortable: false  },
        { text: "code commune", value: "code_commune", sortable: false  },
        { text: "libelle_commune", value: "libelle_commune", sortable: false  },
        { text: "code_cours_eau", value: "code_cours_eau", sortable: false  },

        { text: "uri_cours_eau", value: "uri_cours_eau", sortable: false  },
        { text: "code_parametre", value: "code_parametre", sortable: false  },
        { text: "libelle_parametre", value: "libelle_parametre", sortable: false  },

        { text: "Date mesure temp", value: "date_mesure_temp"},
        { text: "Heure mesure temp", value: "heure_mesure_temp"},
        { text: "Resultat", value: 'resultat' },
        { text: "Code unite", value: "code_unite", sortable: false  },
        { text: "Symbole unite", value: "symbole_unite", sortable: false  },

        { text: "code_qualification", value: "code_qualification", sortable: false  },
        { text: "libelle_qualification", value: "libelle_qualification", sortable: false  },

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

    toggleSort: function() {
      this.readDataFromAPI();
    },

    codeDepart: function (){
      this.readDataStationsFromAPI();
    },

    codeStation: function() {
      this.readDataFromAPI();
    },



  },
  methods: {
    exportCSV() {
      axios.get("https://hubeau.eaufrance.fr/api/v1/temperature/chronique.csv", {
        responseType: 'blob'
      })
          .then((response) => {
            saveAs(response.data, 'file.csv')
          })
    },
    scrollToElement() {
      const el = this.$el.querySelector("#alertPro");
      if (el) {
        el.scrollIntoView();
      }
    },

    //Reading data from API method.
    readDataStationsFromAPI() {
      console.log(this.codeDepart)
      this.itemsStation = [];
      axios
          .get(
              "https://hubeau.eaufrance.fr/api/v1/temperature/station?code_departement="+this.codeDepart+"&size=20&exact_count=true"
          )
          .then((response) => {
            this.stations = response.data.data;
            console.log(this.stations)
            let st;
            for (st in this.stations) {
              this.itemsStation.push(this.stations[st].code_station);
            }
            this.totalStations = response.data.count;
          });
    },
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

      if (profondeur.value <= 10000) {
        console.log("entrée")
        axios
            .get(
                "https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station="+this.codeStation+"&size="+itemsPerPage+"&sort="+this.toggleSort
                +"&page="+ pageNumber
            )
            .then((response) => {
              this.loading = false;
              this.temperatures = response.data.data;
              console.log(this.temperatures)
              this.totalTemperatures = response.data.count;
              this.numberOfPages = this.totalTemperatures / itemsPerPage;
              // this.temperatures = response.data.data.map((item) => {
              //   return {
              //     details: {},
              //     ...item
              //   }
              // })
            });
      }
      else {
        this.errorProfondeur = true
        this.scrollToElement();
      }


    },
  },
  mounted() {
    this.readDataFromAPI();
  },

  computed: {
  }
}
</script>

<style scoped>

</style>
