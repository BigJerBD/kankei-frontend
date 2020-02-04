<template>
<header id="appHeader">
  <a id="app-logo" href="home">
    <img  src="../assets/kankei-logo.png"  />
  </a>

  <div v-if="hasLongWidth()" id="header-right">

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
  <div v-else id="header-right">
    <b-dropdown id="menuDropdown"  variant="success" right text="Menu" class="m-md-2">
      <b-dropdown-item selected v-if="selection === 'data'" b-dropdown-item href="home">
        Home
        </b-dropdown-item>
      <b-dropdown-item v-else href="home">Home</b-dropdown-item>

      <b-dropdown-item selected v-if="selection === 'contact'" b-dropdown-item href="contact">
        Contact
        </b-dropdown-item>
      <b-dropdown-item v-else href="contact">Contact</b-dropdown-item>

      <b-dropdown-item selected v-if="selection === 'about'" b-dropdown-item href="about">
        About
        </b-dropdown-item>
      <b-dropdown-item v-else href="about">About</b-dropdown-item>
    </b-dropdown>
  </div>
</header>
</template>

<script>
import '../styles/BaseStyle.css';

export default {
  name: 'AppHeader',
  props: ['selection'],
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  methods: {
    hasLongWidth() {
      return window.width > 625;
    },
    handleResize() {
      window.width = window.innerWidth;
      window.height = window.innerHeight;
      this.$forceUpdate();
    },
  },
};
</script>

<style>
#appHeader {
  position: relative;
  display: flex;
  clear: left;
  background: rgb(65, 90, 145);
  width: 100%;
  height: 80px;
  top: 0;
  left: 0;
  z-index: 100;
  overflow-y: visible;
}
#app-logo {
  flex-shrink: 1;
  max-width: 230px;
  height: 65px;
  margin: 5px 5px 5px 25px;

}
#app-logo img{
  float: left;
  width: 100%;
  height: 100%;
  display: block;
}

#header-right {
  margin-left: auto;
  order: 2;
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

#menuDropdown {
   margin-top: 12px;
}
#menuDropdown .btn-success {
  margin-top: 12px;
  background-color: #66B245;
  border-width: 0px;
}

#menuDropdown .dropdown-menu {
  background-color: rgb(78, 111, 183);
  border-width: 0px
}

#menuDropdown .dropdown-item {
  color: white;
  border-radius: 5px;
}
#menuDropdown li{
  margin: 5px;
}
#menuDropdown .dropdown-item:hover , #menuDropdown  .dropdown-item[selected] {
  background-color: rgb(65, 90, 145);
}


</style>
