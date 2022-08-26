<template>
  <div id="app">
    <!-- Title -->
    <h2 class="title">Vue Country Dropdown 2</h2>
    <!-- Dropdown -->
    <vue-country-dropdown
      v-model="country"
      :preferredCountries="['TR', 'US', 'GB']"
      :defaultCountry="defaultCountry"
      :selectFirstItem="true"
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
    <!-- Selected Item Details -->
    <div class="description" v-if="country">
      {{ 
        `{ 
          flag: "${country.emoji}", 
          name: "${country.name}", 
          iso2: "${country.iso2}", 
          phone_code: "${country.phone_code}" 
        }` 
      }}
    </div>
    <!-- Links -->
    <links />
  </div>
</template>

<script>
import VueCountryDropdown from './components/vue-country-dropdown.vue';
import Links from './components/links.vue';

export default {
  name: 'App',
  components: {
    VueCountryDropdown,
    Links
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
  margin-bottom: 3vh;
}
.description {
  margin-top: 3vh;
  font-weight: 700;
}
</style>
