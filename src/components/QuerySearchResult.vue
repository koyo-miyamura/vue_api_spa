<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div class="panel panel-info table-responsive">
      <div class="panel-heading"><b> {{ query }} </b>のQiita記事！</div>
      <el-table :data="articles">
        <el-table-column
          prop="username"
          label="ユーザ名"
          width="150">
        </el-table-column>
        <el-table-column label="タイトル">
          <template scope="scope">
            <a class="table-title-link" :href="scope.row.url" target="_blank">{{ scope.row.title }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="投稿日時"
          width="200"
          sortable>
        </el-table-column>
        <el-table-column
          prop="likes_count"
          label="いいね数"
          width="150"
          sortable>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['loading', 'query', 'articles']
}
</script>

<style scoped>
.table-title-link{
  color: teal;
  text-decoration: none;
  font-weight: bold;
}
</style>
