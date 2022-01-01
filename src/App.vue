<template>
  <router-view />
</template>

<style lang="scss">
* {
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #666;
}
li {
  list-style: none;
}
html,body {
  font-size: 14px;
  background-color: #fff;
  
}

html,body{
  //隐藏滚动条 firefox
  scrollbar-width: none;
  //ie
  -ms-overflow-style: none;
  //chrome
  &::-webkit-scrollbar {
    width: 0;
  }

}
hr {
  border-bottom: none;
}
//两端对齐布局
.flex-between{
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
//flex 垂直居中
.cloumn-center{
  display: flex;
  align-items: center;
  
}

#app {
  text-align: center;
  color: #3c3c3c;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
