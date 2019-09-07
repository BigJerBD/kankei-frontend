<template>
<header class="AppHeader">
  <a id="app-logo" href="home">
    <img  src="../assets/kankei-logo.png"  />
  </a>
  <div id="header-right">

    <template v-if="selection === 'data'">
      <a selected class="menu-button"  href="home">Data</a>
    </template>
    <template v-else>
      <a class="menu-button"  href="home">Data</a>
    </template>

    <template v-if="selection === 'contact'">
      <a selected class="menu-button"  href="contact">Contact</a>
    </template>
    <template v-else>
      <a class="menu-button"  href="contact">Contact</a>
    </template>

    <template v-if="selection === 'about'">
      <a selected class="menu-button"  href="about">About</a>
    </template>
    <template v-else>
      <a class="menu-button"  href="about">About</a>
    </template>
  </div>
</header>
</template>

<script>
import '../styles/BaseStyle.css';

export default {
  name: 'AppHeader',
  props: ['selection'],
  data() {
    return {};
  },
};
</script>

<style>
.AppHeader {
  position: relative;
  clear: left;
  background: rgb(65, 90, 145);
  width: 100%;
  height: 80px;
  top: 0;
  left: 0;
  z-index: 100;
  overflow: hidden;
}
#app-logo {
  float: left;
  width: 230px;
  height: 65px;
  margin: 5px 5px 5px 50px;
  display: block;
}
#app-logo img{
  float: left;
  width: 230px;
  height: 65px;
  display: block;
}

#header-right {
  float: right;
  position: relative;
  font-size: 25px;
  padding-right:20px;
}

#header-right a {
  text-decoration: none;
}
.menu-button:hover, .menu-button[selected]  {
  background-color: #66B245;
  color: white;
}

.menu-button{
  position: relative;
    float: left;
  transition: all 0.20s ease 0s;
  color: white;
  bottom: 0;
  margin: 18px 5px 0px 5px;
  padding: 3px 10px 3px 10px;
  border-radius: 10px;
}

</style>
