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
          <span class="flag" v-if="country.flag && enabledFlags">
            {{ country.flag }}
          </span>
          <span class="phonecode" v-if="country.phonecode && enabledPhonecode">
            {{ country.phonecode }}
          </span>
          <span class="name" v-if="country.name && enabledName">
            {{ country.name }}
          </span>
        </div>
      </template>

      <!-- Option Template -->
      <template #option="country">
        <div class="option">
          <span class="flag" v-if="country.flag && enabledFlags">
            {{ country.flag }}
          </span>
          <span class="name" v-if="country.name && enabledName">
            {{ country.name }}
          </span>
          <span class="phonecode" v-if="country.phonecode && enabledPhonecode">
            {{ country.phonecode }}
          </span>
        </div>
      </template>
    </v-select>
  </div>
</template>

<script>
import { Country }  from 'country-state-city';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
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
  },
  data() {
    return {
      selected: null,
      countries: [],
      notSelectedOption: {
        isoCode: null,
        name: this.notSelectedOptionText,
        phonecode: null,
        flag: null,
        currency: null,
        latitude: null,
        longitude: null,
        timezones: []
      }
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
    this.immediateCallSelectEvent && this.onSelect(this.selected)
  },
  methods: {
    getCountries() {
      this.countries = Country.getAllCountries().map(
        c => {
          return {
            ...c,
            phonecode: this.fixPhoneCode(c.phonecode),
          }
        }
      );
    },
    DefaultCountry() {
      // by isoCode
      if(this.defaultCountry) {
        this.selected = this.countries.find(
          c => c.isoCode === this.defaultCountry
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
          c => c.phonecode === this.defaultCountryByPhoneCode
        )
      }
    },
    PreferredCountries() {
      if(this.preferredCountries.length) {
        const preferredCountries = [];
        this.countries = this.countries.map(
          c => {
            if(this.preferredCountries.includes(c.isoCode)) {
              preferredCountries.push(c);
              return;
            } else {
              return c;
            }
          }
        );
        this.countries = [
          ...preferredCountries,
          ...this.countries,
        ];
      }
    },
    OnlyCountries() {
      if(this.onlyCountries.length) {
        this.countries = this.countries.filter(
          c => this.onlyCountries.includes(c.isoCode)
        )
      }
    },
    IgnoredCountries() {
      if(this.ignoredCountries.length) {
        this.countries = this.countries.filter(
          c => !this.ignoredCountries.includes(c.isoCode)
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
    fixPhoneCode(phonecode) {
      phonecode = phonecode.includes('+') ? phonecode : `+${phonecode}`
      return phonecode.includes("and") ? phonecode.split("and").at(0).trim() : phonecode;
    }
  },
  watch: {
    defaultCountry: function() {
      this.DefaultCountry();
    },
    defaultCountryByName: function() {
      this.DefaultCountryByName();
    },
    defaultCountryByPhoneCode: function() {
      this.DefaultCountryByPhoneCode();
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