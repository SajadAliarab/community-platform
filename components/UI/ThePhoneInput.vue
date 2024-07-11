<script setup lang="ts">
import type { CountryPhone } from '~/enums/country';
import { countriesPhone } from '~/enums/country';



 const emit = defineEmits(['update:phoneNumber']);
    const selectedCountry = ref<CountryPhone>(countriesPhone[0]);
    const phoneNumber = ref<string>('');

    const sortedCountries = computed(() => {
      return countriesPhone.slice().sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    });
    
    const updateDialCode = () => {
      if (!phoneNumber.value.startsWith(selectedCountry.value.dialCode)) {
        phoneNumber.value = selectedCountry.value.dialCode + phoneNumber.value.replace(/^\+?\d*/, '');
      }
      emit('update:phoneNumber', phoneNumber.value);
};

// Watch for changes in phoneNumber and emit the event
watch(phoneNumber, (newValue) => {
  emit('update:phoneNumber', newValue);
});

// Watch for changes in selectedCountry and update the phone number accordingly
watch(selectedCountry, updateDialCode);
updateDialCode();


</script>

<template>
  <div class="phone-input">
    <select v-model="selectedCountry" @change="updateDialCode" class="w-10">
      <option v-for="country in sortedCountries" :key="country.name" :value="country">
        {{ country.flag }} {{ country.name }} ({{ country.dialCode }})
      </option>
    </select>
  </div>
</template>

