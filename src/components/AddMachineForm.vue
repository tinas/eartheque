<template>
  <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 14 }"
      autocomplete="off"
      @finish="send"
  >
    <a-form-item
        label="İl"
        name="city"
        :rules="[{ required: true, message: 'Lütfen bir il seçin!' }]"
    >
      <a-select
          v-model:value="formState.city"
          show-search
          not-found-content="Bu isimde bir il yok"
          :options="cityList"
          :filter-option="filterOption"
      />
    </a-form-item>

    <a-form-item
        label="İlçe"
        name="district"
    >
      <a-select
          v-model:value="formState.district"
          show-search
          placeholder="Bir ilçe seçin"
          not-found-content="Bu isimde bir ilçe yok"
          :options="districtList"
          :filter-option="filterOption"
      />
    </a-form-item>

    <a-form-item
        label="Enlem (varsa)"
        name="latitude"
    >
      <a-input
          v-model:value="formState.latitude"
          placeholder="Enlem bilgisi e.g. 23.78"
          type="number"
      />
    </a-form-item>

    <a-form-item
        label="Boylam (varsa)"
        name="longitude"
    >
      <a-input
          v-model:value="formState.longitude"
          placeholder="Boylam bilgisi e.g. 23.78"
          type="number"
      />
    </a-form-item>

    <a-form-item
        label="Açık adres"
        name="address"
        :rules="[{ required: true, message: 'Lütfen bir adres ekleyin!' }]"
    >
      <a-textarea
          v-model:value="formState.address"
          placeholder="Autosize height based on content lines"
          auto-size
      />
    </a-form-item>

    <a-form-item
        label="Makine kategorisi"
        name="mainMachine"
        :rules="[{ required: true, message: 'Lütfen bir makine kategorisi seçin!' }]"
    >
      <a-select
          v-model:value="formState.mainMachine"
          show-search
          placeholder="Bir makine seçin"
          not-found-content="Bu isimde bir makine kategorisi yok"
          :options="mainMachineList"
          :filter-option="filterOption"
      />
    </a-form-item>

    <a-form-item
        label="Ekipman"
        name="subMachine"
        :rules="[{ required: true, message: 'Lütfen bir ekipman seçin!' }]"
    >
      <a-select
          v-model:value="formState.subMachine"
          show-search
          placeholder="Bir ekipman seçin"
          not-found-content="Bu isimde bir ekipman yok"
          :options="subMachineList"
          :filter-option="filterOption"
      />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 5, span: 14 }">
      <a-button
          :loading="loading"
          :disabled="loading"
          type="primary"
          html-type="submit"
      >
        {{ sendButtonText }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import axios from 'axios'
import {Constructors} from '../constants/contructors.js'

export default {
  name: "AddMachineForm",
  data() {
    return {
      cities: [],
      districties: [],
      formState: ({
        city: '',
        district: '',
        latitude: '',
        longitude: '',
        address: '',
        mainMachine: '',
        subMachine: ''
      }),
      loading: false,
    };
  },
  computed: {
    cityList() {
      if (!this.cities.length) return [];
      return this.cities.map(c => ({ value: c.name, label: c.name }));
    },
    districtList() {
      if (!this.cities.length) return [];
      const findedCity = this.cities.find(c => c.name === this.formState.city);
      if (!findedCity) return [];
      return findedCity.districts.map(d => ({ value: d.name, label: d.name }))
    },
    mainMachineList() {
      return Object.values(Constructors).map(m => ({ value: m.name, label: m.name }))
    },
    subMachineList() {
      if (!this.formState.mainMachine) return [];
      const findedMainMachine = Object.values(Constructors).find(m => m.name === this.formState.mainMachine);
      return findedMainMachine.machines.map(s => ({ value: s, label: s }));
    },
    sendButtonText() {
      return this.loading ? 'İstek gönderiliyor' : 'İstek ekle'
    }
  },
  methods: {
    async fetchCities() {
      const citiesResponse  = await axios.get('https://turkiyeapi.cyclic.app/api/v1/provinces');
      this.cities = citiesResponse.data.data;
    },
    filterOption(input, option) {
      return option.value.toLowerCase().includes(input.toLowerCase());
    },
    send(value) {
      this.loading = true;
      setTimeout(() => {
        console.log('SENT:', value);
        this.loading = false;
        this.$router.push('/?added=1')
      }, 2000);
    }
  },
  async mounted() {
    await this.fetchCities();
  }
}
</script>
