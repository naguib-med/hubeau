<template>
  <div>
    <div class="ml-10">
      <v-row class="d-flex justify-center">
        <v-col cols="2">
          <v-select
            :items="itemsDepart"
            label="Code département"
            solo
            outlined
            v-model="codeDepart"
          ></v-select>
        </v-col>

        <v-col cols="2">
          <v-select
            :items="itemsStation"
            label="Code station"
            solo
            outlined
            v-model="codeStation"
          ></v-select>
        </v-col>

        <v-col cols="2">
          <v-select
            :items="listCodeCoursEau"
            label="Code cours d'eau"
            outlined
            solo
            v-model="codeCoursEau"
          ></v-select>
        </v-col>

        <v-col cols="2">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateDebut"
                label="Date debut mesure"
                prepend-icon="mdi-calendar"
                readonly
                solo
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateDebut"
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="2">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFin"
                label="Date fin mesure"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                solo
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateFin"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </div>

    <div class="container mt-7">
      <div class="elevation-5 pa-md-5">
        <Bar
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
        />
      </div>

      <div class="mt-7 elevation-5 pa-md-5">
        <Doughnut
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import { Doughnut } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Graphique",
  components: {
    Bar,
    Doughnut,
  },

  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      itemsDepart: [45, 33],
      codeDepart: "",
      dateDebut: "",
      dateFin: "",
      menu1: false,
      menu2: false,
      listCodeCoursEau: [],
      codeCoursEau: "",
      itemsStation: [],
      codeStation: "",
      temperatures: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Températures d'un cours d'eau",
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00695C",
              "#004D40",
              "#00D8FF",
              "#DD1B16",
              "#F44336",
              "#A7FFEB",
              "#64FFDA",
              "#1DE9B6",
              "#00BFA5",
              "#4A148C",
              "#3F51B5",
              "#B388FF",
              "#004D40",
              "#80CBC4",
              "#4DB6AC",
              "#26A69A",
              "#00897B",
              "#00796B",
            ],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.readDataFromAPI();
  },
  watch: {
    options: {
      handler() {
        this.readDataFromAPI();
      },
      deep: true,
    },

    dateFin: function () {
      this.readDataFromAPI();
    },

    codeDepart: function () {
      this.readDataStationsFromAPI();
    },

    codeStation: function () {
      this.readDataFromAPI();
    },
  },

  methods: {
    readDataStationsFromAPI() {
      this.itemsStation = [];
      axios
        .get(
          "https://hubeau.eaufrance.fr/api/v1/temperature/station?code_departement=" +
            this.codeDepart +
            "&size=50&exact_count=true"
        )
        .then((response) => {
          this.stations = response.data.data;
          let st;
          for (st in this.stations) {
            this.itemsStation.push(this.stations[st].code_station);
          }
          this.totalStations = response.data.count;
        });
    },
    readDataFromAPI() {
      this.listCodeCoursEau = [];
      this.chartData.labels = [];
      axios
        .get(
          " https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=" +
            this.codeStation +
            "&size=100&sort=desc&page=1"
        )
        .then((response) => {
          console.log(response);
          this.temperatures = response.data.data;
          for (let temp in this.temperatures) {
            if (this.temperatures[temp].code_cours_eau) {
              this.listCodeCoursEau.push(
                this.temperatures[temp].code_cours_eau
              );
            }
            if (
              this.temperatures[temp].code_cours_eau === this.codeCoursEau &&
              this.dateDebut <= this.temperatures[temp].date_mesure_temp &&
              this.dateFin >= this.temperatures[temp].date_mesure_temp
            ) {
              this.chartData.labels.push(
                this.temperatures[temp].heure_mesure_temp
              );
              this.chartData.datasets[0].data.push(
                this.temperatures[temp].resultat
              );
            }
          }
        });
    },
  },
};
</script>

<style scoped></style>
