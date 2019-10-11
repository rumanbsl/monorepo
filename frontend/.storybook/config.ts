import { addDecorator, configure } from "@storybook/vue";
import {withInfo} from "storybook-addon-vue-info";
import VueI18n from "vue-i18n";

import Vue from "vue";
import Vuex from "vuex";
import "@/assets/styles/index.scss";

Vue.use(Vuex);
Vue.use(VueI18n);

// @ts-ignore
addDecorator(withInfo);

// Register custom components.
const req = require.context("@/components", true, /\.story\.(js|ts)$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
