Vue.component('content-table', {
  props: ['keys', 'articles'],
  template: `
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
  `
})