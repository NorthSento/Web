<template>
  <Layout :title="id ? 'Редактирование записи' : 'Создание записи'">
    <IllnessForm @submit="onSubmit" :id="id"  />
  </Layout>
</template>

<script>
import { useStore } from 'vuex';

import { updateItem, addItem } from '@/store/illnesses/selectors';
import Layout from '@/components/Layout/Layout';
import IllnessForm from "@/components/IllnessForm/IllnessForm.vue";

export default {
  name: 'IllnessEdit',
  props: {
    id: String,
  },
  components: {
    Layout,
    IllnessForm,
  },
  setup() {
    const store = useStore();
    return {
      onSubmit: ({ id, name }) => id ?
          updateItem(store, { id, name }) :
          addItem(store, { name } )
    }
  }

}
</script>

