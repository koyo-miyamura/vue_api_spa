<template>
  <div>
    <div>
      <search-result-chart :chartData="articles"></search-result-chart>
    </div>
    <div>
      <el-table :data="articles" v-loading="loading">
        <el-table-column
          prop="username"
          label="ユーザ名"
          width="150"
          :filters="filterdUser"
          :filter-method="filterUsername">
        </el-table-column>
        <el-table-column label="タイトル">
          <template slot-scope="scope">
            <a class="table-title-link" :href="scope.row.url" target="_blank">{{ scope.row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="likes_count"
          label="いいね数"
          width="150"
          sortable>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="投稿日時"
          width="150"
          sortable
          :formatter="parseDatetime">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import SearchResultChart from '@/components/SearchResultChart.vue'

export default {
  name: 'search-result',
  components: {
    SearchResultChart
  },
  props: {
    loading: {
      type: Boolean
    },
    articles: {
      type: Array
    }
  },
  methods: {
    parseDatetime (row, col) {
      const created = new Date(row.created_at)
      const y = created.getFullYear()
      const m = created.getMonth() + 1
      const d = created.getDate()
      return `${y}-${m}-${d}`
    },
    filterUsername (value, row) {
      return row.username === value
    },
    filterUserList (array) {
      let filters = []
      let pushedUser = []
      array.forEach(function (val) {
        if (!pushedUser.includes(val.username)) {
          pushedUser.push(val.username)
          filters.push({ 'text': val.username, 'value': val.username })
        }
      })
      return filters
    }
  },
  computed: {
    filterdUser: function () {
      return this.filterUserList(this.articles)
    }
  }
}
</script>

<style scoped>
.table-title-link{
  color: teal;
  text-decoration: none;
  font-weight: bold;
}
</style>
