<script setup lang="ts">
defineOptions({
  name: 'headI'
})
</script>

<template>
  <div class="outDiv">
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="font" href="#" style="font-size: 20px">Rabbit</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link font" @click="$router.push('/articeHome')">首页 <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link font" @click="$router.push('/all')">发现</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link font dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
              娱乐
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" @click="$router.push('/recreation')">相册</a>
              <a class="dropdown-item" @click="$router.push('/msgboard')">留言条</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link font" @click="$router.push('/gy')">关于我</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2 font pyhoder" type="search" style="background:none;" placeholder="Search" aria-label="Search">
          <button class="font btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.outDiv{
  border: 0px solid red;
}
a{
  text-decoration: none;
  cursor: pointer;
}
</style>
