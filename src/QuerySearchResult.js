Vue.component('query-search-result', {
  props: ['keys', 'loading', 'query', 'articles'],
  template: `
    <div>
      <div v-if="loading">Loading...</div>
      <div class="panel panel-info table-responsive">
        <div class="panel-heading"><b> {{ query }} </b>のQiita記事！</div>
        <content-table :keys="keys" :articles="articles"></content-table>
      </div>
    </div>
  `
})
