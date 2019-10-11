import Vue from "vue";
import Router, { RouteConfig, RouterOptions } from "vue-router";

interface IextendedRouteConfig extends RouteConfig {
  class: string;
  title: string;
}

interface IextendedRouterOptions extends RouterOptions {
  routes: IextendedRouteConfig[];
}

Vue.use(Router);
const routerOptions: IextendedRouterOptions = {
  mode   : "history",
  routes : [

  ],
};

export default new Router(routerOptions);
