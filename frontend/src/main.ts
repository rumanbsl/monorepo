import ApolloBoost from "apollo-boost";
import Vue from "vue";
import VueApollo from "vue-apollo";
import Vuex from "vuex";
import VueI18n from "vue-i18n";

import "./Assets/css/index.scss";

import App from "./App.vue";
import router from "./Routes";
import store from "./Vuex";
/* PLUGINS */
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueApollo);

const defaultClient = new ApolloBoost({ uri: "/graphql" });
const apolloProvider = new VueApollo({ defaultClient });

export const app = new Vue({
  apolloProvider,
  router,
  store : store(),
  el    : "#app",
  render(load) { return load(App); },
});

export default defaultClient;
