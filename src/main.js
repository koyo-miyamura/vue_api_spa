Vue.component('query-serarch-content', {
  props: ['keys', 'loading', 'query', 'articles'],
  template: `
    <div>
      <div v-if="loading">Loading...</div>
      <div class="panel panel-info table-responsive">
        <div class="panel-heading"><b> {{ query }} </b>のQiita記事！</div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th v-for="key in keys">
                {{ key }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="articles.id">
              <td v-for="key in keys">
                <span v-if="key === 'title'">
                  <a :href="article.url">{{ article[key] }}</a>
                </span>
                <span v-else="key === 'title'">
                    {{ article[key] }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})

new Vue({
  el: '#app',
  data: function() {
    return {
      articles: null,
      loading : true,
      errored : false,
      keys : ['username', 'title', 'created_at', 'likes_count'],
      query: 'fukuokaex',
      items: 100
    }
  },
  computed: {
    api : function () {
      return 'https://qiita.com/api/v2/items?per_page=' + this.items + '&query=' + this.query
    }
  },
  methods: {
    getApiData() {
      this.loading = true; // 2回目以降の呼び出し用
      axios
      .get(this.api)
      .then(response => {
        this.articles = this.filterUserName(this.sortByLikesCountDsc(response.data))
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    },
    // data.userだけ一回層深い ＆ github_login_name,name,idの3パターンある
    filterUserName (data) {
      data.forEach(function (val, idx, array) {
        if (val.user.github_login_name) {
          array[idx]['username'] = val.user.github_login_name;
        }else if(val.user.name){
          array[idx]['username'] = val.user.name;
        }else {
          array[idx]['username'] = val.user.id;
        }
      })
      return data;
    },
    sortByLikesCountDsc (data) {
      data.sort(function (a, b) {
        return b.likes_count - a.likes_count
      })
      return data;
    }
  },
  watch: {
    api: function() {
      this.getApiData()
    }
  },
  mounted () {
    this.getApiData()
  }
})
