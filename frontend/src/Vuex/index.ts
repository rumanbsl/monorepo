import Vuex, { StoreOptions } from "vuex";
import pathify, { make } from "vuex-pathify";

export interface IrootState {
  version?: string;
}
interface Istore extends StoreOptions<IrootState> {
  hotUpdate? : any;
}
const state = {};
const mutations = make.mutations(state);
const store: Istore = {
  state,
  mutations,
  plugins : [pathify.plugin],
  strict  : true,
  modules : { },
  getters : {},
  actions : {},
};

if (module.hot) {
  console.log("It's hot");
  // const modules = ["src/Components/Pages/Posts/state"];
  // module.hot.accept(modules, () => {
  //   // eslint-disable-next-line global-require
  //   const newPosts = require("src/Components/Pages/Posts/state").default;
  //   store.hotUpdate({ modules: { Posts: newPosts } });
  // });
}

export default () => new Vuex.Store(store);
