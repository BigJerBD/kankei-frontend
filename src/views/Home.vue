<template>
  <div v-if="!isMobile" id="App">
    <app-header selection="data"/>
    <body>
    <app-container/>
    </body>
  </div>
  <div v-else id="App">
    <app-header selection="data"/>
    <div class="background-image"></div>
    <div class="kankei-content-box">
      <div class="single-column">
        <h3 class="textbox-header center-text"><b>Mobile not supported</b></h3>
        <p class="textbox-style center-text">
          Unfortunately Kankei can not be used on a mobile device.
          <br><br> Please use a computer to enjoy exploring kanji!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect';
import AppHeader from '../components/AppHeader.vue';
import AppContainer from '../components/AppContainer.vue';
import '../styles/BaseStyle.css';

export default {
  name: 'Home',
  components: {
    AppContainer,
    AppHeader,
  },
  data() {
    return {
      isMobile,
    };
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
