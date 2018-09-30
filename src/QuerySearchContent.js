Vue.component('query-search-content', {
  props: ['errored', 'keys', 'loading', 'query', 'items', 'articles'],
  template: `
    <div class="container">
      <router-link to="/home">Go to Home</router-link>
      <h1>Vue.js with QiitaAPI</h1>

      <input :value="query" @keyup.enter="$emit('query-input', $event.target.value)" placeholder="検索ワードを入れてね">
      <input :value="items" @keyup.enter="$emit('items-input', $event.target.value)" placeholder="何件表示しますか？">

      <section v-if="errored">
        <p>エラーが発生したよ＞＜</p>
      </section>

      <section v-else>
        <query-search-result :keys="keys" :loading="loading" :query="query" :articles="articles"></query-search-result>
      </section>
    </div>
  `
})
