
# Vue Country Dropdown 2

Country dropdown for Vue@2.

## [Demo](https://vue-country-dropdown-2.pages.dev/)
## Installation

- **yarn**:
  ```bash
    yarn add vue-country-dropdown-2
  ```
- **npm**:
  ```bash
    npm i --save vue-country-dropdown-2
  ```

## Usage

- Install as a global component:

  ```js
  import Vue from "vue";
  import VueCountryDropdown from "vue-country-dropdown-2";

  Vue.use(VueCountryDropdown);
  ```
- Or use in a specific component

  ```js
  import VueCountryDropdown from 'vue-country-dropdown-2'

  export default {
    components: {
      VueCountryDropdown
    }
  }
  ```

- In your component:

  ```js
  <template>
  ...
    <vue-country-dropdown
      @onSelect="onSelect"
      :preferredCountries="['TR', 'US', 'GB']"
      :defaultCountry="'TR'"
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
  ...
  <template>
  <script>
  export default {
    methods: {
       onSelect({ name, isoCode, phonecode, flag, currency, timezones }) {
         console.log(name, isoCode, phonecode, flag, currency, timezones);
       },
    },
  }
  </script>
  ```

### Props

| Property value             | Type      | Default value                 | Description                                                                        |
| -------------------------- | --------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `disabled`                 | `Boolean`  | `false`                      | Disables the dropdown                                                              |
| `defaultCountry`           | `string`  | `''`                          | Set a country as selected at startup with iso code. ie `'TR'`                      |
| `defaultCountryByName`     | `string`  | `''`                          | Set a country as selected at startup with name. ie `'Turkey'`                      |
| `defaultCountryByPhoneCode`| `string`  | `''`                          | Set a country as selected at startup with phone code. ie '`+90`'                   |
| `enabledName`              | `Boolean` | `true`                        | Enable country name in the input                                                   |
| `enabledFlags`             | `Boolean` | `true`                        | Enable flags in the input                                                          |
| `enabledPhonecode`         | `Boolean` | `true`                        | Enable phone code in the input                                                     |
| `clearable`                | `Boolean` | `false`                       | User can clear or not the selected country                                         |
| `multiple`                 | `Boolean` | `false`                       | Select multiple country                                                            |
| `searchable`               | `Boolean` | `true`                        | Set countries searchable                                                           |
| `closeOnSelect`            | `Boolean` | `true`                        | Close country list on select                                                       |
| `placeholder`              | `String`  | `''`                          | Set a placeholder for the input                                                    |
| `preferredCountries`       | `Array`   | `[]`                          | Preferred countries list, will be on top of the dropdown. ie `['TR', 'US', 'AL']`  |
| `onlyCountries`            | `Array`   | `[]`                          | List of countries will be shown on the dropdown. ie `['TR', 'US', 'AL']`           |
| `ignoredCountries`         | `Array`   | `[]`                          | List of countries will NOT be shown on the dropdown. ie `['TR', 'US', 'AL']`       |
| `immediateCallSelectEvent` | `Boolean` | `false`                        | Call the `onSelect` event when the component is mounted.                          |
| `showNotSelectedOption`    | `Boolean` | `false`                       | The `Not Selected` option is added to the top of the list. (All values are empty.) |
| `notSelectedOptionText`    | `String`  | `Not Selected`                | Replace `Not Selected` text with another string.                                   |


### Events

| Property value      | Arguments | Description                                                                                                                     |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `onSelect`          | `Object`  | Fires when the input changes with the argument is the object includes `{ name, isoCode, phonecode, flag, currency, timezones }` |
| `open`              | `null`    | Triggered when the dropdown is open.                                                                                            |
| `close`             | `null`    | Triggered when the dropdown is closed.                                                                                          |
| `option_selecting`  | `Object`  | Triggered after an option has been selected, before updating internal state. (Return same object with onSelect).                |
| `option_selected`   | `Object`  | Triggered when an option has been selected, after updating internal state. (Return same object with onSelect).                  |
| `option_deselecting`| `Object`  | Triggered when an option has been deselected, before updating internal state. (Return same object with onSelect).               |
| `option_deselected` | `Object`  | Triggered when an option has been deselected, after updating internal state. (Return same object with onSelect).                |

## Highlights & Credits

- Data source: [dr5hn/countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database)
- Country, state, city: [harpreetkhalsagtbit/country-state-city](https://github.com/harpreetkhalsagtbit/country-state-city)
- Vue select: [sagalbot/vue-select](https://github.com/sagalbot/vue-select)
- Vue app created by [vue-cli](https://github.com/vuejs/vue-cli).
