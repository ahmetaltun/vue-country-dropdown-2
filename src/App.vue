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
    />
    <div class="description">
      {{ 
        `{ 
          flag: "${flag}", 
          name: "${name}", 
          isoCode: "${isoCode}", 
          phoneCode: "${phonecode}" 
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
      name: "",
      isoCode: "",
      phonecode: "",
      flag: "",
      currency: "",
      timezones: [],
      defaultCountry: "TR",
    }
  },
  methods: {
    countrySelected({ name, isoCode, phonecode, flag, currency, timezones }) {
      this.name = name;
      this.isoCode = isoCode;
      this.phonecode = phonecode;
      this.flag = flag;
      this.currency = currency;
      this.timezones = timezones;
      console.log(name, isoCode, phonecode, flag, currency, timezones)
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
