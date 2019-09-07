<template>
  <div id="App">
    <app-header selection="contact"/>
    <div class="background-image"></div>
    <div class="kankei-content-box">

      <div class="single-column">
        <h3 class="textbox-header"><b> contact information</b></h3>
        <div class="textbox-style">
          <p class="center-text">
            you can mail me with this adress :
            <a href="mailto:kankeidata@gmail.com">kankeidata@gmail.com</a>
            <br><br>
            you can also visit my personal github :
            <a href="https://github.com/BigJerBD">github.com/BigJerBD</a>
            <br><br>

            if you find any bug or wish to contribute to this project. <br> I will gladly answer
            back !
          </p>
        </div>
        <h3 class="textbox-header"><b> Make a donation</b></h3>
        <div class="textbox-style">
          <p class="center-text">
            Hosting a website and trying to make it evolve cost time and money.
            <br> Feel free to donate a little bit, it would be greatly appreciated!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import '../styles/BaseStyle.css';
import '../styles/TextContent.css';

export default {
  name: 'Home',
  components: {
    AppHeader,
  },
};
</script>

<style>
  .center-text {
    text-align: center;
  }

</style>
