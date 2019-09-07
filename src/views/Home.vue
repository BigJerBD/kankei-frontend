<template>
  <div id="App">
    <app-header selection="data"/>
    <body>
    <app-container/>
    </body>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import AppContainer from '../components/AppContainer.vue';
import '../styles/BaseStyle.css';

export default {
  name: 'Home',
  components: {
    AppContainer,
    AppHeader,
  },
};
</script>

<style>

  .AppContainer {
    width: 100%;
    height: calc(100vh - 80px);
    overflow: hidden;
    display: -ms-flexbox;
    display: flex
  }

</style>
