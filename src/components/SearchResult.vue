<template>
  <div>
    <div v-if="showUserRanking && !loading">
      <search-result-user-ranking :chartData="articles"></search-result-user-ranking>
    </div>
    <div v-if="showTitleRanking && !loading">
      <search-result-title-ranking :chartData="articles"></search-result-title-ranking>
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
import SearchResultTitleRanking from '@/components/SearchResultTitleRanking.vue'
import SearchResultUserRanking from '@/components/SearchResultUserRanking.vue'

export default {
  name: 'search-result',
  components: {
    SearchResultTitleRanking,
    SearchResultUserRanking
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
    },
    showUserRanking () {
      return this.$store.state.showUserRanking
    },
    showTitleRanking () {
      return this.$store.state.showTitleRanking
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
