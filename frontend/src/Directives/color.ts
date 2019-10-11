import { DirectiveOptions } from "vue";

const colorDirective: DirectiveOptions = {
  inserted(el, node) {
    el.style.backgroundColor = node.value.background;
    el.style.color = node.value.color;
  },
};

export default colorDirective;
