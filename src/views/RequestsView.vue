<template>
  <div class="px-6 pb-10">
    <div class="flex flex-col items-center sticky top-0 bg-white w-full py-4">
      <p class="font-bold text-center text-xl">Talepler</p>
      <a-input-search
      v-model:value="value"
      placeholder="input search loading with enterButton"
      :loading="loading"
      class="max-w-md"
  />
      <div class="mt-2">
        <a-tag color="pink" class="cursor-pointer" @click="value = 'Kahramanmaraş'">Kahramanmaraş</a-tag>
        <a-tag color="red" class="cursor-pointer" @click="value = 'Hatay'">Hatay</a-tag>
        <a-tag color="orange" class="cursor-pointer" @click="value = 'Adana'">Adana</a-tag>
        <a-tag color="green" class="cursor-pointer" @click="value = 'Ankara'">Ankara</a-tag>
      </div>
    </div>
    <div class="flex flex-wrap gap-10 place-content-center mt-10">
      <div
          v-for="i in 40"
          :key="i"
          class="center-card"
          @click="modalVisible = true"
      >
        <div>
          <div class="flex justify-between">
          <div class="space-x-1">
        <b class="font-bold">İl:</b>
        <span>Hatay</span>
      </div>
          <div class="space-x-1">
          <b class="font-bold">İlçe:</b>
          <span>Elbistan</span>
        </div>
      </div>
          <a-divider dashed>İstek</a-divider>
          <div class="space-x-1">
            <b class="font-bold">Makina:</b>
            <span>Tırtıllı makine / Traktör</span>
          </div>
        </div>
    </div>
  </div>
    <a-modal
      v-model:visible="modalVisible"
      title="Vertically centered modal dialog"
      centered
      @ok="modalVisible = false"
  >
    <p>some contents...</p>
    <p>some contents...</p>
    <p>some contents...</p>
  </a-modal>
  </div>
</template>

<script>
export default {
  name: 'RequestsView',
  data() {
    return {
      value: '',
      modalVisible: false,
      loading: false
    }
  },
  watch: {
    value() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .center-card {
    @apply flex justify-center border rounded max-w-fit py-2 px-3 cursor-pointer;
  }
</style>
