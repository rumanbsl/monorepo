import Vue from "vue";

type Locale = "en"|"se"|"es"|"fi";
declare module "vue/types/vue" {
  interface Vue {
    $globals: any;
  }
}
