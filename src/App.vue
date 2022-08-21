<template>
  <div id="app">
    <h2 class="title">Vue Country Dropdown 2</h2>
    <vue-country-dropdown-2 
      :showNotSelectedOption="true"
      :defaultCountry="defaultCountry"
      :immediateCallSelectEvent="true"
      @onSelect="countrySelected"
    />
    <div class="description" v-if="country">
      {{ 
        `{ 
          flag: "${country.flag}", 
          name: "${country.name}", 
          isoCode: "${country.isoCode}", 
          phoneCode: "${country.phonecode}" 
        }` 
      }}
    </div>
    <button @click="test">
      Test
    </button>
  </div>
</template>

<script>
import VueCountryDropdown2 from './components/vue-country-dropdown.vue';

export default {
  name: 'App',
  components: {
    VueCountryDropdown2,
  },
  data() {
    return {
      country: null,
      defaultCountry: "TR",
    }
  },
  methods: {
    countrySelected(country) {
      this.country = country;
    },
    test() {
      this.defaultCountry = this.defaultCountry === "TR" ? "AL" : "TR";
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #2c3e50;
  margin-top: 6vh;
}
.title {
  margin-bottom: 2.5vh;
}
.description {
  margin-top: 2.5vh;
  font-weight: 700;
}
</style>
