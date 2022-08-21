import VueCountryDropdown from "./components/vue-country-dropdown.vue";

export default {
  ...VueCountryDropdown,
  install: Vue => {
    Vue.component(VueCountryDropdown.name, VueCountryDropdown);
    return Vue;
  }
};