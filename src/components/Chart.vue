<template>
  <div>
    <v-row>
      <v-col cols="2">
        <v-select
            :items="datesMesure"
            label="Date Mesure"
            solo
            v-model="dateMesureTemp"
        ></v-select>
      </v-col>
    </v-row>

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


</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import axios from "axios";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Graphique",
  components: {
    Bar
  },

  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      datesMesure: ['2008-07-01'],
      dateMesureTemp: '',
      temperatures: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Cours d'eau",
            backgroundColor: '#0D47A1',
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
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

    dateMesureTemp: function() {
      this.readDataFromAPI();
    },
  },

  methods: {
    readDataFromAPI() {
      axios
          .get(
             " https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=01001336&size=20&sort=asc&page=1"
          )
          .then((response) => {
            this.temperatures = response.data.data;
            // tab = response.data.data
            for (let temp in this.temperatures) {
              if (this.temperatures[temp].code_cours_eau === "E1820700" && this.dateMesureTemp === this.temperatures[temp].date_mesure_temp) {
                this.chartData.labels.push(this.temperatures[temp].heure_mesure_temp);
                this.chartData.datasets[0].data.push(this.temperatures[temp].resultat)
              }
            }
          });


    }
  }

}
</script>

<style scoped>

</style>