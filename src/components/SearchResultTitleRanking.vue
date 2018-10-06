<script>
import { HorizontalBar } from 'vue-chartjs'
import HorizontalBarDefault from '@/mixins/horizontalBarDefault.vue'
export default {
  name: 'search-result-user-ranking',
  props: {
    chartData: {
      type: Array
    }
  },
  extends: HorizontalBar,
  mixins: [HorizontalBarDefault],
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
