var api = 'https://qiita.com/api/v2/items?query=js'
var vm = new Vue({
  el: '#app',
  data: function() {
    return {
      articles: null,
      loading : true,
      errored : false,
      keys: ['username', 'title', 'created_at', 'likes_count']
    }
  },
  methods: {
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
    }
  },
  mounted () {
    axios
      .get(api)
      .then(response => {
        this.articles = this.filterUserName(response.data)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
})
