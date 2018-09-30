<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div class="panel panel-info table-responsive">
      <div class="panel-heading"><b> {{ query }} </b>のQiita記事！</div>
      <content-table :keys="keys" :articles="articles"></content-table>
    </div>
  </div>
</template>

<script>
import ContentTable from '@/components/ContentTable.vue'
export default {
  components: {
    ContentTable
  },
  props: ['keys', 'loading', 'query', 'articles']
}
</script>
