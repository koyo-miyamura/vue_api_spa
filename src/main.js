var api = 'https://qiita.com/api/v2/items?query=elixir'
var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      articles: null,
      loading: true,
      errored: false,
      keys: ['id', 'title', 'created_at', 'likes_count']
    }
  },
  mounted () {
    axios
      .get(api)
      .then(response => {
        this.articles = response.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
})
