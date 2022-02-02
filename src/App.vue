<template>
  <router-view />
</template>
<script>
</script>
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
.scroll-hidden{
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
//flex 垂直 居中
.cloumn-center{
  display: flex;
  align-items: center;
}
//水平 垂直居中
.flex-center{
  display: flex;
  -webkit-box-flex: flex;
  justify-content: center;
  align-items: center;
}

//垂直布局
.flex-column{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
//水平对齐
.flex-start{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
button{
  border: none;
  cursor: pointer;
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
