<template>
  <div id="app">
    <h2 class="title">Vue Country Dropdown 2</h2>
    <vue-country-dropdown
      @onSelect="countrySelected"
      :preferredCountries="['TR', 'US', 'GB']"
      :defaultCountry="defaultCountry"
      :immediateCallSelectEvent="true"
      :enabledFlags="true"
      :enabledName="true"
      :enabledPhonecode="true"
      :showNotSelectedOption="true"
      :notSelectedOptionText="'Not Selected'"
      :disabled="false"
      :clearable="false"
      :multiple="false"
      :searchable="true"
      :closeOnSelect="true"
      :placeholder="'Select a country'"
      :countryNameTranslation="'tr'"
    />
    <div class="description" v-if="country">
      {{ 
        `{ 
          flag: "${country.emoji}", 
          name: "${country.name}", 
          isoCode: "${country.iso2}", 
          phoneCode: "${country.phone_code}" 
        }` 
      }}
    </div>
  </div>
</template>

<script>
import VueCountryDropdown from './components/vue-country-dropdown.vue';

export default {
  name: 'App',
  components: {
    VueCountryDropdown,
  },
  data() {
    return {
      country: {},
      defaultCountry: "TR",
    }
  },
  methods: {
    countrySelected(country) {
      this.country = country;
    },
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
  margin-bottom: 3vh;
}
.description {
  margin-top: 3vh;
  font-weight: 700;
}
</style>
