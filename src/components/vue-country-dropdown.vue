<template>
  <div>
    <v-select 
      v-model="selected" 
      class="select"
      label="name"
      :options="countries" 
      :disabled="disabled"
      :clearable="clearable"
      :multiple="multiple"
      :searchable="searchable"
      :closeOnSelect="closeOnSelect"
      :placeholder="placeholder"
      @input="onSelect"
      @open="open"
      @close="close"
      @option:selecting="option_selecting"
      @option:selected="option_selected"
      @option:deselecting="option_deselecting"
      @option:deselected="option_deselected"
    >
      <!-- Selected Template -->
      <template #selected-option="country">
        <div class="selected-option">
          <span class="flag" v-if="country.emoji && enabledFlags">
            {{ country.emoji }}
          </span>
          <span class="phonecode" v-if="country.phone_code && enabledPhonecode">
            {{ country.phone_code }}
          </span>
          <span class="name" v-if="country.name && enabledName">
            {{ CountryName(country) }}
          </span>
        </div>
      </template>

      <!-- Option Template -->
      <template #option="country">
        <div class="option">
          <span class="flag" v-if="country.emoji && enabledFlags">
            {{ country.emoji }}
          </span>
          <span 
            class="name" 
            v-if="country.name && enabledName" 
            :class="{ 'bold-text': preferredCountries.length && preferredCountries.includes(country.iso2) }"
          >
            {{ CountryName(country) }}
          </span>
          <span class="phonecode" v-if="country.phone_code && enabledPhonecode">
            {{ country.phone_code }}
          </span>
        </div>
      </template>
    </v-select>
  </div>
</template>

<script>
import Countries from '../data/countries.js';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  name: "vue-country-dropdown-2",
  components: {
    vSelect,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    defaultCountry: {
      type: String,
      default: null
    },
    defaultCountryByName: {
      type: String,
      default: null
    },
    defaultCountryByPhoneCode: {
      type: String,
      default: null
    },
    enabledName: {
      type: Boolean,
      default: true
    },
    enabledPhonecode: {
      type: Boolean,
      default: true
    },
    enabledFlags: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: true
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: ""
    },
    preferredCountries: {
      type: Array,
      default: () => []
    },
    onlyCountries: {
      type: Array,
      default: () => []
    },
    ignoredCountries: {
      type: Array,
      default: () => []
    },
    immediateCallSelectEvent: {
      type: Boolean,
      default: false
    },
    showNotSelectedOption: {
      type: Boolean,
      default: false
    },
    notSelectedOptionText: {
      type: String,
      default: "Not selected"
    },
    countryNameTranslation: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      selected: null,
      countries: [],
      notSelectedOption: {
        id: 0,
        name: this.notSelectedOptionText,
        iso3: "",
        iso2: "",
        numeric_code: "",
        phone_code: "",
        capital: "",
        currency: "",
        currency_name: "",
        currency_symbol: "",
        tld: "",
        native: "",
        region: "",
        subregion: "",
        timezones: [],
        translations: {},
        latitude: "",
        longitude: "",
        emoji: "",
        emojiU: ""
      },
    }
  },
  created() {
    this.getCountries();
  },
  mounted() {
    this.DefaultCountry();
    this.DefaultCountryByName();
    this.DefaultCountryByPhoneCode();
    this.PreferredCountries();
    this.OnlyCountries();
    this.IgnoredCountries();
    this.ShowNotSelectedOption();
    this.ImmediateCallSelect();
  },
  methods: {
    getCountries() {
      this.countries = Countries.map(
        c => {
          return {
            ...c,
            phone_code: this.fixPhoneCode(c.phone_code),
          }
        }
      );
    },
    DefaultCountry() {
      // by isoCode
      if(this.defaultCountry) {
        this.selected = this.countries.find(
          c => c.iso2 === this.defaultCountry
        )
      }
    },
    DefaultCountryByName() {
      // by isoCode
      if(this.defaultCountryByName) {
        this.selected = this.countries.find(
          c => c.name === this.defaultCountryByName
        )
      }
    },
    DefaultCountryByPhoneCode() {
      // by isoCode
      if(this.defaultCountryByPhoneCode) {
        this.selected = this.countries.find(
          c => c.phone_code === this.defaultCountryByPhoneCode
        )
      }
    },
    PreferredCountries() {
      if(this.preferredCountries.length) {
        const preferredCountries = this.countries.filter(
          c => this.preferredCountries.includes(c.iso2)
        );
        this.countries = this.countries.filter(
          c => !this.preferredCountries.includes(c.iso2)
        );
        this.countries.unshift(...preferredCountries);
      }
    },
    OnlyCountries() {
      if(this.onlyCountries.length) {
        this.countries = this.countries.filter(
          c => this.onlyCountries.includes(c.iso2)
        )
      }
    },
    IgnoredCountries() {
      if(this.ignoredCountries.length) {
        this.countries = this.countries.filter(
          c => !this.ignoredCountries.includes(c.iso2)
        )
      }
    },
    ShowNotSelectedOption() {
      if(this.showNotSelectedOption) {
        this.countries.unshift(this.notSelectedOption);
      }
    },
    onSelect(country) {
      this.$emit('onSelect', country);
    },
    open() {
      this.$emit('open');
    },
    close() {
      this.$emit('close');
    },
    option_selecting(country) {
      this.$emit('option_selecting', country);
    },
    option_selected(country) {
      this.$emit('option_selected', country);
    },
    option_deselecting(country) {
      this.$emit('option_deselecting', country);
    },
    option_deselected(country) {
      this.$emit('option_deselected', country);
    },
    CountryName(country) {
      if(this.countryNameTranslation) {
        if(country.translations && country.translations[this.countryNameTranslation]) {
          return country.translations[this.countryNameTranslation];
        }
      }
      return country.name;
    },
    fixPhoneCode(phone_code) {
      phone_code = phone_code.includes('+') ? phone_code : `+${phone_code}`
      return phone_code.includes("and") ? phone_code.split("and").at(0).trim() : phone_code;
    },
    ImmediateCallSelect() {
      this.immediateCallSelectEvent && this.onSelect(this.selected);
    }
  },
  watch: {
    defaultCountry: function() {
      this.DefaultCountry();
      this.onSelect(this.selected);
    },
    defaultCountryByName: function() {
      this.DefaultCountryByName();
      this.onSelect(this.selected);
    },
    defaultCountryByPhoneCode: function() {
      this.DefaultCountryByPhoneCode();
      this.onSelect(this.selected);
    }
  }
}
</script>

<style scoped>
.select {
  min-width: 250px;
  cursor: pointer;
}
.option, 
.selected-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  gap: 8px;
}
.flag {
  font-size: 20px;
}
.name {

}
.bold-text {
  font-weight: 700;
}

:deep(.vs__dropdown-menu) {
  overflow-x: hidden;
}
:deep(.vs__search) {
  cursor: pointer;
}
:deep(.vs--searchable .vs__dropdown-toggle) {
  cursor: pointer;
}
</style>