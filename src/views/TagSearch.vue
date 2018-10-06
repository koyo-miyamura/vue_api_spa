<template>
  <div class="container">
    <h1  class="search-title"><i class="el-icon-search"></i> Tag search</h1>

    <el-form :model="searchForm" ref="searchForm" :inline="true">
      <el-form-item label="タグ" prop="tag" :rules="rules.tag">
        <el-input type='tag' v-model="searchForm.tag" @change.native="submitSearchForm('searchForm')" placeholder="タグ名を入れてね"></el-input>
      </el-form-item>
      <el-form-item label="表示数" prop="items" :rules="rules.items">
        <el-input type='items' v-model.number="searchForm.items" @change.native="submitSearchForm('searchForm')" placeholder="何件表示しますか？"></el-input>
      </el-form-item>
      <el-form-item label="チャート">
        <el-switch v-model="showChart"></el-switch>
      </el-form-item>
    </el-form>

    <section v-if="notFound">
      <p>そのタグは存在しないよ＞＜</p>
    </section>
    <section v-else-if="errored">
      <p>エラーが発生したよ＞＜</p>
    </section>

    <section v-else>
      <search-result :loading="loading" :articles="articles"></search-result>
    </section>
  </div>
</template>

<script>
import SearchResult from '@/components/SearchResult.vue'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.VUE_APP_QIITA_API_KEY}`
axios.defaults.headers.common['Content-Type'] = `application/json`

export default {
  name: 'tag-search',
  components: {
    SearchResult
  },
  data: function () {
    return {
      articles: [],
      loading: true,
      errored: false,
      notFound: false,
      searchForm: {
        tag: 'elixir',
        items: 100
      },
      rules: {
        tag: [
          { type: 'string', message: 'タグ名を入力してね' }
        ],
        items: [
          { required: true, message: '何か入力してね' },
          { type: 'number', min: 0, max: 100, message: '0から100までの整数を入力してね' }
        ]
      }
    }
  },
  computed: {
    api: function () {
      return 'https://qiita.com/api/v2/tags/' + this.searchForm.tag + '/items' + '?per_page=' + this.searchForm.items
    },
    showChart: {
      get () {
        return this.$store.state.showChart
      },
      set (value) {
        return this.$store.commit('setShowChart', value)
      }
    }
  },
  methods: {
    getApiData () {
      // 2回目以降の呼び出し用
      this.loading = true
      this.errored = false
      this.notFound = false
      axios
        .get(this.api)
        .then(response => {
          this.articles = this.filterUserName(this.sortByLikesCountDsc(response.data))
        })
        .catch(error => {
          // tag検索の場合は見つからない場合notFoundを返す
          if (error.response.status === 404) {
            this.notFound = true
          }
          console.log(error)
          this.errored = true
        })
        .finally(() => { this.loading = false })
    },
    submitSearchForm (formRef) {
      // validateのコールバック関数はthisを束縛する必要があるためアロー関数にする
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          this.getApiData()
        }
      })
    },
    // data.userだけ一回層深い ＆ github_login_name,name,idの3パターンある
    filterUserName (data) {
      data.forEach(function (val, idx, array) {
        // usernameのパース
        if (val.user.github_login_name) {
          array[idx]['username'] = val.user.github_login_name
        } else if (val.user.name) {
          array[idx]['username'] = val.user.name
        } else {
          array[idx]['username'] = val.user.id
        }
      })
      return data
    },
    sortByLikesCountDsc (data) {
      data.sort(function (a, b) {
        return b.likes_count - a.likes_count
      })
      return data
    }
  },
  mounted () {
    this.getApiData()
  }
}
</script>

<style scoped>
.search-title {
  color: teal;
}
@media (max-width: 480px ) {
  /* ElementUIはscopedスタイルの場合 >>> 必須 */
  .el-form-item >>> .el-form-item__label {
    width: 100px
  }
}
</style>
