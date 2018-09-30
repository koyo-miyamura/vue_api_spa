<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="key in keys" :key="key">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="article in articles" :key="article.id">
        <td v-for="key in keys" :key="key">
          <span v-if="key === 'title'">
            <a :href="article.url">{{ article[key] }}</a>
          </span>
          <span v-else>
              {{ article[key] }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['keys', 'articles']
}
</script>

<style>

</style>
