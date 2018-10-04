<template>
  <div class="container">
    <h1><i class="el-icon-search"></i> Keyword search</h1>

    <el-form :model="searchForm" ref="searchForm" :inline="true">
      <el-form-item label="キーワード" prop="query" :rules="rules.query">
        <el-input type='query' v-model="searchForm.query" @change.native="submitSearchForm('searchForm')" placeholder="検索ワードを入れてね"></el-input>
      </el-form-item>
      <el-form-item label="表示数" prop="items" :rules="rules.items">
        <el-input type='items' v-model.number="searchForm.items" @change.native="submitSearchForm('searchForm')" placeholder="何件表示しますか？"></el-input>
      </el-form-item>
    </el-form>

    <section v-if="errored">
      <p>エラーが発生したよ＞＜</p>
    </section>

    <section v-else>
      <query-search-result :loading="loading" :articles="articles"></query-search-result>
    </section>
  </div>
</template>

<script>
import QuerySearchResult from '@/components/QuerySearchResult.vue'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.VUE_APP_QIITA_API_KEY}`
axios.defaults.headers.common['Content-Type'] = `application/json`

export default {
  name: 'index',
  components: {
    QuerySearchResult
  },
  data: function () {
    return {
      articles: [],
      loading: true,
      errored: false,
      searchForm: {
        query: 'fukuokaex',
        items: 100
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
    }
  },
  methods: {
    getApiData () {
      this.loading = true // 2回目以降の呼び出し用
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
