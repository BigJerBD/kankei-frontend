<template>
  <div id="App">
    <app-header selection="about"/>
    <div class="background-image"></div>
    <div class="kankei-content-box">

      <div class="single-column">
        <h3 class="textbox-header"><b> Kankei : a kanji graph database</b></h3>
        <p class="textbox-style">
          Kankei is a personal project that has the goal to help
          people to study japanese symbols (Kanji) with the help of graph database technologies
          <br/><br/>
          Studying kanji is a complex task that requires a vast amount of discipline and passion.
          A common way to succeed in this task is to use, for example, flashcards or simply to write
          them multiple times
          until it is remembered. these techniques can be effective but it focuses on learning words
          and symbols
          individually and thus ignores the fact that kanji can be similar and also combined in
          mutliple creative ways.
          <br/><br/>
          Because of that, This tools tries instead to focus on the exploration aspect. By providing
          queries to analyze
          kanji, we hope
          to help the users to explore and to help them understand how each symbols,words,
          components are related
          to each others
          <br/><br/>
          it currently contains 13439 different kanji and 228984 japanese words that are connected
          in a way that it is
          simple yet relevant to understand relation between them.
        </p>
      </div>

      <h3 class="textbox-header"><b> Data Sources </b></h3>
      <div class="double-column">
        <a href="http://www.edrdg.org/jmdict/edict_doc.html"><h4 class="textbox-subheader">
          JMdict</h4></a>
        <p class="textbox-style subtextbox-style">
          created by Jim Breen and now managed by the Electronic Dictionary Research and Development
          Group (EDRDG). <br><br>
          it is a great general dictionary with roughly 170 000 entries and is actively maintained
          by Jim Breen and a
          team
          of volunteers. <br><br>
          it is currently used for all the japanese words in Kankei

        </p>

        <a href="http://nihongo.monash.edu/kanjidic2/index.html"><h4 class="textbox-subheader">
          KANJIDIC2</h4></a>
        <p class="textbox-style subtextbox-style">
          also from Jim Breen/EDRDG <br><br> it is a database of kanji that includes readings,
          meanings and metadata.
          it contains 13108 kanji fully used in Kankei
        </p>

        <a href="http://nihongo.monash.edu//kradinf.html"><h4 class="textbox-subheader">
          RADKFILE</h4></a>
        <p class="textbox-style subtextbox-style">
          also from Jim Breen/EDRDG<br><br> A simple database to get kanji's radicals. Currently
          all the 214 radicals are currently used
        </p>
      </div>

      <div class="double-column">
        <a href="http://kanjivg.tagaini.net/"><h4 class="textbox-subheader">KanjiVG</h4></a>
        <p class="textbox-style subtextbox-style">
          by Ulrich Apel and several contributors,<br> <br> It contains all the strokes and
          subcomponents.
          This was used to understand and map the subcomponents of the kanji
        </p>
        <a href="http://www.kanjipedia.jp/"><h4 class="textbox-subheader">Kanjipedia</h4></a>
        <p class="textbox-style subtextbox-style">
          Japanese Kanji Dictionary website that contains informations about antonyms, synonyms,
          etc.
        </p>
        <a href="https://kanji.jitenon.jp/"><h4 class="textbox-subheader">Kanjijiten-on</h4></a>
        <p class="textbox-style subtextbox-style">
          similar to Kanjipedia, it was used for the same purpose.
          This website contains more kanji and more trustable data compared to Kanjipedia
        </p>
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
</style>
