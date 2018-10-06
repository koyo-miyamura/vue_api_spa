<script>
import { HorizontalBar } from 'vue-chartjs'
export default {
  name: 'search-result-user-ranking',
  props: {
    chartData: {
      type: Array
    }
  },
  extends: HorizontalBar,
  data: function () {
    return {
      maxDisplayNum: 15,
      dataCollection: {
        labels: [],
        datasets: [
          {
            label: 'いいね数',
            backgroundColor: '#2E827F',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0,
                fontSize: 14
              }
            }
          ],
          yAxes: [
            {
              display: true,
              barPercentage: 0.7,
              categoryPercentage: 0.7,
              ticks: {
                fontSize: 14
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    setDataCollection () {
      // 再描画の際に初期化する
      this.dataCollection.labels = []
      this.dataCollection.datasets[0].data = []
      // 最大表示件数はmaxDisplayNumにする
      let setDataNum = Math.min(this.maxDisplayNum, this.chartData.length)
      for (let i = 0; i < setDataNum; i++) {
        this.dataCollection.labels[i] = this.chartData[i]['title']
        this.dataCollection.datasets[0].data[i] = this.chartData[i]['likes_count']
      }
    }
  },
  watch: {
    chartData: function () {
      this.setDataCollection()
      this.renderChart(this.dataCollection, this.options)
    }
  },
  mounted () {
    this.setDataCollection()
    this.renderChart(this.dataCollection, this.options)
  }
}
</script>
