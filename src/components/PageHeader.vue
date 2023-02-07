<template>
  <a-menu :selectedKeys="currentPage" mode="horizontal">
    <a-menu-item key="home">
      <template #icon>
        <search-outlined />
      </template>
      <router-link to="/">
        İstenilen iş makineleri
      </router-link>
    </a-menu-item>
    <a-menu-item key="add">
      <template #icon>
        <appstore-outlined />
      </template>
      <router-link to="/add">
        İş makinesi iste
      </router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { SearchOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';

export default {
  name: "PageHeader",
  components: {
    SearchOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  setup() {
  },
  computed: {
    currentPage() {
      return [this.$route.name];
    }
  }
}
</script>
