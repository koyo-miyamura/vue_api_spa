<template>
  <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="logo"><router-link to="/home" tag="li" class="logo">Qiita search</router-link></el-menu-item>
    <el-menu-item class="xs-not-show" index="/home"><router-link to="/home" tag="li">Home</router-link></el-menu-item>
    <el-submenu index="Search">
      <template slot="title">Search</template>
      <el-menu-item index="/"><router-link to="/" tag="li">Keyword</router-link></el-menu-item>
      <el-menu-item index="/tag"><router-link to="/search/tag" tag="li">Tag</router-link></el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'the-header'
}
</script>

<style scoped>
.logo {
  font-size: 1.5em;
  color: #303133;
  font-weight: bold;
}
@media (max-width: 480px) {
  .xs-not-show {
    display: none
  }
}
</style>
