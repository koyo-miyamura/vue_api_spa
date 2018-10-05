<template>
  <div class="jumbotron">
    <h1>Qiita Search</h1>
    <p><b>最新100件</b>の投稿をQiita APIから検索するSPA (古い投稿は表示しません)</p>
    <p>by Koyo
      &nbsp;<a href="https://github.com/koyo-miyamura"><font-awesome-icon :icon="[ 'fab', 'github' ]" /></a>
      &nbsp;<a href="https://twitter.com/koyomiyamura"><font-awesome-icon :icon="[ 'fab', 'twitter' ]" /></a>
    </p>
  </div>
</template>

<style scoped>
a {
  color: inherit;
}
.jumbotron {
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  color: inherit;
  background-color: #e1f4f3;
  border-radius: 4px;
}
.jumbotron h1 {
  font-size: 36px;
  text-align: center;
  color: inherit;
}
.jumbotron p {
  text-align: center;
  margin-bottom: 15px;
  font-weight: 200;
}
.jumbotron .container {
  max-width: 100%;
}
@media screen and (min-width: 768px) {
  .jumbotron {
    padding-top: 48px;
    padding-left: 60px;
    padding-right: 60px;
    padding-bottom: 48px;
  }
  .jumbotron h1 {
    font-size: 72px;
  }
  .jumbotron p {
    font-size: 24px;
  }
}
</style>
