<template>
  <div class="container">
    <h1 class="search-title"><i class="el-icon-search"></i> Keyword search</h1>

    <el-form :model="searchForm" ref="searchForm" :inline="true" class="search-form">
      <el-form-item label="キーワード" prop="query" :rules="rules.query">
        <el-input type='query' v-model="searchForm.query" @change.native="submitSearchForm('searchForm')" placeholder="検索ワードを入れてね"></el-input>
      </el-form-item>
      <el-form-item label="表示数" prop="items" :rules="rules.items">
        <el-input type='items' v-model.number="searchForm.items" @change.native="submitSearchForm('searchForm')" placeholder="何件表示しますか？"></el-input>
      </el-form-item>
    </el-form>
    <el-form class="switch-label" ref="chartSwitch" :inline="true">
      <el-form-item label="ユーザランキング">
        <el-switch v-model="showUserRanking"></el-switch>
      </el-form-item>
      <el-form-item label="記事ランキング">
        <el-switch v-model="showTitleRanking"></el-switch>
      </el-form-item>
    </el-form>

    <section v-if="errored">
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
  name: 'query-search',
  components: {
    SearchResult
  },
  data: function () {
    return {
      articles: [],
      loading: true,
      errored: false,
      searchForm: {
        query: '',
        items: 0
      },
      rules: {
        query: [
          { type: 'string', message: '文字を入力してね' }
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
      return 'https://qiita.com/api/v2/items?per_page=' + this.searchForm.items + '&query=' + this.searchForm.query
    },
    showUserRanking: {
      get () {
        return this.$store.state.showUserRanking
      },
      set (value) {
        return this.$store.commit('setShowUserRanking', value)
      }
    },
    showTitleRanking: {
      get () {
        return this.$store.state.showTitleRanking
      },
      set (value) {
        return this.$store.commit('setShowTitleRanking', value)
      }
    }
  },
  methods: {
    getApiData () {
      // 2回目以降の呼び出し用
      this.loading = true
      this.errored = false
      axios
        .get(this.api)
        .then(response => {
          this.articles = this.filterUserName(this.sortByLikesCountDsc(response.data))
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => { this.loading = false })
    },
    submitSearchForm (formRef) {
      // validateのコールバック関数はthisを束縛する必要があるためアロー関数にする
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          this.$store.commit('setQuery', this.searchForm.query)
          this.$store.commit('setQueryItems', this.searchForm.items)
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
    this.searchForm.query = this.$store.state.querySearch.query
    this.searchForm.items = this.$store.state.querySearch.items
    this.getApiData()
  }
}
</script>

<style scoped>
.search-title {
  color: teal;
}
@media (max-width: 480px) {
  /* ElementUIはscopedスタイルの場合 >>> 必須 */
  .search-form >>> .el-form-item__label {
    width: 90px;
    font-size: 12px;
  }
  .search-form >>> .el-input__inner {
    width: 160px;
  }
  .switch-label >>> .el-form-item__label {
    width: 100px;
    font-size: 11px;
  }
}
</style>
