<script>
import { HorizontalBar } from 'vue-chartjs'
import HorizontalBarDefault from '@/mixins/horizontalBarDefault.vue'

export default {
  name: 'search-result-title-ranking',
  props: {
    chartData: {
      type: Array
    }
  },
  extends: HorizontalBar,
  mixins: [HorizontalBarDefault],
  methods: {
    computeUserRanking (array) {
      let userRanking = []
      let pushedUser = []
      array.forEach(function (val) {
        if (!pushedUser.includes(val.username)) {
          pushedUser.push(val.username)
          userRanking.push({ 'username': val.username, 'likes_count': val.likes_count })
        } else {
          userRanking.forEach(function (userRankingVal, idx) {
            if (userRankingVal.username === val.username) {
              userRanking[idx].likes_count += val.likes_count
            }
          })
        }
      })
      return this.sortByLikesCountDsc(userRanking)
    },
    sortByLikesCountDsc (array) {
      array.sort(function (a, b) {
        return b.likes_count - a.likes_count
      })
      return array
    },
    setDataCollection () {
      // 再描画の際に初期化する
      this.dataCollection.labels = []
      this.dataCollection.datasets[0].data = []
      // 最大表示件数はmaxDisplayNumにする
      let userRanking = this.computeUserRanking(this.chartData)
      let setDataNum = Math.min(this.maxDisplayNum, userRanking.length)
      for (let i = 0; i < setDataNum; i++) {
        this.dataCollection.labels[i] = userRanking[i]['username']
        this.dataCollection.datasets[0].data[i] = userRanking[i]['likes_count']
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
