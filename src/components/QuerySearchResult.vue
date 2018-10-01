<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div class="panel panel-info table-responsive">
      <div class="panel-heading"><b> {{ query }} </b>のQiita記事！</div>
      <el-table
      :data="articles"
      style="width: 100%">
        <el-table-column
          prop="username"
          label="username"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="Name">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="created_at"
          sortable>
        </el-table-column>
        <el-table-column
          prop="likes_count"
          label="likes_count"
          sortable>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['keys', 'loading', 'query', 'articles']
}
</script>
