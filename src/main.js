// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Tabs from 'vue-tabs-component';

import EventBus from './tools/messaging';

import Home from './views/Home.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';

Vue.use(Tabs);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

// used for intercomponent communicatiom
Vue.prototype.$eventBus = new EventBus(new Vue());

const routes = {
  // todo :: replace that with an advanced router if necessary
  '/': Home,
  '/home/': Home,
  '/home': Home,
  '/about/': About,
  '/about': About,
  '/contact/': Contact,
  '/contact': Contact,
};

/* eslint-disable no-new */
new Vue({
  el: '#app',

  data: {
    currentRoute: window.location.pathname,
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute];
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});
