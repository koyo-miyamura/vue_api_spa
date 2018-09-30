<template>
  <div class="container">
    <h1>Vue.js with QiitaAPI</h1>

    <input v-model.lazy="query" placeholder="検索ワードを入れてね">
    <input v-model.lazy="items" placeholder="何件表示しますか？">

    <section v-if="errored">
      <p>エラーが発生したよ＞＜</p>
    </section>

    <section v-else>
      <query-search-result :keys="keys" :loading="loading" :query="query" :articles="articles"></query-search-result>
    </section>
  </div>
</template>

<script>
import QuerySearchResult from '@/components/QuerySearchResult.vue'
import axios from 'axios'

export default {
  name: 'index',
  components: {
    QuerySearchResult
  },
  data: function () {
    return {
      articles: null,
      loading: true,
      errored: false,
      keys: ['username', 'title', 'created_at', 'likes_count'],
      query: 'fukuokaex',
      items: 100
    }
  },
  computed: {
    api: function () {
      return 'https://qiita.com/api/v2/items?per_page=' + this.items + '&query=' + this.query
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
    // data.userだけ一回層深い ＆ github_login_name,name,idの3パターンある
    filterUserName (data) {
      data.forEach(function (val, idx, array) {
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
  watch: {
    api: function () {
      this.getApiData()
    }
  },
  mounted () {
    this.getApiData()
  }
}
</script>
